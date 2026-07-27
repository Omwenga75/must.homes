import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.location.findMany({
      include: {
        _count: {
          select: { items: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: {
        items: {
          where: { availability: 'VACANT' },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { items: true },
        },
      },
    });

    if (!location) {
      throw new NotFoundException(`Location with id "${id}" not found`);
    }

    return location;
  }

  async create(dto: CreateLocationDto) {
    const existing = await this.prisma.location.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Location "${dto.name}" already exists`);
    }

    return this.prisma.location.create({ data: dto });
  }

  async update(id: string, dto: Partial<CreateLocationDto>) {
    await this.findById(id);

    if (dto.name) {
      const conflict = await this.prisma.location.findFirst({
        where: { name: dto.name, NOT: { id } },
      });
      if (conflict) {
        throw new ConflictException(`Location name "${dto.name}" is already taken`);
      }
    }

    return this.prisma.location.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.location.delete({ where: { id } });
    return { message: `Location "${id}" deleted successfully` };
  }

  async seed() {
    this.logger.log('Seeding locations...');

    const locations: CreateLocationDto[] = [
      {
        name: 'Nchiru Location',
        description:
          'Located 50–150 metres from MUST main gate. Affordable and close to campus.',
        averageDistance: '50-150m from main gate',
        latitude: -0.0736,
        longitude: 37.4845,
      },
      {
        name: 'California Location',
        description:
          'Located 300–400 metres from MUST main gate. Popular student location.',
        averageDistance: '300-400m from main gate',
        latitude: -0.0748,
        longitude: 37.4862,
      },
      {
        name: 'Mascan Location',
        description:
          'Located 300–600 metres from MUST. Good mix of room types.',
        averageDistance: '300-600m from main gate',
        latitude: -0.075,
        longitude: 37.4855,
      },
      {
        name: 'Kianjai Location',
        description:
          'Located approximately 1.5 km from MUST main gate. Quiet residential area.',
        averageDistance: '1.5km from main gate',
        latitude: -0.0712,
        longitude: 37.491,
      },
      {
        name: 'Kirindine Location',
        description:
          'Located approximately 1.2 km from MUST main gate. Spacious units available.',
        averageDistance: '1.2km from main gate',
        latitude: -0.072,
        longitude: 37.4895,
      },
      {
        name: 'Kunene Location',
        description:
          'Located 200–300 metres from MUST main gate. Very accessible.',
        averageDistance: '200-300m from main gate',
        latitude: -0.0738,
        longitude: 37.485,
      },
      {
        name: 'Heritage Location',
        description:
          'Located 500–600 metres from MUST main gate. Well-established location.',
        averageDistance: '500-600m from main gate',
        latitude: -0.0755,
        longitude: 37.487,
      },
      {
        name: 'Cedar Location',
        description:
          'Located approximately 700 metres from MUST main gate. Modern facilities.',
        averageDistance: '700m from main gate',
        latitude: -0.076,
        longitude: 37.488,
      },
      {
        name: 'Kwa Mathe Location',
        description:
          'Approximately 200m from inside gate and 600m from main gate. Two access points.',
        averageDistance: '200m inside gate / 600m main gate',
        latitude: -0.0742,
        longitude: 37.4858,
      },
      {
        name: 'Aina Location',
        description:
          'Located 700–800 metres from MUST main gate. Peaceful environment.',
        averageDistance: '700-800m from main gate',
        latitude: -0.0765,
        longitude: 37.4885,
      },
      {
        name: 'St Rita Location',
        description:
          'Located 500–600 metres from MUST main gate. Clean and secure.',
        averageDistance: '500-600m from main gate',
        latitude: -0.0753,
        longitude: 37.4867,
      },
      {
        name: 'Kaithe Location',
        description:
          'Residential location near MUST. Various accommodation options.',
        averageDistance: 'Near MUST campus',
        latitude: -0.0745,
        longitude: 37.487,
      },
      {
        name: 'Ebony Location',
        description:
          'Residential location near MUST campus. Affordable accommodation.',
        averageDistance: 'Near MUST campus',
        latitude: -0.0749,
        longitude: 37.4875,
      },
      {
        name: 'Rainpark Location',
        description:
          'Located 1–1.2 km from MUST main gate. Scenic and quiet.',
        averageDistance: '1-1.2km from main gate',
        latitude: -0.0718,
        longitude: 37.49,
      },
    ];

    const results: Array<{ name: string; action: string }> = [];

    for (const locationData of locations) {
      const existing = await this.prisma.location.findUnique({
        where: { name: locationData.name },
      });

      if (existing) {
        await this.prisma.location.update({
          where: { name: locationData.name },
          data: locationData,
        });
        results.push({ name: locationData.name, action: 'updated' });
      } else {
        await this.prisma.location.create({ data: locationData });
        results.push({ name: locationData.name, action: 'created' });
      }
    }

    this.logger.log(`Location seeding complete: ${results.length} locations processed`);
    return { seeded: results.length, results };
  }
}
