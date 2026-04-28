import { normalizeDate } from './normalize-date'

export function matchSingleDate(rowDate: number, value: any) {
  if (!value?.date) return true

  const filterDate = normalizeDate(value.date)

  switch (value.operator) {
    case 'eq':
      return rowDate === filterDate
    case 'neq':
      return rowDate !== filterDate
    case 'before':
      return rowDate < filterDate
    case 'after':
      return rowDate > filterDate
    default:
      return true
  }
}
