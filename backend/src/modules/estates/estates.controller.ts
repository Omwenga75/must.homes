import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Public, Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateEstateDto } from './dto/create-estate.dto';
import { EstatesService } from './estates.service';

@Controller('estates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstatesController {
  constructor(private readonly estatesService: EstatesService) {}

  @Public()
  @Get()
  findAll() {
    return this.estatesService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.estatesService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateEstateDto) {
    return this.estatesService.create(dto);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateEstateDto>,
  ) {
    return this.estatesService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.estatesService.delete(id);
  }

  @Roles(Role.ADMIN)
  @Post('seed')
  seed() {
    return this.estatesService.seed();
  }
}
