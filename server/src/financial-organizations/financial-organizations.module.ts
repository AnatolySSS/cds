import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { BulkCreateFinancialOrganizationsUseCase } from './application/use-cases/bulk-create-financial-organizations.use-case';
import { CreateFinancialOrganizationUseCase } from './application/use-cases/create-financial-organization.use-case';
import { FinancialOrganizationRepository } from './infrastructure/repositories/financial-organization.repository';
import { FinancialOrganizationsController } from './infrastructure/controllers/financial-organization.controller';
import { DeleteFinancialOrganizationUseCase } from './application/use-cases/delete-financial-organization.use-case';
import { GetFinancialOrganizationUseCase } from './application/use-cases/get-financial-organization.use-case';
import { GetFinancialOrganizationsUseCase } from './application/use-cases/get-financial-organizations.use-case';
import { UpdateFinancialOrganizationUseCase } from './application/use-cases/update-financial-organization.use-case';

@Module({
  controllers: [FinancialOrganizationsController],
  providers: [
    PrismaService,
    BulkCreateFinancialOrganizationsUseCase,
    CreateFinancialOrganizationUseCase,
    DeleteFinancialOrganizationUseCase,
    GetFinancialOrganizationUseCase,
    GetFinancialOrganizationsUseCase,
    UpdateFinancialOrganizationUseCase,
    {
      provide: 'IFinancialOrganizationRepository',
      useClass: FinancialOrganizationRepository,
    },
  ],
})
export class FinancialOrganizationsModule {}
