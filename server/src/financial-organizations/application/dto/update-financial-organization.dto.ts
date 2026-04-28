import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialOrganizationDto } from './create-financial-organization.dto';

export class UpdateFinancialOrganizationDto extends PartialType(CreateFinancialOrganizationDto) {}
