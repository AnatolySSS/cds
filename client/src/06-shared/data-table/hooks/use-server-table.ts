import type { ColumnDef } from '@tanstack/react-table'
import { useServerTableQuery } from './use-server-table-query'

export function useServerTable<TQueryFn extends (p: any) => any>(
  useQuery: TQueryFn,
  columns: ColumnDef<any>[],
) {
  const table = useServerTableQuery(columns)
  const query = useQuery(table.queryParams)

  const options = {
    totalCount: query.data?.total ?? 0,

    pageIndex: table.state.pageIndex,
    pageSize: table.state.pageSize,
    sorting: table.state.sorting,
    globalFilter: table.state.globalFilter,
    columnFilters: table.state.columnFilters,

    onPageChange: table.actions.setPageIndex,
    onPageSizeChange: table.actions.setPageSize,
    onSortingChange: table.actions.setSorting,
    onGlobalFilterChange: table.actions.setGlobalFilter,
    onColumnFiltersChange: table.actions.setColumnFilters,
  }

  return {
    items: query.data?.items ?? [],
    options,
    isLoading: query.isLoading,
  }
}
