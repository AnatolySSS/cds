import type { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '../../ui/components/column-header/column-header'
import { createBooleanCell } from '../cells/boolean-cell'
import type { BaseConfig } from '@/06-shared/data-table'

export function createBooleanColumn<TData extends object, TValue = any>(
  config: BaseConfig<TData, TValue>,
): ColumnDef<TData> {
  const base = {
    header: ({ column, table }: any) => (
      <ColumnHeader
        column={column}
        table={table}
        title={config.title}
        filterType="boolean"
      />
    ),

    filterFn: () => true, // фильтрация будет происходить в mapFilter

    size: config.size,
  }

  // ✅ теперь TS понимает, что это точно функция
  if (config.accessorFn) {
    return {
      ...base,
      id: config.id,
      accessorFn: config.accessorFn,
      cell: createBooleanCell(config.id),
    }
  }

  return {
    ...base,
    accessorKey: config.accessorKey,
    id: config.id,
    cell: createBooleanCell(config.accessorKey),
  }
}
