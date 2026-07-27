import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDto } from './dto/query-items.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryItemsDto) {
    const {
      location,
      minPrice,
      maxPrice,
      condition,
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

    const where: Prisma.ItemWhereInput = {};

    if (location) {
      where.location = {
        OR: [
          { id: location },
          { name: { contains: location, mode: 'insensitive' } },
        ],
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) (where.price as Prisma.FloatFilter).gte = minPrice;
      if (maxPrice !== undefined) (where.price as Prisma.FloatFilter).lte = maxPrice;
    }

    if (condition) {
      where.condition = condition;
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
        { location: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const skip = (page - 1) * limit;
    const orderBy: Prisma.ItemOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [total, items] = await this.prisma.$transaction([
      this.prisma.item.count({ where }),
      this.prisma.item.findMany({
        where,
        include: {
          location: { select: { id: true, name: true, averageDistance: true } },
          _count: { select: { reviews: true, favorites: true } },
        },
        skip,
        take: limit,
        orderBy,
      }),
    ]);

    return {
      data: items,
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
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: {
        location: true,
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

    if (!item) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }

    const avgRating =
      item.reviews.length > 0
        ? item.reviews.reduce((sum, r) => sum + r.rating, 0) / item.reviews.length
        : null;

    return { ...item, averageRating: avgRating };
  }

  async create(dto: CreateItemDto) {
    const location = await this.prisma.location.findUnique({
      where: { id: dto.locationId },
    });

    if (!location) {
      throw new NotFoundException(`Location with id "${dto.locationId}" not found`);
    }

    return this.prisma.item.create({
      data: {
        ...dto,
        amenities: dto.amenities ?? [],
        photos: [],
      },
      include: { location: { select: { id: true, name: true } } },
    });
  }

  async update(id: string, dto: Partial<CreateItemDto>) {
    await this.findById(id);

    if (dto.locationId) {
      const location = await this.prisma.location.findUnique({
        where: { id: dto.locationId },
      });
      if (!location) {
        throw new NotFoundException(`Location with id "${dto.locationId}" not found`);
      }
    }

    return this.prisma.item.update({
      where: { id },
      data: dto,
      include: { location: { select: { id: true, name: true } } },
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.item.delete({ where: { id } });
    return { message: `Item "${id}" deleted successfully` };
  }

  async addToFavorites(userId: string, itemId: string) {
    await this.findById(itemId);

    const existing = await this.prisma.favorite.findUnique({
      where: { userId_itemId: { userId, itemId } },
    });

    if (existing) {
      throw new BadRequestException('Item is already in favorites');
    }

    return this.prisma.favorite.create({
      data: { userId, itemId },
      include: { item: { select: { id: true, title: true } } },
    });
  }

  async removeFromFavorites(userId: string, itemId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_itemId: { userId, itemId } },
    });

    if (!existing) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.favorite.delete({
      where: { userId_itemId: { userId, itemId } },
    });

    return { message: 'Removed from favorites' };
  }

  async getFavorites(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        item: {
          include: {
            location: { select: { id: true, name: true } },
            _count: { select: { reviews: true, favorites: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return favorites.map((f) => f.item);
  }

  async getFeatured() {
    return this.prisma.item.findMany({
      where: { featured: true, availability: 'VACANT' },
      include: {
        location: { select: { id: true, name: true, averageDistance: true } },
        _count: { select: { reviews: true, favorites: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getNearby(maxDistance: number) {
    return this.prisma.item.findMany({
      where: {
        distanceMainGate: { lte: maxDistance },
        availability: 'VACANT',
      },
      include: {
        location: { select: { id: true, name: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { distanceMainGate: 'asc' },
    });
  }

  async uploadPhotos(id: string, urls: string[]) {
    const item = await this.findById(id);

    const updatedPhotos = [...item.photos, ...urls];

    return this.prisma.item.update({
      where: { id },
      data: { photos: updatedPhotos },
    });
  }
}
