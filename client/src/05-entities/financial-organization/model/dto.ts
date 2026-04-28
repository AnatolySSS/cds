export type CreateFinancialOrganizationDto = {
  shortName: string
  fullName?: string
  inn: string
  ogrn?: string
  actualAddress?: string
  legalAddress?: string
  phone?: string
  email?: string
  activityTypeCode: string
  registrationDate?: string | null
  terminationDate?: string | null
  terminationDecisionNumber?: string
  externalId: string
}

export type BulkCreateFinancialOrganizationsRequest = {
  financialOrganizations: CreateFinancialOrganizationDto[]
}

export type BulkCreateFinancialOrganizationsResponse = {
  count: number
}
