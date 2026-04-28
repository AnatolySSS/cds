import type { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '../../ui/components/column-header/column-header'
import { createDateCell } from '../cells/date-cell'
import type { BaseConfig } from '@/06-shared/data-table'
import { mapDateFilter } from '../filters/date/map-date-filter'

export function createDateColumn<TData extends object, TValue = any>(
  config: BaseConfig<TData, TValue>,
): ColumnDef<TData> {
  const base = {
    header: ({ column, table }: any) => (
      <ColumnHeader
        column={column}
        table={table}
        title={config.title}
        filterType="date"
      />
    ),

    filterFn: () => true, // фильтрация будет происходить в mapFilter

    meta: {
      mapFilter: mapDateFilter,
    },

    size: config.size,
  }

  if (config.accessorFn) {
    return {
      ...base,
      id: config.id,
      accessorFn: config.accessorFn,
      cell: createDateCell(config.id),
    }
  }

  return {
    ...base,
    accessorKey: config.accessorKey,
    id: config.id,
    cell: createDateCell(config.accessorKey),
  }
}
