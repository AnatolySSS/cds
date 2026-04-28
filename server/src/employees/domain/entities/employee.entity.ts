export class Division {
  constructor(
    public readonly id: string,
    public code: string,
    public name: string,
  ) {}
}

export class Employee {
  constructor(
    public readonly id: string,
    public cn: string,
    public full_name: string,
    public department: string,
    public title: string,
    public division: Division,
    public login: string,
    public is_present: boolean,
    public email?: string | null,
    public phone?: string | null,
    public dn?: string | null,
    public readonly createdAt?: Date | null,
    public updatedAt?: Date | null,
    public readonly deletedAt?: Date | null,
  ) {}
}
