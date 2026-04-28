import { IDictionariesRepository } from '@/dictionaries/domain/repositories/dictionary.repository.interface';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionariesRepository implements IDictionariesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRegions() {
    return this.prisma.region.findMany({
      select: { code: true, name: true },
      orderBy: { order: 'asc' },
    });
  }

  async getCourtTypes() {
    return this.prisma.courtType.findMany({
      select: { code: true, name: true },
      orderBy: { order: 'asc' },
    });
  }

  async getCassationDistricts() {
    return this.prisma.cassationDistrict.findMany({
      select: { code: true, name: true },
      orderBy: { order: 'asc' },
    });
  }

  async getDivisions() {
    return this.prisma.division.findMany({
      select: { code: true, name: true, number: true },
      orderBy: { order: 'asc' },
    });
  }
  async getFinancialActivityTypes() {
    return this.prisma.financialActivityType.findMany({
      select: { code: true, name: true },
      orderBy: { order: 'asc' },
    });
  }
}
