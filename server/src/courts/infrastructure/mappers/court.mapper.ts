import { CreateCourtDto } from '@/courts/application/dto/create-court.dto';
import { UpdateCourtDto } from '@/courts/application/dto/update-court.dto';

import { CassationDistrict, Court, CourtType, Region } from '@/courts/domain/entities/court.entity';

export type CourtReferenceMaps = {
  regionMap: Map<string, string>;
  cassMap: Map<string, string>;
  typeMap: Map<string, string>;
};

export class CourtMapper {
  // =========================
  // DB -> DOMAIN
  // =========================
  static toDomain(row: any): Court {
    return new Court(
      row.id,
      row.name,

      new Region(row.region.id, row.region.code, row.region.name),

      new CassationDistrict(row.cassDistrict.id, row.cassDistrict.code, row.cassDistrict.name),

      new CourtType(row.type.id, row.type.code, row.type.name),

      row.serverNumbers,
      row.address,
      row.phone,
      row.email,
      row.site,
      row.createdAt,
      row.updatedAt,
      row.deletedAt,
    );
  }

  static toDomainList(rows: any[]): Court[] {
    return rows.map((r) => this.toDomain(r));
  }

  // =========================
  // DTO -> DB (CREATE)
  // =========================
  static toCreateInput(dto: CreateCourtDto, maps: CourtReferenceMaps) {
    const regionId = maps.regionMap.get(dto.regionCode);
    const cassDistrictId = maps.cassMap.get(dto.cassRegionCode);
    const typeId = maps.typeMap.get(dto.typeCode);

    if (!regionId) throw new Error(`Region not found: ${dto.regionCode}`);
    if (!cassDistrictId) throw new Error(`Cassation not found: ${dto.cassRegionCode}`);
    if (!typeId) throw new Error(`Type not found: ${dto.typeCode}`);

    return {
      name: dto.name,
      address: dto.address ?? null,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
      site: dto.site ?? null,
      serverNumbers: dto.serverNumbers ?? 1,

      regionId,
      cassDistrictId,
      typeId,
    };
  }

  static toPersistence(data: CreateCourtDto[], maps: CourtReferenceMaps) {
    return data.map((d) => this.toCreateInput(d, maps));
  }

  // =========================
  // DTO -> DB (UPDATE)
  // =========================
  static toUpdateInput(dto: UpdateCourtDto, maps: CourtReferenceMaps) {
    const data: any = {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.address !== undefined && { address: dto.address }),
      ...(dto.phone !== undefined && { phone: dto.phone }),
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.site !== undefined && { site: dto.site }),
      ...(dto.serverNumbers !== undefined && {
        serverNumbers: Number(dto.serverNumbers),
      }),
    };

    if (dto.regionCode) {
      const id = maps.regionMap.get(dto.regionCode);
      if (!id) throw new Error(`Region not found: ${dto.regionCode}`);

      data.region = { connect: { id } };
    }

    if (dto.cassRegionCode) {
      const id = maps.cassMap.get(dto.cassRegionCode);
      if (!id) throw new Error(`Cassation not found: ${dto.cassRegionCode}`);

      data.cassDistrict = { connect: { id } };
    }

    if (dto.typeCode) {
      const id = maps.typeMap.get(dto.typeCode);
      if (!id) throw new Error(`Type not found: ${dto.typeCode}`);

      data.type = { connect: { id } };
    }

    return data;
  }
}
