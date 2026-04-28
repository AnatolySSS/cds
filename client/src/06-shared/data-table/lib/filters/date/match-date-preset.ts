import { resolveDatePreset } from './resolve-date-preset'
import { normalizeDate } from './normalize-date'

export function matchDatePreset(rowDate: number, preset?: string) {
  if (!preset) return true

  // 📅 DATE PRESETS
  if (rowDate == null) return false

  const range = resolveDatePreset(preset)
  if (!range) return true

  const from = normalizeDate(range.from)
  const to = normalizeDate(range.to)

  return rowDate >= from! && rowDate <= to!
}
