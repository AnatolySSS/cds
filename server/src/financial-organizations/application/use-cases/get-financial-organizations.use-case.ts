import { Inject, Injectable } from '@nestjs/common';
import { IFinancialOrganizationRepository } from '../../domain/repositories/financial-organization.repository.interface';
import { GetFinancialOrganizationsResult } from '../dto/get-financial-organization-result.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

@Injectable()
export class GetFinancialOrganizationsUseCase {
  constructor(
    @Inject('IFinancialOrganizationRepository')
    private readonly financialOrganizationRepo: IFinancialOrganizationRepository,
  ) {}

  execute(query: QueryParams): Promise<GetFinancialOrganizationsResult> {
    return this.financialOrganizationRepo.findAll(query);
  }
}
