import { Inject, Injectable } from '@nestjs/common';
import { IFinancialOrganizationRepository } from '../../domain/repositories/financial-organization.repository.interface';
import { UpdateFinancialOrganizationDto } from '../dto/update-financial-organization.dto';

@Injectable()
export class UpdateFinancialOrganizationUseCase {
  constructor(
    @Inject('IFinancialOrganizationRepository')
    private readonly financialOrganizationRepo: IFinancialOrganizationRepository,
  ) {}

  execute(id: string, dto: UpdateFinancialOrganizationDto) {
    return this.financialOrganizationRepo.update(id, dto);
  }
}
