import { Type } from 'class-transformer';
import { ValidateNested, ArrayMinSize, IsArray } from 'class-validator';
import { CreateFinancialOrganizationDto } from './create-financial-organization.dto';

export class BulkCreateFinancialOrganizationDto {
  @ValidateNested({ each: true })
  @Type(() => CreateFinancialOrganizationDto)
  @IsArray()
  @ArrayMinSize(1) // хотя бы один объект
  financialOrganizations!: CreateFinancialOrganizationDto[];
}
