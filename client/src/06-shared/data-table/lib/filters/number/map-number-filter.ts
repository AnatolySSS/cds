import type { NumberFilter } from '@/06-shared/data-table/types/filters/match-modes'
import type { NumberFilterValue } from '@/06-shared/data-table/types/filters/filter-values'

export function mapNumberFilter(
  id: string,
  value: NumberFilterValue,
): NumberFilter {
  // -------------------------
  // PRESET (empty / notEmpty)
  // -------------------------
  if (value.mode === 'preset') {
    return {
      field: id,
      type: 'number',
      matchMode: value.preset,
    }
  }

  // -------------------------
  // OPERATOR (contains, equals...)
  // -------------------------
  return {
    field: id,
    type: 'number',
    matchMode: value.matchMode,
    value: value.value,
  }
}
