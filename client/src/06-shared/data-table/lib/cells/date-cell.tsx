import type { CellContext } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function createDateCell(
  columnName: string,
  formatString = 'd MMMM yyyy',
) {
  return ({ row }: CellContext<any, unknown>) => {
    const value = row.getValue(columnName) as string | null | undefined

    if (!value) return null

    const date = new Date(value)

    return (
      <div className="whitespace-nowrap">
        {format(date, formatString, { locale: ru })}
      </div>
    )
  }
}
