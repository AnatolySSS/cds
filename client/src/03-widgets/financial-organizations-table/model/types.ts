import type { FinancialOrganization } from '@/05-entities'
import type { SelectOption } from '@/06-shared/data-table'

export interface FinancialOrganizationTableMeta {
  financialActivityTypes: SelectOption[]
  setIsDeleteDialogOpen?: (value: boolean) => void
  setDeletedFinancialOrganization?: (
    financialOrganization: FinancialOrganization | null,
  ) => void
}

export type FinancialOrganizationForm = {
  shortName: string
  fullName: string
  inn: string
  ogrn: string
  actualAddress: string
  legalAddress: string
  phone: string
  email: string
  activityTypeCode: string
  registrationDate: string | null
  terminationDate: string | null
  terminationDecisionNumber: string
  externalId: string
}
