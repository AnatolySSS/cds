import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCourtDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsOptional() address?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() site?: string;
  @IsString() @IsNotEmpty() regionCode!: string;
  @IsString() @IsNotEmpty() cassRegionCode!: string;
  @IsString() @IsNotEmpty() typeCode!: string;
  @IsInt() @IsOptional() serverNumbers?: number;
}
