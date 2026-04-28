import { Button } from '@/06-shared/ui/shadcn/button'
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowUpDown,
} from 'lucide-react'
import type { Column, Table } from '@tanstack/react-table'

interface Props<TData> {
  column: Column<TData, unknown>
  table: Table<TData>
  title: string
}

export function ColumnSort<TData>({ column, table, title }: Props<TData>) {
  const sorting = column.getIsSorted()

  const cycleSort = (current: 'asc' | 'desc' | false) => {
    switch (current) {
      case 'asc':
        return [{ id: column.id, desc: true }]
      case 'desc':
        return []
      default:
        return [{ id: column.id, desc: false }]
    }
  }

  return (
    <Button
      variant="ghost"
      className="p-2"
      onClick={() => table.setSorting(cycleSort(sorting as any))}
    >
      {title}
      <span className="ml-2 h-4 w-4">
        {sorting === 'asc' ? (
          <ArrowDownWideNarrow className="h-4 w-4" />
        ) : sorting === 'desc' ? (
          <ArrowUpNarrowWide className="h-4 w-4" />
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-50" />
        )}
      </span>
    </Button>
  )
}
