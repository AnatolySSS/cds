import { format, parseISO, isValid } from 'date-fns'
import { ru } from 'date-fns/locale'

export const DateAdapter = {
  fromApi(value?: string | null): Date | undefined {
    if (!value) return undefined

    const date = parseISO(value)
    return isValid(date) ? date : undefined
  },

  // YYYY-MM-DD (без времени)
  toApiDateOnly(value?: Date | null): string | null {
    if (!value) return null

    const y = value.getFullYear()
    const m = String(value.getMonth() + 1).padStart(2, '0')
    const d = String(value.getDate()).padStart(2, '0')

    return `${y}-${m}-${d}`
  },

  // ISO с временем (UTC)
  toApiFullISO(value?: Date | null): string | null {
    if (!value) return null

    return value.toISOString()
  },

  format(value?: Date | null): string {
    if (!value || !isValid(value)) return ''

    return format(value, 'd MMMM yyyy', { locale: ru })
  },

  shortFormat(value?: Date | null): string {
    if (!value || !isValid(value)) return ''

    return format(value, 'd MMM yyyy', { locale: ru })
  },
}
