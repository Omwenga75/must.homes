import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { GetUser, Public, Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDto } from './dto/query-items.dto';
import { ItemsService } from './items.service';

@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /** GET /items — public, with all query filters */
  @Public()
  @Get()
  findAll(@Query() query: QueryItemsDto) {
    return this.itemsService.findAll(query);
  }

  /** GET /items/featured — public */
  @Public()
  @Get('featured')
  getFeatured() {
    return this.itemsService.getFeatured();
  }

  /** GET /favorites — student JWT */
  @Roles(Role.STUDENT)
  @Get('favorites')
  getFavorites(@GetUser('id') userId: string) {
    return this.itemsService.getFavorites(userId);
  }

  /** GET /items/:id — public */
  @Public()
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.findById(id);
  }

  /** POST /items — admin only */
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }

  /** PUT /items/:id — admin only */
  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateItemDto>,
  ) {
    return this.itemsService.update(id, dto);
  }

  /** DELETE /items/:id — admin only */
  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.delete(id);
  }

  /** POST /items/:id/photos — admin */
  @Roles(Role.ADMIN)
  @Post(':id/photos')
  uploadPhotos(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('urls') urls: string[],
  ) {
    return this.itemsService.uploadPhotos(id, urls);
  }

  /** POST /items/:id/favorites — student JWT */
  @Roles(Role.STUDENT)
  @Post(':id/favorites')
  addToFavorites(
    @Param('id', ParseUUIDPipe) itemId: string,
    @GetUser('id') userId: string,
  ) {
    return this.itemsService.addToFavorites(userId, itemId);
  }

  /** DELETE /items/:id/favorites — student JWT */
  @Roles(Role.STUDENT)
  @Delete(':id/favorites')
  removeFromFavorites(
    @Param('id', ParseUUIDPipe) itemId: string,
    @GetUser('id') userId: string,
  ) {
    return this.itemsService.removeFromFavorites(userId, itemId);
  }
}
