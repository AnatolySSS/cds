import { normalizeDate } from './normalize-date'
import { matchDatePreset } from './match-date-preset'
import { matchSingleDate } from './match-single-date'
import { matchRange } from './match-range'
import { type DateFilterValue } from '@/06-shared/data-table'
import { matchCommonPreset } from '../common/match-common-preset'
import { isEmptyPreset } from '../common/is-common-preset'

export function createDateFilter(
  row: any,
  id: string,
  filter: DateFilterValue | undefined,
) {
  if (!filter) return true

  const raw = row.getValue(id)
  // if (!raw) return true

  const rowDate = normalizeDate(raw)

  // SINGLE
  if (filter.mode === 'single') {
    if (filter.preset) {
      if (isEmptyPreset(filter.preset)) {
        return matchCommonPreset(raw, filter.preset)
      }

      return matchDatePreset(rowDate, filter.preset)
    }

    return matchSingleDate(rowDate, filter)
  }

  // RANGE
  if (filter.mode === 'range') {
    return matchRange(rowDate, filter)
  }

  return true
}
