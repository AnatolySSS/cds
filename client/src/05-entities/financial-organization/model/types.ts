export interface ActivityType {
  id: string
  name: string
  code: string
}

export interface FinancialOrganization {
  id: string
  shortName: string
  fullName: string
  inn: string
  ogrn: string
  actualAddress: string
  legalAddress: string
  phone: string
  email: string
  activityType: ActivityType
  registrationDate: string | null
  terminationDate: string | null
  terminationDecisionNumber: string
  externalId: string
}
