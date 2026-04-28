import { Inject, Injectable } from '@nestjs/common';
import { IFinancialOrganizationRepository } from '../../domain/repositories/financial-organization.repository.interface';

@Injectable()
export class DeleteFinancialOrganizationUseCase {
  constructor(
    @Inject('IFinancialOrganizationRepository')
    private readonly financialOrganizationRepo: IFinancialOrganizationRepository,
  ) {}

  execute(id: string) {
    return this.financialOrganizationRepo.delete(id);
  }
}
