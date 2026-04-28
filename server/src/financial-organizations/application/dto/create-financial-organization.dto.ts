import {
  IsString,
  IsOptional,
  IsUUID,
  IsDateString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateFinancialOrganizationDto {
  @IsNotEmpty() @IsString() shortName!: string;
  @IsOptional() @IsString() fullName?: string;
  @IsNotEmpty() @IsString() @MinLength(10) @MaxLength(12) inn!: string;
  @IsOptional() @IsString() @MaxLength(13) ogrn?: string;
  @IsOptional() @IsString() actualAddress?: string;
  @IsOptional() @IsString() legalAddress?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() email?: string;
  @IsNotEmpty() @IsString() activityTypeCode!: string;
  @IsOptional() @IsDateString() registrationDate?: string;
  @IsOptional() @IsDateString() terminationDate?: string;
  @IsOptional() @IsString() terminationDecisionNumber?: string;
  @IsNotEmpty() @IsString() externalId!: string;
}
