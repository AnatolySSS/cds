import { CreateFinancialOrganizationDto } from '@/financial-organizations/application/dto/create-financial-organization.dto';
import { UpdateFinancialOrganizationDto } from '@/financial-organizations/application/dto/update-financial-organization.dto';

import {
  FinancialActivityType,
  FinancialOrganization,
} from '@/financial-organizations/domain/entities/financial-organization.entity';

export type FinancialOrganizationReferenceMaps = {
  activityTypeMap: Map<string, string>; // code → id
};

export class FinancialOrganizationMapper {
  // =========================
  // DB -> DOMAIN
  // =========================
  static toDomain(org: any): FinancialOrganization {
    return new FinancialOrganization(
      org.id,
      org.shortName,
      org.fullName,
      org.inn,
      org.ogrn,
      org.actualAddress,
      org.legalAddress,
      org.phone,
      org.email,
      new FinancialActivityType(org.activityType.id, org.activityType.code, org.activityType.name),
      org.registrationDate,
      org.terminationDate,
      org.terminationDecisionNumber,
      org.externalId,
      org.createdAt,
      org.updatedAt,
    );
  }

  static toDomainList(rows: any[]): FinancialOrganization[] {
    return rows.map((r) => this.toDomain(r));
  }

  // =========================
  // DTO -> DB (CREATE)
  // =========================
  static toCreateInput(
    dto: CreateFinancialOrganizationDto,
    id: string, // 👈 приходит из Party
    maps: FinancialOrganizationReferenceMaps,
  ) {
    const activityTypeId = maps.activityTypeMap.get(dto.activityTypeCode);

    if (!activityTypeId) {
      throw new Error(`ActivityType not found: ${dto.activityTypeCode}`);
    }

    return {
      id,

      shortName: dto.shortName,
      fullName: dto.fullName ?? null,
      inn: dto.inn,
      ogrn: dto.ogrn ?? null,
      actualAddress: dto.actualAddress ?? null,
      legalAddress: dto.legalAddress ?? null,
      phone: dto.phone ?? null,
      email: dto.email ?? null,

      activityTypeId,

      registrationDate: dto.registrationDate ? new Date(dto.registrationDate) : null,
      terminationDate: dto.terminationDate ? new Date(dto.terminationDate) : null,

      terminationDecisionNumber: dto.terminationDecisionNumber ?? null,
      externalId: dto.externalId,
    };
  }

  // =========================
  // DTO -> DB (BULK helper)
  // ⚠️ использовать только если id уже есть!
  // =========================

  static toPersistence(
    data: { dto: CreateFinancialOrganizationDto; id: string }[],
    maps: FinancialOrganizationReferenceMaps,
  ) {
    return data.map(({ dto, id }) => this.toCreateInput(dto, id, maps));
  }

  // =========================
  // DTO -> DB (UPDATE)
  // =========================
  static toUpdateInput(
    dto: UpdateFinancialOrganizationDto,
    maps: FinancialOrganizationReferenceMaps,
  ) {
    const data: any = {
      ...(dto.shortName !== undefined && { shortName: dto.shortName }),
      ...(dto.fullName !== undefined && { fullName: dto.fullName }),
      ...(dto.inn !== undefined && { inn: dto.inn }),
      ...(dto.ogrn !== undefined && { ogrn: dto.ogrn }),
      ...(dto.actualAddress !== undefined && { actualAddress: dto.actualAddress }),
      ...(dto.legalAddress !== undefined && { legalAddress: dto.legalAddress }),
      ...(dto.phone !== undefined && { phone: dto.phone }),
      ...(dto.email !== undefined && { email: dto.email }),

      ...(dto.registrationDate !== undefined && {
        registrationDate: dto.registrationDate ? new Date(dto.registrationDate) : null,
      }),

      ...(dto.terminationDate !== undefined && {
        terminationDate: dto.terminationDate ? new Date(dto.terminationDate) : null,
      }),

      ...(dto.terminationDecisionNumber !== undefined && {
        terminationDecisionNumber: dto.terminationDecisionNumber,
      }),

      ...(dto.externalId !== undefined && {
        externalId: dto.externalId,
      }),
    };

    // 🔥 связь по code → id
    if (dto.activityTypeCode) {
      const activityTypeId = maps.activityTypeMap.get(dto.activityTypeCode);

      if (!activityTypeId) {
        throw new Error(`ActivityType not found: ${dto.activityTypeCode}`);
      }

      data.activityType = {
        connect: { id: activityTypeId },
      };
    }

    return data;
  }
}
