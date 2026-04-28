import { normalizeDate } from './normalize-date'

export function matchRange(rowDate: number, value: any) {
  const from = value.from ? normalizeDate(value.from) : null
  const to = value.to ? normalizeDate(value.to) : null

  if (from && rowDate < from) return false
  if (to && rowDate > to) return false

  return true
}
