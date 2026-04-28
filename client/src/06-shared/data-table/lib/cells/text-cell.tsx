import type { CellContext } from '@tanstack/react-table'

export function createTextCell(columnName: string) {
  return ({ row }: CellContext<any, unknown>) => {
    const value = row.getValue(columnName) as string | null | undefined

    if (!value) return null

    return (
      <div className="whitespace-normal line-clamp-2 break-words">{value}</div>
    )
  }
}
