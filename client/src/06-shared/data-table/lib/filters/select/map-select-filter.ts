import type { SelectFilterValue } from '@/06-shared/data-table'
import type { SelectFilter } from '@/06-shared/data-table/types/filters/match-modes'

export function mapSelectFilter(
  id: string,
  value: SelectFilterValue,
): SelectFilter {
  // -------------------------
  // PRESET (empty / notEmpty)
  // -------------------------
  if (value.mode === 'preset') {
    return {
      field: id,
      type: 'select',
      matchMode: value.preset,
      value: [],
    }
  }

  // -------------------------
  // OPERATOR (in)
  // -------------------------
  return {
    field: id,
    type: 'select',
    matchMode: 'in',
    value: value.value.map((v) => v.value),
  }
}
