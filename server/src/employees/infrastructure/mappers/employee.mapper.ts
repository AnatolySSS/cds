// src/users/infrastructure/mappers/employee.mapper.ts
import { CreateEmployeeDto } from '@/employees/application/dto/create-employee.dto';
import { Division, Employee } from '../../domain/entities/employee.entity';
import { UpdateEmployeeDto } from '@/employees/application/dto/update-employee.dto';

export type EmployeeReferenceMaps = {
  divisionMap: Map<string, string>;
};

export class EmployeeMapper {
  // =========================
  // DB -> DOMAIN
  // =========================
  static toDomain(row: any): Employee {
    return new Employee(
      row.id,
      row.cn,
      row.full_name,
      row.department,
      row.title,
      new Division(row.division.id, row.division.code, row.division.name),
      row.login,
      row.is_present,
      row.email,
      row.phone,
      row.dn,
      row.createdAt,
      row.updatedAt,
      row.deletedAt,
    );
  }

  static toDomainList(rows: any[]): Employee[] {
    return rows.map((r) => this.toDomain(r));
  }

  // =========================
  // DTO -> DB (CREATE)
  // =========================
  static toCreateInput(dto: CreateEmployeeDto, maps: EmployeeReferenceMaps) {
    const divisionId = maps.divisionMap.get(dto.divisionCode);

    if (!divisionId) throw new Error(`Division not found: ${dto.divisionCode}`);

    return {
      cn: dto.cn,
      full_name: dto.full_name ?? null,
      department: dto.department ?? null,
      title: dto.title ?? null,
      login: dto.login ?? null,
      is_present: dto.is_present ?? null,
      email: dto.email ?? null,
      phone: dto.phone ?? null,
      dn: dto.dn ?? null,

      divisionId,
    };
  }

  static toPersistence(data: CreateEmployeeDto[], maps: EmployeeReferenceMaps) {
    return data.map((d) => this.toCreateInput(d, maps));
  }

  // =========================
  // DTO -> DB (UPDATE)
  // =========================
  static toUpdateInput(dto: UpdateEmployeeDto, maps: EmployeeReferenceMaps) {
    const data: any = {
      ...(dto.cn !== undefined && { cn: dto.cn }),
      ...(dto.full_name !== undefined && { full_name: dto.full_name }),
      ...(dto.department !== undefined && { department: dto.department }),
      ...(dto.title !== undefined && { title: dto.title }),
      ...(dto.login !== undefined && { login: dto.login }),
      ...(dto.is_present !== undefined && { is_present: dto.is_present }),
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.phone !== undefined && { phone: dto.phone }),
      ...(dto.dn !== undefined && { dn: dto.dn }),
    };

    if (dto.divisionCode) {
      const id = maps.divisionMap.get(dto.divisionCode);
      if (!id) throw new Error(`Division not found: ${dto.divisionCode}`);

      data.division = { connect: { id } };
    }

    return data;
  }
}
