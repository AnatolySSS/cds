export class Region {
  constructor(
    public readonly id: string,
    public code: string,
    public name: string,
  ) {}
}

export class CassationDistrict {
  constructor(
    public readonly id: string,
    public code: string,
    public name: string,
  ) {}
}

export class CourtType {
  constructor(
    public readonly id: string,
    public code: string,
    public name: string,
  ) {}
}

export class Court {
  constructor(
    public readonly id: string,
    public name: string,
    public region: Region,
    public cassRegion: CassationDistrict,
    public type: CourtType,
    public serverNumbers: number,
    public address?: string | null,
    public phone?: string | null,
    public email?: string | null,
    public site?: string | null,
    public readonly createdAt?: Date | null,
    public readonly updatedAt?: Date | null,
    public readonly deletedAt?: Date | null,
  ) {}
}
