import { EmptyPreset } from '@/06-shared/data-table/types/filters/match-modes'

export function matchCommonPreset(
  value: string | null | undefined,
  preset: EmptyPreset,
) {
  switch (preset) {
    case EmptyPreset.EMPTY:
      return value === '' || value === null || value === undefined

    case EmptyPreset.NOT_EMPTY:
      return value !== '' && value !== null && value !== undefined

    default:
      return true
  }
}
