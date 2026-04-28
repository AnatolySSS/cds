import type { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '../../ui/components/column-header/column-header'
import { createObjectCell } from '../cells/object-cell'
import type { SelectConfig } from '@/06-shared/data-table'
import { mapSelectFilter } from '../filters/select/map-select-filter'

export function createSelectColumn<TData, TMeta, TValue = any>(
  config: SelectConfig<TData, TMeta, TValue>,
): ColumnDef<TData> {
  const base = {
    header: ({ column, table }: any) => {
      const meta = table.options.meta

      return (
        <ColumnHeader
          column={column}
          table={table}
          title={config.title}
          filterType="select"
          options={config.getOptions(meta)}
        />
      )
    },

    filterFn: () => true, // фильтрация будет происходить в mapFilter

    meta: {
      mapFilter: mapSelectFilter,
    },

    cell: createObjectCell<TValue>(config.mapValue ?? ((v) => String(v))),

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
