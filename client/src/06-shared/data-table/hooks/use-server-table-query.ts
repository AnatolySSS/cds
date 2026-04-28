import { useMemo, useState } from 'react'
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'
import { useDebounce } from '@/06-shared'

export function useServerTableQuery(columns: ColumnDef<any>[]) {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const debouncedGlobalFilter = useDebounce(globalFilter)

  const queryParams = useMemo(() => {
    const filters = columnFilters
      .map((f) => mapColumnFilterToDsl(f, columns))
      .filter(Boolean)

    return {
      page: pageIndex + 1,
      pageSize,
      sorting,
      globalFilter: debouncedGlobalFilter,
      filters,
    }
  }, [pageIndex, pageSize, sorting, debouncedGlobalFilter, columnFilters])

  // 🔥 единый reset логики
  const resetPage = () => setPageIndex(0)

  return {
    queryParams,

    state: {
      pageIndex,
      pageSize,
      sorting,
      globalFilter,
      columnFilters,
    },

    actions: {
      setPageIndex,
      setPageSize: (v: number) => {
        setPageSize(v)
        resetPage()
      },

      setSorting: (v: SortingState) => {
        setSorting(v)
        resetPage()
      },

      setGlobalFilter: (v: string) => {
        setGlobalFilter(v)
        resetPage()
      },

      setColumnFilters: (v: ColumnFiltersState) => {
        setColumnFilters(v)
        resetPage()
      },
    },
  }
}

function mapColumnFilterToDsl(filter: any, columns: ColumnDef<any>[]) {
  const column = columns.find((c) => c.id === filter.id)

  const mapper = column?.meta?.mapFilter

  if (!mapper) return null

  return mapper(filter.id, filter.value)
}
