import type { CellContext } from '@tanstack/react-table'
import { CircleCheckBig, CircleX } from 'lucide-react'

export function createBooleanCell(columnName: string) {
  return ({ row }: CellContext<any, unknown>) => {
    const value = row.getValue(columnName) as boolean | null | undefined

    if (value == null) return null

    return (
      <div className="whitespace-normal line-clamp-2 break-words">
        {value ? (
          <CircleCheckBig color="var(--color-primary)" />
        ) : (
          <CircleX color="var(--color-destructive)" />
        )}
      </div>
    )
  }
}
