import { EmptyPreset } from '@/06-shared/data-table/types/filters/match-modes'

export function isEmptyPreset(preset: string): preset is EmptyPreset {
  return Object.values(EmptyPreset).includes(preset as EmptyPreset)
}
