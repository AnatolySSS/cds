// src/users/infrastructure/mappers/user.mapper.ts
import { ResponseUserDto } from 'src/users/application/dto/response-user.dto';
import { User } from '../../domain/entities/user.entity';
import { EmployeeMapper } from '@/employees/infrastructure/mappers/employee.mapper';

export class UserMapper {
  // =========================
  // DB -> DOMAIN
  // =========================
  static toDomain(row: any): User {
    return new User(
      row.id,
      row.passwordHash,
      row.refreshTokenHash,
      row.role,
      EmployeeMapper.toDomain(row.employee),
      row.lastLoginAt,
      row.createdAt,
      row.updatedAt,
      row.deletedAt,
    );
  }
  // =========================
  // DB -> RESPONSE DTO
  // =========================
  static toResponse(row: any): ResponseUserDto {
    return {
      id: row.id,
      role: row.role,
      lastLoginAt: row.lastLoginAt ?? null,
      createdAt: row.createdAt ?? null,
      updatedAt: row.updatedAt ?? null,
      deletedAt: row.deletedAt ?? null,
      employee: EmployeeMapper.toDomain(row.employee),
    };
  }

  static toResponseList(rows: any[]): ResponseUserDto[] {
    return rows.map((r) => this.toResponse(r));
  }
}
