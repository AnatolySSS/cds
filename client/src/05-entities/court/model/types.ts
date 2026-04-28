export interface Region {
  id: string
  name: string
  code: string
}

export interface CassationDistrict {
  id: string
  name: string
  code: string
}

export interface CourtType {
  id: string
  name: string
  code: string
}

export interface Court {
  id: string
  name: string
  address: string
  phone: string
  email: string
  site: string
  region: Region
  cassRegion: CassationDistrict
  type: CourtType
  serverNumbers: number
}
