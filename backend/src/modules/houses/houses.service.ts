import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { QueryHousesDto } from './dto/query-houses.dto';

@Injectable()
export class HousesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryHousesDto) {
    const {
      estate,
      minPrice,
      maxPrice,
      roomType,
      maxDistance,
      amenities,
      availability,
      featured,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: Prisma.HouseWhereInput = {};

    if (estate) {
      where.estate = {
        OR: [
          { id: estate },
          { name: { contains: estate, mode: 'insensitive' } },
        ],
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) (where.price as Prisma.FloatFilter).gte = minPrice;
      if (maxPrice !== undefined) (where.price as Prisma.FloatFilter).lte = maxPrice;
    }

    if (roomType) {
      where.roomType = roomType;
    }

    if (maxDistance !== undefined) {
      where.distanceMainGate = { lte: maxDistance };
    }

    if (amenities && amenities.length > 0) {
      where.amenities = { hasSome: amenities };
    }

    if (availability) {
      where.availability = availability;
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { caretakerName: { contains: search, mode: 'insensitive' } },
        { estate: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const skip = (page - 1) * limit;
    const orderBy: Prisma.HouseOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [total, houses] = await this.prisma.$transaction([
      this.prisma.house.count({ where }),
      this.prisma.house.findMany({
        where,
        include: {
          estate: { select: { id: true, name: true, averageDistance: true } },
          _count: { select: { reviews: true, favorites: true } },
        },
        skip,
        take: limit,
        orderBy,
      }),
    ]);

    return {
      data: houses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async findById(id: string) {
    const house = await this.prisma.house.findUnique({
      where: { id },
      include: {
        estate: true,
        reviews: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { favorites: true, reviews: true },
        },
      },
    });

    if (!house) {
      throw new NotFoundException(`House with id "${id}" not found`);
    }

    const avgRating =
      house.reviews.length > 0
        ? house.reviews.reduce((sum, r) => sum + r.rating, 0) / house.reviews.length
        : null;

    return { ...house, averageRating: avgRating };
  }

  async create(dto: CreateHouseDto) {
    const estate = await this.prisma.estate.findUnique({
      where: { id: dto.estateId },
    });

    if (!estate) {
      throw new NotFoundException(`Estate with id "${dto.estateId}" not found`);
    }

    return this.prisma.house.create({
      data: {
        ...dto,
        amenities: dto.amenities ?? [],
        photos: [],
      },
      include: { estate: { select: { id: true, name: true } } },
    });
  }

  async update(id: string, dto: Partial<CreateHouseDto>) {
    await this.findById(id);

    if (dto.estateId) {
      const estate = await this.prisma.estate.findUnique({
        where: { id: dto.estateId },
      });
      if (!estate) {
        throw new NotFoundException(`Estate with id "${dto.estateId}" not found`);
      }
    }

    return this.prisma.house.update({
      where: { id },
      data: dto,
      include: { estate: { select: { id: true, name: true } } },
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.house.delete({ where: { id } });
    return { message: `House "${id}" deleted successfully` };
  }

  async addToFavorites(userId: string, houseId: string) {
    await this.findById(houseId);

    const existing = await this.prisma.favorite.findUnique({
      where: { userId_houseId: { userId, houseId } },
    });

    if (existing) {
      throw new BadRequestException('House is already in favorites');
    }

    return this.prisma.favorite.create({
      data: { userId, houseId },
      include: { house: { select: { id: true, title: true } } },
    });
  }

  async removeFromFavorites(userId: string, houseId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_houseId: { userId, houseId } },
    });

    if (!existing) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.favorite.delete({
      where: { userId_houseId: { userId, houseId } },
    });

    return { message: 'Removed from favorites' };
  }

  async getFavorites(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        house: {
          include: {
            estate: { select: { id: true, name: true } },
            _count: { select: { reviews: true, favorites: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return favorites.map((f) => f.house);
  }

  async getFeatured() {
    return this.prisma.house.findMany({
      where: { featured: true, availability: 'VACANT' },
      include: {
        estate: { select: { id: true, name: true, averageDistance: true } },
        _count: { select: { reviews: true, favorites: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getNearby(maxDistance: number) {
    return this.prisma.house.findMany({
      where: {
        distanceMainGate: { lte: maxDistance },
        availability: 'VACANT',
      },
      include: {
        estate: { select: { id: true, name: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { distanceMainGate: 'asc' },
    });
  }

  async uploadPhotos(id: string, urls: string[]) {
    const house = await this.findById(id);

    const updatedPhotos = [...house.photos, ...urls];

    return this.prisma.house.update({
      where: { id },
      data: { photos: updatedPhotos },
    });
  }
}
