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
import { CreateHouseDto } from './dto/create-house.dto';
import { QueryHousesDto } from './dto/query-houses.dto';
import { HousesService } from './houses.service';

@Controller('houses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  /** GET /houses — public, with all query filters */
  @Public()
  @Get()
  findAll(@Query() query: QueryHousesDto) {
    return this.housesService.findAll(query);
  }

  /** GET /houses/featured — public */
  @Public()
  @Get('featured')
  getFeatured() {
    return this.housesService.getFeatured();
  }

  /** GET /favorites — student JWT */
  @Roles(Role.STUDENT)
  @Get('favorites')
  getFavorites(@GetUser('id') userId: string) {
    return this.housesService.getFavorites(userId);
  }

  /** GET /houses/:id — public */
  @Public()
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.housesService.findById(id);
  }

  /** POST /houses — admin only */
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateHouseDto) {
    return this.housesService.create(dto);
  }

  /** PUT /houses/:id — admin only */
  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateHouseDto>,
  ) {
    return this.housesService.update(id, dto);
  }

  /** DELETE /houses/:id — admin only */
  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.housesService.delete(id);
  }

  /** POST /houses/:id/photos — admin */
  @Roles(Role.ADMIN)
  @Post(':id/photos')
  uploadPhotos(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('urls') urls: string[],
  ) {
    return this.housesService.uploadPhotos(id, urls);
  }

  /** POST /houses/:id/favorites — student JWT */
  @Roles(Role.STUDENT)
  @Post(':id/favorites')
  addToFavorites(
    @Param('id', ParseUUIDPipe) houseId: string,
    @GetUser('id') userId: string,
  ) {
    return this.housesService.addToFavorites(userId, houseId);
  }

  /** DELETE /houses/:id/favorites — student JWT */
  @Roles(Role.STUDENT)
  @Delete(':id/favorites')
  removeFromFavorites(
    @Param('id', ParseUUIDPipe) houseId: string,
    @GetUser('id') userId: string,
  ) {
    return this.housesService.removeFromFavorites(userId, houseId);
  }
}
