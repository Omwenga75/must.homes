import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './strategies/jwt.strategy';

const BCRYPT_ROUNDS = 12;
const OTP_TTL_MINUTES = 15;

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  tokens: TokenPair;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  async register(dto: RegisterDto): Promise<{ userId: string; message: string }> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const otp = this.generateOtp();
    const otpExpiresAt = this.otpExpiry();

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase().trim(),
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        phone: dto.phone?.trim() ?? null,
        passwordHash,
        role: Role.USER,
        isVerified: false,
        isActive: true,
        emailOtp: otp,
        emailOtpExpiresAt: otpExpiresAt,
      },
    });

    // TODO: Send OTP via email service
    this.logger.log(
      `[REGISTER] User ${user.email} registered. OTP: ${otp} (expires ${otpExpiresAt.toISOString()})`,
    );

    return {
      userId: user.id,
      message:
        'Registration successful. Please check your email for the verification code.',
    };
  }

  // ─────────────────────────────────────────────
  // VERIFY EMAIL
  // ─────────────────────────────────────────────
  async verifyEmail(
    userId: string,
    otp: string,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isVerified) {
      return { message: 'Email is already verified' };
    }

    if (!user.emailOtp || !user.emailOtpExpiresAt) {
      throw new BadRequestException('No OTP found. Please request a new one.');
    }

    if (new Date() > user.emailOtpExpiresAt) {
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    if (user.emailOtp !== otp) {
      throw new BadRequestException('Invalid OTP code');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        emailOtp: null,
        emailOtpExpiresAt: null,
      },
    });

    return { message: 'Email verified successfully. You can now log in.' };
  }

  // ─────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Your account has been deactivated');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new ForbiddenException(
        'Please verify your email before logging in',
      );
    }

    const tokens = await this.generateTokens(
      user.id,
      user.role,
      dto.rememberMe,
    );

    // Store hashed refresh token
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, BCRYPT_ROUNDS);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: hashedRefreshToken },
    });

    this.logger.log(`[LOGIN] User ${user.email} logged in`);

    const { passwordHash, emailOtp, emailOtpExpiresAt, refreshTokenHash, passwordResetOtp, passwordResetOtpExpiresAt, ...safeUser } = user;

    return { user: safeUser as Omit<User, 'passwordHash'>, tokens };
  }

  // ─────────────────────────────────────────────
  // REFRESH TOKEN
  // ─────────────────────────────────────────────
  async refreshToken(token: string): Promise<{ accessToken: string }> {
    let payload: JwtPayload;

    try {
      payload = this.jwt.verify<JwtPayload>(token, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token not found');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account is deactivated');
    }

    const tokenMatches = await bcrypt.compare(token, user.refreshTokenHash);
    if (!tokenMatches) {
      throw new UnauthorizedException('Refresh token is invalid or already used');
    }

    const accessToken = this.signAccessToken(user.id, user.role);
    return { accessToken };
  }

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  async logout(userId: string): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null },
    });
    return { message: 'Logged out successfully' };
  }

  // ─────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Always return same message to prevent email enumeration
    const safeMessage =
      'If an account with that email exists, a reset code has been sent.';

    if (!user || !user.isActive) {
      return { message: safeMessage };
    }

    const otp = this.generateOtp();
    const otpExpiresAt = this.otpExpiry();

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetOtp: otp,
        passwordResetOtpExpiresAt: otpExpiresAt,
      },
    });

    // TODO: Send OTP via email service
    this.logger.log(
      `[FORGOT_PASSWORD] Reset OTP for ${user.email}: ${otp} (expires ${otpExpiresAt.toISOString()})`,
    );

    return { message: safeMessage };
  }

  // ─────────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────────
  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      throw new BadRequestException('Invalid reset request');
    }

    if (!user.passwordResetOtp || !user.passwordResetOtpExpiresAt) {
      throw new BadRequestException(
        'No password reset request found. Please request a new OTP.',
      );
    }

    if (new Date() > user.passwordResetOtpExpiresAt) {
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    if (user.passwordResetOtp !== otp) {
      throw new BadRequestException('Invalid OTP code');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from the current password',
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetOtp: null,
        passwordResetOtpExpiresAt: null,
        refreshTokenHash: null, // Invalidate all sessions
      },
    });

    this.logger.log(`[RESET_PASSWORD] Password reset for ${user.email}`);

    return {
      message: 'Password reset successful. Please log in with your new password.',
    };
  }

  // ─────────────────────────────────────────────
  // GENERATE TOKENS
  // ─────────────────────────────────────────────
  async generateTokens(
    userId: string,
    role: Role,
    rememberMe?: boolean,
  ): Promise<TokenPair> {
    const accessToken = this.signAccessToken(userId, role);
    const refreshToken = this.signRefreshToken(userId, role, rememberMe);
    return { accessToken, refreshToken };
  }

  // ─────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────
  private signAccessToken(userId: string, role: Role): string {
    const payload: JwtPayload = { sub: userId, email: '', role };
    return this.jwt.sign(payload, {
      secret: this.config.getOrThrow<string>('JWT_SECRET'),
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN', '15m'),
    });
  }

  private signRefreshToken(
    userId: string,
    role: Role,
    rememberMe?: boolean,
  ): string {
    const payload: JwtPayload = { sub: userId, email: '', role };
    const expiresIn = rememberMe
      ? this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d')
      : '24h';
    return this.jwt.sign(payload, {
      secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn,
    });
  }

  private generateOtp(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  private otpExpiry(): Date {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + OTP_TTL_MINUTES);
    return expiry;
  }
}
