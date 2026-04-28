import type { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '../../ui/components/column-header/column-header'
import type { BaseConfig } from '@/06-shared/data-table'
import { createNumberCell } from '../cells/number-cell'
import { mapNumberFilter } from '../filters/number/map-number-filter'

export function createNumberColumn<TData extends object, TValue = any>(
  config: BaseConfig<TData, TValue>,
): ColumnDef<TData> {
  const base = {
    header: ({ column, table }: any) => (
      <ColumnHeader
        column={column}
        table={table}
        title={config.title}
        filterType="number"
      />
    ),

    filterFn: () => true, // фильтрация будет происходить в mapFilter

    meta: {
      mapFilter: mapNumberFilter,
    },

    size: config.size,
  }

  // ✅ теперь TS понимает, что это точно функция
  if (config.accessorFn) {
    return {
      ...base,
      id: config.id,
      accessorFn: config.accessorFn,
      cell: createNumberCell(config.id),
    }
  }

  return {
    ...base,
    accessorKey: config.accessorKey,
    id: config.id,
    cell: createNumberCell(config.accessorKey),
  }
}
