import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEstateDto } from './dto/create-estate.dto';

@Injectable()
export class EstatesService {
  private readonly logger = new Logger(EstatesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.estate.findMany({
      include: {
        _count: {
          select: { houses: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const estate = await this.prisma.estate.findUnique({
      where: { id },
      include: {
        houses: {
          where: { availability: 'VACANT' },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { houses: true },
        },
      },
    });

    if (!estate) {
      throw new NotFoundException(`Estate with id "${id}" not found`);
    }

    return estate;
  }

  async create(dto: CreateEstateDto) {
    const existing = await this.prisma.estate.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Estate "${dto.name}" already exists`);
    }

    return this.prisma.estate.create({ data: dto });
  }

  async update(id: string, dto: Partial<CreateEstateDto>) {
    await this.findById(id);

    if (dto.name) {
      const conflict = await this.prisma.estate.findFirst({
        where: { name: dto.name, NOT: { id } },
      });
      if (conflict) {
        throw new ConflictException(`Estate name "${dto.name}" is already taken`);
      }
    }

    return this.prisma.estate.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.estate.delete({ where: { id } });
    return { message: `Estate "${id}" deleted successfully` };
  }

  async seed() {
    this.logger.log('Seeding estates...');

    const estates: CreateEstateDto[] = [
      {
        name: 'Nchiru Estate',
        description:
          'Located 50–150 metres from MUST main gate. Affordable and close to campus.',
        averageDistance: '50-150m from main gate',
        latitude: -0.0736,
        longitude: 37.4845,
      },
      {
        name: 'California Estate',
        description:
          'Located 300–400 metres from MUST main gate. Popular student estate.',
        averageDistance: '300-400m from main gate',
        latitude: -0.0748,
        longitude: 37.4862,
      },
      {
        name: 'Mascan Estate',
        description:
          'Located 300–600 metres from MUST. Good mix of room types.',
        averageDistance: '300-600m from main gate',
        latitude: -0.075,
        longitude: 37.4855,
      },
      {
        name: 'Kianjai Estate',
        description:
          'Located approximately 1.5 km from MUST main gate. Quiet residential area.',
        averageDistance: '1.5km from main gate',
        latitude: -0.0712,
        longitude: 37.491,
      },
      {
        name: 'Kirindine Estate',
        description:
          'Located approximately 1.2 km from MUST main gate. Spacious units available.',
        averageDistance: '1.2km from main gate',
        latitude: -0.072,
        longitude: 37.4895,
      },
      {
        name: 'Kunene Estate',
        description:
          'Located 200–300 metres from MUST main gate. Very accessible.',
        averageDistance: '200-300m from main gate',
        latitude: -0.0738,
        longitude: 37.485,
      },
      {
        name: 'Heritage Estate',
        description:
          'Located 500–600 metres from MUST main gate. Well-established estate.',
        averageDistance: '500-600m from main gate',
        latitude: -0.0755,
        longitude: 37.487,
      },
      {
        name: 'Cedar Estate',
        description:
          'Located approximately 700 metres from MUST main gate. Modern facilities.',
        averageDistance: '700m from main gate',
        latitude: -0.076,
        longitude: 37.488,
      },
      {
        name: 'Kwa Mathe Estate',
        description:
          'Approximately 200m from inside gate and 600m from main gate. Two access points.',
        averageDistance: '200m inside gate / 600m main gate',
        latitude: -0.0742,
        longitude: 37.4858,
      },
      {
        name: 'Aina Estate',
        description:
          'Located 700–800 metres from MUST main gate. Peaceful environment.',
        averageDistance: '700-800m from main gate',
        latitude: -0.0765,
        longitude: 37.4885,
      },
      {
        name: 'St Rita Estate',
        description:
          'Located 500–600 metres from MUST main gate. Clean and secure.',
        averageDistance: '500-600m from main gate',
        latitude: -0.0753,
        longitude: 37.4867,
      },
      {
        name: 'Kaithe Estate',
        description:
          'Residential estate near MUST. Various accommodation options.',
        averageDistance: 'Near MUST campus',
        latitude: -0.0745,
        longitude: 37.487,
      },
      {
        name: 'Ebony Estate',
        description:
          'Residential estate near MUST campus. Affordable accommodation.',
        averageDistance: 'Near MUST campus',
        latitude: -0.0749,
        longitude: 37.4875,
      },
      {
        name: 'Rainpark Estate',
        description:
          'Located 1–1.2 km from MUST main gate. Scenic and quiet.',
        averageDistance: '1-1.2km from main gate',
        latitude: -0.0718,
        longitude: 37.49,
      },
    ];

    const results: Array<{ name: string; action: string }> = [];

    for (const estateData of estates) {
      const existing = await this.prisma.estate.findUnique({
        where: { name: estateData.name },
      });

      if (existing) {
        await this.prisma.estate.update({
          where: { name: estateData.name },
          data: estateData,
        });
        results.push({ name: estateData.name, action: 'updated' });
      } else {
        await this.prisma.estate.create({ data: estateData });
        results.push({ name: estateData.name, action: 'created' });
      }
    }

    this.logger.log(`Estate seeding complete: ${results.length} estates processed`);
    return { seeded: results.length, results };
  }
}
