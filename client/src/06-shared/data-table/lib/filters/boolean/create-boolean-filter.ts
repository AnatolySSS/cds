export function createBooleanFilter(
  row: any,
  id: string,
  filter: boolean | undefined,
) {
  if (filter === undefined) return true

  const raw = row.getValue(id)

  if (raw == null) return false

  return Boolean(raw) === filter
}
