import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { GetFinancialOrganizationsUseCase } from '../../application/use-cases/get-financial-organizations.use-case';
import { GetFinancialOrganizationUseCase } from '../../application/use-cases/get-financial-organization.use-case';
import { CreateFinancialOrganizationUseCase } from '../../application/use-cases/create-financial-organization.use-case';
import { BulkCreateFinancialOrganizationsUseCase } from '../../application/use-cases/bulk-create-financial-organizations.use-case';
import { UpdateFinancialOrganizationUseCase } from '../../application/use-cases/update-financial-organization.use-case';
import { DeleteFinancialOrganizationUseCase } from '../../application/use-cases/delete-financial-organization.use-case';
import { CreateFinancialOrganizationDto } from '../../application/dto/create-financial-organization.dto';
import { UpdateFinancialOrganizationDto } from '../../application/dto/update-financial-organization.dto';
import { BulkCreateFinancialOrganizationDto } from '../../application/dto/bulk-create-financial-organization..dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

@Controller('financialOrganizations')
export class FinancialOrganizationsController {
  constructor(
    private readonly getFinancialOrganizations: GetFinancialOrganizationsUseCase,
    private readonly getFinancialOrganization: GetFinancialOrganizationUseCase,
    private readonly createFinancialOrganization: CreateFinancialOrganizationUseCase,
    private readonly updateFinancialOrganization: UpdateFinancialOrganizationUseCase,
    private readonly deleteFinancialOrganization: DeleteFinancialOrganizationUseCase,
    private readonly bulkCreateUseCase: BulkCreateFinancialOrganizationsUseCase,
  ) {}

  @Post('search') getAll(@Body() query: QueryParams) {
    return this.getFinancialOrganizations.execute(query);
  }
  @Get(':id') getOne(@Param('id') id: string) {
    return this.getFinancialOrganization.execute(id);
  }
  @Post() create(@Body() dto: CreateFinancialOrganizationDto) {
    return this.createFinancialOrganization.execute(dto);
  }
  @Post('bulk')
  async bulkCreate(@Body() dto: BulkCreateFinancialOrganizationDto) {
    return this.bulkCreateUseCase.execute(dto);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateFinancialOrganizationDto) {
    return this.updateFinancialOrganization.execute(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.deleteFinancialOrganization.execute(id);
  }
}
