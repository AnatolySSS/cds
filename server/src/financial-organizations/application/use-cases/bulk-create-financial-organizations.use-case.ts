import { Inject, Injectable } from '@nestjs/common';
import { IFinancialOrganizationRepository } from '../../domain/repositories/financial-organization.repository.interface';
import { BulkCreateFinancialOrganizationDto } from '../dto/bulk-create-financial-organization..dto';

@Injectable()
export class BulkCreateFinancialOrganizationsUseCase {
  constructor(
    @Inject('IFinancialOrganizationRepository')
    private readonly financialOrganizationRepo: IFinancialOrganizationRepository,
  ) {}

  async execute(dto: BulkCreateFinancialOrganizationDto): Promise<{ count: number }> {
    return this.financialOrganizationRepo.createBulk(dto.financialOrganizations);
  }
}
