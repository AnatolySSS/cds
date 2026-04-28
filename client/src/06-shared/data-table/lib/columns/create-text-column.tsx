import type { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '../../ui/components/column-header/column-header'
import { createTextCell } from '../cells/text-cell'
import type { BaseConfig } from '@/06-shared/data-table'
import { mapTextFilter } from '../filters/text/map-text-filter'

export function createTextColumn<TData extends object, TValue = any>(
  config: BaseConfig<TData, TValue>,
): ColumnDef<TData> {
  const base = {
    header: ({ column, table }: any) => (
      <ColumnHeader
        column={column}
        table={table}
        title={config.title}
        filterType="text"
      />
    ),

    filterFn: () => true, // фильтрация будет происходить в mapFilter

    meta: {
      mapFilter: mapTextFilter,
    },

    size: config.size,
  }

  // ✅ теперь TS понимает, что это точно функция
  if (config.accessorFn) {
    return {
      ...base,
      id: config.id,
      accessorFn: config.accessorFn,
      cell: createTextCell(config.id),
    }
  }

  return {
    ...base,
    accessorKey: config.accessorKey,
    id: config.id,
    cell: createTextCell(config.accessorKey),
  }
}
