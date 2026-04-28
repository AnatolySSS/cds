import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateNaturalPersonDto {
  @IsNotEmpty() @IsString() name!: string;
  @IsOptional() @IsString() middleName?: string;
  @IsOptional() @IsString() surname?: string;
  @IsOptional() @IsString() passportNumber?: string;
}
