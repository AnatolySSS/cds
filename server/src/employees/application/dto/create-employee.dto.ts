import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateEmployeeDto {
  @IsString() @IsNotEmpty() cn!: string;
  @IsString() @IsNotEmpty() full_name!: string;
  @IsString() @IsNotEmpty() department!: string;
  @IsString() @IsNotEmpty() title!: string;
  @IsString() @IsNotEmpty() divisionCode!: string;
  @IsString() @IsNotEmpty() login!: string;
  @IsBoolean() @IsNotEmpty() is_present!: boolean;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() dn?: string;
}
