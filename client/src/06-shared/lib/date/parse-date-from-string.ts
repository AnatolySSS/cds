export function parseDateFromString(value: string): Date | undefined {
  const match = value.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{4})/)

  if (!match) return undefined

  const [, dd, mm, yyyy] = match

  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd))

  // защита от кривых дат типа 32.13.2020
  if (
    date.getFullYear() !== Number(yyyy) ||
    date.getMonth() !== Number(mm) - 1 ||
    date.getDate() !== Number(dd)
  ) {
    return undefined
  }

  return date
}
