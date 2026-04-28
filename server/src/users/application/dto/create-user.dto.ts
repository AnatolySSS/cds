import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';

export class CreateUserDto {
  @IsString() @IsNotEmpty() id!: string;
  @IsEnum(UserRole) @IsNotEmpty() role?: UserRole;
}
