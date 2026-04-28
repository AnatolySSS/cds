export class FinancialActivityType {
  constructor(
    public readonly id: string,
    public code: string,
    public name: string,
  ) {}
}

export class FinancialOrganization {
  constructor(
    public readonly id: string,
    public shortName: string,
    public fullName: string | null,
    public inn: string,
    public ogrn: string | null,
    public actualAddress: string | null,
    public legalAddress: string | null,
    public phone: string | null,
    public email: string | null,
    public activityType: FinancialActivityType,
    public registrationDate: Date | null,
    public terminationDate: Date | null,
    public terminationDecisionNumber: string | null,
    public externalId: string,
    public readonly createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {}
}
