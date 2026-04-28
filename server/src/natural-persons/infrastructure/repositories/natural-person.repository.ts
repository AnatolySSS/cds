import { Injectable } from '@nestjs/common';
import { INaturalPersonRepository } from '../../domain/repositories/natural-person.repository.interface';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { NaturalPerson } from '../../domain/entities/natural-person.entity';
import { CreateNaturalPersonDto } from '../../application/dto/create-natural-person.dto';
import { UpdateNaturalPersonDto } from '../../application/dto/update-natural-person.dto';
import { PartyType } from 'generated/prisma/enums';
import { NaturalPersonMapper } from '../mappers/natural-person.mapper';

@Injectable()
export class NaturalPersonRepository implements INaturalPersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // FIND ALL
  // =========================
  async findAll(): Promise<NaturalPerson[]> {
    const models = await this.prisma.naturalPerson.findMany({
      orderBy: {
        surname: 'asc',
      },
    });

    return NaturalPersonMapper.toDomainList(models);
  }

  // =========================
  // FIND BY ID
  // =========================
  async findById(id: string): Promise<NaturalPerson | null> {
    const model = await this.prisma.naturalPerson.findUnique({
      where: { id },
    });

    return model ? NaturalPersonMapper.toDomain(model) : null;
  }

  // =========================
  // CREATE
  // =========================
  async create(dto: CreateNaturalPersonDto): Promise<NaturalPerson> {
    const model = await this.prisma.$transaction(async (tx) => {
      // 1. создаём Party
      const party = await tx.party.create({
        data: {
          type: PartyType.NATURAL,
        },
      });

      // 2. справочники (внутри транзакции — ок для консистентности)
      const activityTypes = await tx.financialActivityType.findMany();

      const maps = {
        activityTypeMap: new Map(activityTypes.map((t) => [t.code, t.id])),
      };

      // 3. маппинг
      const data = NaturalPersonMapper.toCreateInput(dto, party.id);

      // 4. создаём организацию
      return tx.naturalPerson.create({
        data,
      });
    });

    return NaturalPersonMapper.toDomain(model);
  }

  // =========================
  // CREATE BULK
  // =========================
  async createBulk(data: CreateNaturalPersonDto[]): Promise<{ count: number }> {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. создаём Party для всех заранее
        const parties = await Promise.all(
          data.map(() =>
            tx.party.create({
              data: {
                type: PartyType.FINANCIAL_ORGANIZATION,
              },
            }),
          ),
        );

        // 2. подготавливаем вход для mapper
        const prepared = NaturalPersonMapper.toPersistence(
          data.map((dto, i) => ({
            dto,
            id: parties[i].id,
          })),
        );

        // 3. создаём все записи
        await Promise.all(
          prepared.map((input) =>
            tx.naturalPerson.create({
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
  async update(id: string, data: UpdateNaturalPersonDto): Promise<NaturalPerson> {
    const input = NaturalPersonMapper.toUpdateInput(data);

    const model = await this.prisma.naturalPerson.update({
      where: { id },
      data: input,
    });

    return NaturalPersonMapper.toDomain(model);
  }

  // =========================
  // DELETE
  // =========================
  async delete(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.naturalPerson.delete({ where: { id } }),
      this.prisma.party.delete({ where: { id } }),
    ]);
  }
}
