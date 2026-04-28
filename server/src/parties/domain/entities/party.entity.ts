export enum PartyType {
  NATURAL = 'NATURAL',
  LEGAL = 'LEGAL',
  INDIVIDUAL = 'INDIVIDUAL',
  FINANCIAL_ORGANIZATION = 'FINANCIAL_ORGANIZATION',
}

export class Party {
  constructor(
    public readonly id: string,
    public type: PartyType,
  ) {}
}
