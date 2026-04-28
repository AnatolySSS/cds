import type { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/06-shared'
import type { CustomConfig } from '@/06-shared/data-table'
import { mapTextFilter } from '../filters/text/map-text-filter'

export function createCustomColumn<TData, TMeta = unknown, TValue = any>(
  config: CustomConfig<TData, TMeta, TValue>,
): ColumnDef<TData> {
  const base = {
    header: ({ column, table }: any) => (
      <ColumnHeader
        column={column}
        table={table}
        title={config.title}
        filterType="custom"
      />
    ),

    filterFn: () => true, // фильтрация будет происходить в mapFilter

    meta: {
      mapFilter: mapTextFilter,
    },

    cell: ({ row, table }: any) => {
      const meta = table.options.meta as TMeta

      return config.component({
        item: row.original,
        meta,
      })
    },

    size: config.size,
  }

  // ✅ теперь TS понимает, что это точно функция
  if (config.accessorFn) {
    return {
      ...base,
      id: config.id,
      accessorFn: config.accessorFn,
    }
  }

  return {
    ...base,
    accessorKey: config.accessorKey,
    id: config.id,
  }
}
