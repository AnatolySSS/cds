export const normalizeDate = (date: string | Date): number => {
  const d = new Date(date)

  if (Number.isNaN(d.getTime())) {
    return NaN
  }

  return d.setHours(0, 0, 0, 0)
}
