import type { TextFilter } from '@/06-shared/data-table/types/filters/match-modes'
import type { TextFilterValue } from '@/06-shared/data-table'

export function mapTextFilter(id: string, value: TextFilterValue): TextFilter {
  // -------------------------
  // PRESET (empty / notEmpty)
  // -------------------------
  if (value.mode === 'preset') {
    return {
      field: id,
      type: 'text',
      matchMode: value.preset,
    }
  }

  // -------------------------
  // OPERATOR (contains, equals...)
  // -------------------------
  return {
    field: id,
    type: 'text',
    matchMode: value.matchMode,
    value: value.value,
  }
}
