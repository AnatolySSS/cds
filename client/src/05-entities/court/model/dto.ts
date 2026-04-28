export type CreateCourtDto = {
  name: string
  address?: string
  phone?: string
  email?: string
  site?: string
  regionCode?: string
  cassRegionCode?: string
  typeCode?: string
  serverNumbers?: number
}

export type BulkCreateCourtsRequest = {
  courts: CreateCourtDto[]
}

export type BulkCreateCourtsResponse = {
  count: number
}
