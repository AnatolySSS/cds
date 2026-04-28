import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFinancialOrganizationRepository } from '../../domain/repositories/financial-organization.repository.interface';
import { FinancialOrganization } from '../../domain/entities/financial-organization.entity';

@Injectable()
export class GetFinancialOrganizationUseCase {
  constructor(
    @Inject('IFinancialOrganizationRepository')
    private readonly financialOrganizationRepo: IFinancialOrganizationRepository,
  ) {}

  async execute(id: string): Promise<FinancialOrganization> {
    const financialOrganization = await this.financialOrganizationRepo.findById(id);
    if (!financialOrganization)
      throw new NotFoundException(`FinancialOrganization ${id} not found`);
    return financialOrganization;
  }
}
