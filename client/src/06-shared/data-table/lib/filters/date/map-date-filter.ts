import type { DateFilterValue } from '@/06-shared/data-table'
import type {
  DateFilter,
  DatePresetFilter,
  DateRangeFilter,
  DateSingleFilter,
} from '@/06-shared/data-table/types/filters/match-modes'

export function mapDateFilter(id: string, value: DateFilterValue): DateFilter {
  // -------------------------
  // PRESET
  // -------------------------
  if (value.mode === 'preset') {
    const preset: DatePresetFilter = {
      field: id,
      type: 'date',
      mode: 'preset',
      preset: value.preset,
    }

    return preset
  }

  // -------------------------
  // OPERATOR: SINGLE
  // -------------------------
  if (value.type === 'single') {
    // если нет даты — лучше не отправлять фильтр
    if (!value.date) {
      throw new Error('DateSingleFilter: date is required')
    }

    const single: DateSingleFilter = {
      field: id,
      type: 'date',
      mode: 'single',
      matchMode: value.matchMode,
      value: value.date,
    }

    return single
  }

  // -------------------------
  // OPERATOR: RANGE
  // -------------------------
  if (value.type === 'range') {
    // можно гибко — но чаще нужен полный диапазон
    if (!value.from || !value.to) {
      throw new Error('DateRangeFilter: from/to is required')
    }

    const range: DateRangeFilter = {
      field: id,
      type: 'date',
      mode: 'range',
      matchMode: 'between',
      from: value.from,
      to: value.to,
    }

    return range
  }

  throw new Error('Unknown DateFilterValue')
}
