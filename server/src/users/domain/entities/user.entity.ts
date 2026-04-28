import { UserRole } from 'generated/prisma/enums';
import { Employee } from 'src/employees/domain/entities/employee.entity';

export class User {
  constructor(
    public readonly id: string,
    public passwordHash: string,
    public refreshTokenHash: string | null,
    public role: UserRole,
    public employee: Employee,
    public lastLoginAt?: Date | null,
    public readonly createdAt?: Date | null,
    public updatedAt?: Date | null,
    public readonly deletedAt?: Date | null,
  ) {}
}
