import type { Court } from '@/05-entities'
import type { SelectOption } from '@/06-shared/data-table'

export interface CourtTableMeta {
  courtTypes: SelectOption[]
  regions: SelectOption[]
  cassationDistricts: SelectOption[]
  setIsDeleteDialogOpen?: (value: boolean) => void
  setDeletedCourt?: (court: Court | null) => void
}

export type CourtForm = {
  name: string
  address: string
  email: string
  site: string
  phone: string
  serverNumbers: number
  regionCode: string
  cassRegionCode: string
  typeCode: string
}
