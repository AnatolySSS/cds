import { CreateFinancialOrganizationDto } from 'src/financial-organizations/application/dto/create-financial-organization.dto';
import { FinancialOrganization } from '../entities/financial-organization.entity';
import { UpdateFinancialOrganizationDto } from 'src/financial-organizations/application/dto/update-financial-organization.dto';
import { GetFinancialOrganizationsResult } from '@/financial-organizations/application/dto/get-financial-organization-result.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

export interface IFinancialOrganizationRepository {
  findAll(query: QueryParams): Promise<GetFinancialOrganizationsResult>;
  findById(id: string): Promise<FinancialOrganization | null>;
  create(data: CreateFinancialOrganizationDto): Promise<FinancialOrganization>;
  createBulk(data: CreateFinancialOrganizationDto[]): Promise<{ count: number }>;
  update(id: string, data: UpdateFinancialOrganizationDto): Promise<FinancialOrganization>;
  delete(id: string): Promise<void>;
}
