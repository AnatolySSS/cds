import { Inject, Injectable } from '@nestjs/common';
import { IFinancialOrganizationRepository } from 'src/financial-organizations/domain/repositories/financial-organization.repository.interface';
import { CreateFinancialOrganizationDto } from '../dto/create-financial-organization.dto';
import { FinancialOrganization } from 'src/financial-organizations/domain/entities/financial-organization.entity';

@Injectable()
export class CreateFinancialOrganizationUseCase {
  constructor(
    @Inject('IFinancialOrganizationRepository')
    private readonly financialOrganizationRepo: IFinancialOrganizationRepository,
  ) {}

  execute(dto: CreateFinancialOrganizationDto): Promise<FinancialOrganization> {
    return this.financialOrganizationRepo.create(dto);
  }
}
