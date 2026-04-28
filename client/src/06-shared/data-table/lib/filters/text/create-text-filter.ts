import type { TextFilterValue } from '@/06-shared/data-table'
import { matchText } from './match-text'
import { matchCommonPreset } from '../common/match-common-preset'

export function createTextFilter(
  row: any,
  id: string,
  filter: TextFilterValue | undefined,
) {
  if (!filter) return true

  const raw = row.getValue(id)

  const rowValue = String(raw).toLowerCase()

  if (filter.preset) {
    return matchCommonPreset(rowValue, filter.preset)
  }

  if (!filter.value) return true

  const search = filter.value.toLowerCase()
  return matchText(rowValue, search, filter.matchMode)
}
