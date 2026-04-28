import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from 'date-fns'

export function resolveDatePreset(preset: string) {
  const now = new Date()

  switch (preset) {
    case 'today':
      return { from: startOfDay(now), to: endOfDay(now) }

    case 'yesterday':
      return {
        from: startOfDay(subDays(now, 1)),
        to: endOfDay(subDays(now, 1)),
      }

    case 'tomorrow':
      return {
        from: startOfDay(addDays(now, 1)),
        to: endOfDay(addDays(now, 1)),
      }

    case 'this_week':
      return { from: startOfWeek(now), to: endOfWeek(now) }

    case 'last_week':
      return {
        from: startOfWeek(subWeeks(now, 1)),
        to: endOfWeek(subWeeks(now, 1)),
      }

    case 'next_week':
      return {
        from: startOfWeek(addWeeks(now, 1)),
        to: endOfWeek(addWeeks(now, 1)),
      }

    case 'this_month':
      return { from: startOfMonth(now), to: endOfMonth(now) }

    case 'last_month':
      return {
        from: startOfMonth(subMonths(now, 1)),
        to: endOfMonth(subMonths(now, 1)),
      }

    case 'next_month':
      return {
        from: startOfMonth(addMonths(now, 1)),
        to: endOfMonth(addMonths(now, 1)),
      }

    case 'this_year':
      return { from: startOfYear(now), to: endOfYear(now) }

    case 'last_year':
      return {
        from: startOfYear(subYears(now, 1)),
        to: endOfYear(subYears(now, 1)),
      }

    case 'next_year':
      return {
        from: startOfYear(addYears(now, 1)),
        to: endOfYear(addYears(now, 1)),
      }

    default:
      return null
  }
}
