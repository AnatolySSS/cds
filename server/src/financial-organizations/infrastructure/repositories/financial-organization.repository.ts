import { Injectable } from '@nestjs/common';
import { IFinancialOrganizationRepository } from '../../domain/repositories/financial-organization.repository.interface';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { FinancialOrganization } from '../../domain/entities/financial-organization.entity';
import { CreateFinancialOrganizationDto } from '../../application/dto/create-financial-organization.dto';
import { UpdateFinancialOrganizationDto } from '../../application/dto/update-financial-organization.dto';
import { PartyType } from 'generated/prisma/enums';
import { FinancialOrganizationMapper } from '../mappers/financial-organization.mapper';
import { GetFinancialOrganizationsResult } from '@/financial-organizations/application/dto/get-financial-organization-result.dto';
import {
  QueryEngine,
  QueryParams,
} from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';
import { financialOrganizationQueryConfig } from '../config/financial-organization-query.config';

@Injectable()
export class FinancialOrganizationRepository implements IFinancialOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // FIND ALL
  // =========================
  async findAll(query: QueryParams): Promise<GetFinancialOrganizationsResult> {
    const engine = new QueryEngine(query, financialOrganizationQueryConfig);
    const qb = engine.build();

    const [items, total] = await this.prisma.$transaction([
      this.prisma.financialOrganization.findMany({
        ...qb,
        include: { activityType: true },
      }),
      this.prisma.financialOrganization.count({
        where: qb.where,
      }),
    ]);

    return {
      items: FinancialOrganizationMapper.toDomainList(items),
      total,
    };
  }

  // =========================
  // FIND BY ID
  // =========================
  async findById(id: string): Promise<FinancialOrganization | null> {
    const model = await this.prisma.financialOrganization.findUnique({
      where: { id },
      include: { activityType: true },
    });

    return model ? FinancialOrganizationMapper.toDomain(model) : null;
  }

  // =========================
  // CREATE
  // =========================
  async create(dto: CreateFinancialOrganizationDto): Promise<FinancialOrganization> {
    const model = await this.prisma.$transaction(async (tx) => {
      // 1. создаём Party
      const party = await tx.party.create({
        data: {
          type: PartyType.FINANCIAL_ORGANIZATION,
        },
      });

      // 2. справочники (внутри транзакции — ок для консистентности)
      const activityTypes = await tx.financialActivityType.findMany();

      const maps = {
        activityTypeMap: new Map(activityTypes.map((t) => [t.code, t.id])),
      };

      // 3. маппинг
      const data = FinancialOrganizationMapper.toCreateInput(dto, party.id, maps);

      // 4. создаём организацию
      return tx.financialOrganization.create({
        include: { activityType: true },
        data,
      });
    });

    return FinancialOrganizationMapper.toDomain(model);
  }

  // =========================
  // CREATE BULK
  // =========================
  async createBulk(data: CreateFinancialOrganizationDto[]): Promise<{ count: number }> {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. справочники
        const activityTypes = await tx.financialActivityType.findMany();

        const maps = {
          activityTypeMap: new Map(activityTypes.map((t) => [t.code, t.id])),
        };

        // 2. создаём Party для всех заранее
        const parties = await Promise.all(
          data.map(() =>
            tx.party.create({
              data: {
                type: PartyType.FINANCIAL_ORGANIZATION,
              },
            }),
          ),
        );

        // 3. подготавливаем вход для mapper
        const prepared = FinancialOrganizationMapper.toPersistence(
          data.map((dto, i) => ({
            dto,
            id: parties[i].id,
          })),
          maps,
        );

        // 4. создаём все записи
        await Promise.all(
          prepared.map((input) =>
            tx.financialOrganization.create({
              include: { activityType: true },
              data: input,
            }),
          ),
        );

        return { count: prepared.length };
      },
      {
        timeout: 60000, // обязательно увеличиваем
      },
    );
  }

  // =========================
  // UPDATE
  // =========================
  async update(id: string, data: UpdateFinancialOrganizationDto): Promise<FinancialOrganization> {
    // 1. справочники
    const activityTypes = await this.prisma.financialActivityType.findMany();

    const maps = {
      activityTypeMap: new Map(activityTypes.map((t) => [t.code, t.id])),
    };

    const input = FinancialOrganizationMapper.toUpdateInput(data, maps);

    const model = await this.prisma.financialOrganization.update({
      where: { id },
      include: { activityType: true },
      data: input,
    });

    return FinancialOrganizationMapper.toDomain(model);
  }

  // =========================
  // DELETE
  // =========================
  async delete(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.financialOrganization.delete({ where: { id } }),
      this.prisma.party.delete({ where: { id } }),
    ]);
  }
}
