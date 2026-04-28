import { CreateNaturalPersonDto } from '@/natural-persons/application/dto/create-natural-person.dto';
import { UpdateNaturalPersonDto } from '@/natural-persons/application/dto/update-natural-person.dto';
import { NaturalPerson } from '@/natural-persons/domain/entities/natural-person.entity';

export class NaturalPersonMapper {
  // =========================
  // DB -> DOMAIN
  // =========================
  static toDomain(np: any): NaturalPerson {
    return new NaturalPerson(
      np.id,
      np.name,
      np.middleName,
      np.surname,
      np.passportNumber,
      np.createdAt,
      np.updatedAt,
    );
  }

  static toDomainList(rows: any[]): NaturalPerson[] {
    return rows.map((r) => this.toDomain(r));
  }

  // =========================
  // DTO -> DB (CREATE)
  // =========================
  static toCreateInput(
    dto: CreateNaturalPersonDto,
    id: string, // 👈 приходит из Party
  ) {
    return {
      id,

      name: dto.name,
      middleName: dto.middleName ?? null,
      surname: dto.surname ?? null,
      passportNumber: dto.passportNumber ?? null,
    };
  }

  // =========================
  // DTO -> DB (BULK helper)
  // ⚠️ использовать только если id уже есть!
  // =========================

  static toPersistence(data: { dto: CreateNaturalPersonDto; id: string }[]) {
    return data.map(({ dto, id }) => this.toCreateInput(dto, id));
  }

  // =========================
  // DTO -> DB (UPDATE)
  // =========================
  static toUpdateInput(dto: UpdateNaturalPersonDto) {
    const data: any = {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.middleName !== undefined && { middleName: dto.middleName }),
      ...(dto.surname !== undefined && { surname: dto.surname }),
      ...(dto.passportNumber !== undefined && { passportNumber: dto.passportNumber }),
    };

    return data;
  }
}
