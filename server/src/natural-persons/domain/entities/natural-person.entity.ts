export class NaturalPerson {
  constructor(
    public readonly id: string,
    public name: string,
    public middleName: string | null,
    public surname: string | null,
    public passportNumber: string | null,
    public readonly createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {}
}
