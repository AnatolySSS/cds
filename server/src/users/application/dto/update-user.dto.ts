import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';

export class UpdateUserDto {
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole; // смена роли

  @IsOptional()
  lastLoginAt?: Date | null;
}
