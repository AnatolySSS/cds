import type {
  SortingState,
  ColumnFiltersState,
  TableMeta,
  ColumnDef,
} from '@tanstack/react-table'
import type { Filter } from './filters/match-modes'

export interface DataTableServerSideOptions {
  totalCount?: number
  pageIndex?: number
  pageSize?: number
  sorting?: SortingState
  globalFilter?: string
  columnFilters?: ColumnFiltersState
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSortingChange?: (sorting: SortingState) => void
  onGlobalFilterChange?: (filter: string) => void
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void
}

export interface DataTableProps<TData, MData extends TableMeta<TData>> {
  data: TData[]
  columns: ColumnDef<TData>[]
  meta: MData
  isLoading: boolean
  serverSideOptions?: DataTableServerSideOptions
  openViewer?: () => void
  addButtonText?: string
}

export type DataTableQueryParams = {
  page: number
  pageSize: number

  sorting?: {
    id: string
    desc: boolean
  }[]

  globalFilter?: string

  filters?: Filter[]
}
