import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { GetUser, Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';
import { UsersService, UserQuery } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ─── GET ALL (Admin) ─────────────────────────
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all users (Admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'role', required: false, enum: Role })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  findAll(@Query() query: UserQuery) {
    return this.usersService.findAll(query);
  }

  // ─── GET ME ──────────────────────────────────
  @Get('me')
  @ApiOperation({ summary: 'Get the currently authenticated user profile' })
  getMe(@GetUser('id') userId: string) {
    return this.usersService.findById(userId);
  }

  // ─── GET BY ID (Admin) ───────────────────────
  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get a user by ID (Admin only)' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // ─── UPDATE OWN PROFILE ──────────────────────
  @Patch('me')
  @ApiOperation({ summary: 'Update own profile (firstName, lastName, phone)' })
  updateMe(@GetUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  // ─── ADMIN UPDATE ────────────────────────────
  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update any user (Admin only)' })
  adminUpdate(@Param('id') id: string, @Body() dto: AdminUpdateUserDto) {
    return this.usersService.adminUpdate(id, dto);
  }

  // ─── DELETE USER (Admin) ─────────────────────
  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a user (Admin only)' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
