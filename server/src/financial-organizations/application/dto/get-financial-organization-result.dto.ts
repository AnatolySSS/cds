import { FinancialOrganization } from '@/financial-organizations/domain/entities/financial-organization.entity';

export class GetFinancialOrganizationsResult {
  items!: FinancialOrganization[];
  total!: number;
}
