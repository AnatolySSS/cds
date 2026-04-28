import { Injectable } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Court } from '../../domain/entities/court.entity';
import { CreateCourtDto } from '../../application/dto/create-court.dto';
import { UpdateCourtDto } from '../../application/dto/update-court.dto';
import { CourtMapper } from '../mappers/court.mapper';
import { GetCourtsResult } from '@/courts/application/dto/get-courts-result.dto';
import {
  QueryEngine,
  QueryParams,
} from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';
import { courtQueryConfig } from '../config/court-query.config';

@Injectable()
export class CourtRepository implements ICourtRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryParams): Promise<GetCourtsResult> {
    const engine = new QueryEngine(query, courtQueryConfig);
    const qb = engine.build();

    const [items, total] = await this.prisma.$transaction([
      this.prisma.court.findMany({
        ...qb,
        include: {
          region: true,
          cassDistrict: true,
          type: true,
        },
      }),
      this.prisma.court.count({
        where: qb.where,
      }),
    ]);

    return {
      items: CourtMapper.toDomainList(items),
      total,
    };
  }

  async findById(id: string): Promise<Court | null> {
    const result = await this.prisma.court.findUnique({
      where: { id },
      include: {
        region: true,
        cassDistrict: true,
        type: true,
      },
    });

    return result ? CourtMapper.toDomain(result) : null;
  }

  async create(data: CreateCourtDto): Promise<Court> {
    const [regions, cass, types] = await Promise.all([
      this.prisma.region.findMany(),
      this.prisma.cassationDistrict.findMany(),
      this.prisma.courtType.findMany(),
    ]);

    const maps = {
      regionMap: new Map(regions.map((r) => [r.code, r.id])),
      cassMap: new Map(cass.map((c) => [c.code, c.id])),
      typeMap: new Map(types.map((t) => [t.code, t.id])),
    };

    const input = CourtMapper.toCreateInput(data, maps);

    const result = await this.prisma.court.create({
      include: {
        region: true,
        cassDistrict: true,
        type: true,
      },
      data: input,
    });

    return CourtMapper.toDomain(result);
  }

  async createBulk(data: CreateCourtDto[]): Promise<{ count: number }> {
    const [regions, cass, types] = await Promise.all([
      this.prisma.region.findMany(),
      this.prisma.cassationDistrict.findMany(),
      this.prisma.courtType.findMany(),
    ]);

    const regionMap = new Map(regions.map((r) => [r.code, r.id]));
    const cassMap = new Map(cass.map((c) => [c.code, c.id]));
    const typeMap = new Map(types.map((t) => [t.code, t.id]));

    const prepared = CourtMapper.toPersistence(data, {
      regionMap,
      cassMap,
      typeMap,
    });

    const result = await this.prisma.court.createMany({
      data: prepared,
      skipDuplicates: true,
    });

    return result;
  }

  async update(id: string, data: UpdateCourtDto): Promise<Court> {
    const [regions, cass, types] = await Promise.all([
      this.prisma.region.findMany(),
      this.prisma.cassationDistrict.findMany(),
      this.prisma.courtType.findMany(),
    ]);

    const maps = {
      regionMap: new Map(regions.map((r) => [r.code, r.id])),
      cassMap: new Map(cass.map((c) => [c.code, c.id])),
      typeMap: new Map(types.map((t) => [t.code, t.id])),
    };

    const input = CourtMapper.toUpdateInput(data, maps);

    const result = await this.prisma.court.update({
      where: { id },
      include: {
        region: true,
        cassDistrict: true,
        type: true,
      },
      data: input,
    });

    return CourtMapper.toDomain(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.court.delete({ where: { id } });
  }
}
