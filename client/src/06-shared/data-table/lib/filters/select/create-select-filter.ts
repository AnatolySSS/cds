export function createSelectFilter(row: any, id: string, value: string[]) {
  if (!Array.isArray(value) || value.length === 0) return true

  const cellValue = row.getValue(id)

  // если объект (как activityType)
  if (typeof cellValue === 'object' && cellValue !== null) {
    return value.includes(String((cellValue as any).code))
  }

  // если примитив
  return value.includes(String(cellValue))
}
