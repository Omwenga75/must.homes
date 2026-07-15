import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AdminUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';

export interface UserQuery {
  page?: number;
  limit?: number;
  role?: Role;
  search?: string;
  isActive?: boolean;
}

export interface PaginatedUsers {
  data: Omit<User, 'passwordHash' | 'emailOtp' | 'emailOtpExpiresAt' | 'refreshTokenHash' | 'passwordResetOtp' | 'passwordResetOtpExpiresAt'>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const SAFE_USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  role: true,
  isVerified: true,
  isActive: true,
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ─── FIND ALL ────────────────────────────────
  async findAll(query: UserQuery): Promise<PaginatedUsers> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 10));
    const skip = (page - 1) * limit;

    const where: Record<string, any> = {};

    if (query.role) {
      where.role = query.role;
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const search = query.search.trim();
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: SAFE_USER_SELECT,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ─── FIND BY ID ──────────────────────────────
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: SAFE_USER_SELECT,
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return user;
  }

  // ─── UPDATE PROFILE ──────────────────────────
  async updateProfile(id: string, dto: UpdateUserDto) {
    await this.findById(id); // Ensure user exists

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.firstName && { firstName: dto.firstName.trim() }),
        ...(dto.lastName && { lastName: dto.lastName.trim() }),
        ...(dto.phone !== undefined && { phone: dto.phone?.trim() ?? null }),
      },
      select: SAFE_USER_SELECT,
    });

    this.logger.log(`[UPDATE_PROFILE] User ${id} updated profile`);
    return updated;
  }

  // ─── ADMIN UPDATE ────────────────────────────
  async adminUpdate(id: string, dto: AdminUpdateUserDto) {
    await this.findById(id);

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.firstName && { firstName: dto.firstName.trim() }),
        ...(dto.lastName && { lastName: dto.lastName.trim() }),
        ...(dto.phone !== undefined && { phone: dto.phone?.trim() ?? null }),
        ...(dto.role && { role: dto.role }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
      select: SAFE_USER_SELECT,
    });

    this.logger.log(`[ADMIN_UPDATE] Admin updated user ${id}`);
    return updated;
  }

  // ─── DELETE USER ─────────────────────────────
  async deleteUser(id: string): Promise<{ message: string }> {
    await this.findById(id);

    await this.prisma.user.delete({ where: { id } });
    this.logger.log(`[DELETE_USER] User ${id} deleted`);

    return { message: 'User deleted successfully' };
  }

  // ─── UPDATE AVATAR ───────────────────────────
  async updateAvatar(id: string, url: string) {
    await this.findById(id);

    const updated = await this.prisma.user.update({
      where: { id },
      data: { avatarUrl: url },
      select: SAFE_USER_SELECT,
    });

    this.logger.log(`[UPDATE_AVATAR] User ${id} updated avatar`);
    return updated;
  }
}
