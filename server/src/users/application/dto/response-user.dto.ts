import { Employee } from '@/employees/domain/entities/employee.entity';
import { IsEnum, IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';

export class ResponseUserDto {
  @IsString() @IsNotEmpty() id!: string;
  @IsEnum(UserRole) @IsNotEmpty() role!: UserRole;
  @IsNotEmpty() employee!: Employee;
  @IsOptional() @IsDate() lastLoginAt?: Date | null;
  @IsOptional() @IsDate() createdAt?: Date | null;
  @IsOptional() @IsDate() updatedAt?: Date | null;
  @IsOptional() @IsDate() deletedAt?: Date | null;
}
