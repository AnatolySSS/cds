import { useState, useRef, useEffect } from 'react'

import {
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type TableMeta,
} from '@tanstack/react-table'

import {
  Spinner,
  Button,
  Input,
  DataTablePagination,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/06-shared'
import { CirclePlus, Columns3, FunnelX } from 'lucide-react'
import type { DataTableProps } from '@/06-shared/data-table'

export function DataTable<TData, MData extends TableMeta<TData>>({
  data,
  columns,
  meta,
  isLoading,
  serverSideOptions = {},
  openViewer,
  addButtonText,
}: DataTableProps<TData, MData>) {
  const totalCount = serverSideOptions.totalCount ?? data.length
  const pageIndex = serverSideOptions.pageIndex ?? 0
  const pageSize = serverSideOptions.pageSize ?? 10
  const sorting = serverSideOptions.sorting ?? []
  const globalFilter = serverSideOptions.globalFilter ?? ''
  const columnFilters = serverSideOptions.columnFilters ?? []
  const onPageChange = serverSideOptions.onPageChange ?? (() => {})
  const onPageSizeChange = serverSideOptions.onPageSizeChange ?? (() => {})
  const onSortingChange = serverSideOptions.onSortingChange ?? (() => {})
  const onGlobalFilterChange =
    serverSideOptions.onGlobalFilterChange ?? (() => {})
  const onColumnFiltersChange =
    serverSideOptions.onColumnFiltersChange ?? (() => {})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [isScrolled, setIsScrolled] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  const table = useReactTable<TData>({
    data,
    columns,
    meta,

    getCoreRowModel: getCoreRowModel(),

    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function'
          ? updater(table.getState().sorting)
          : updater
      onSortingChange(newSorting)
    },
    onGlobalFilterChange: onGlobalFilterChange,
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === 'function'
          ? updater(table.getState().columnFilters)
          : updater

      onColumnFiltersChange(newFilters)
    },
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },

    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    pageCount: pageSize ? Math.ceil(totalCount / pageSize) : 0,
  })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => setIsScrolled(el.scrollTop > 8)
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Поиск по всем колонкам..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2 ml-auto">
          {/* Кнопка добавления нового суда */}
          {addButtonText && (
            <Button variant="outline" onClick={openViewer}>
              Добавить {addButtonText} <CirclePlus />
            </Button>
          )}
          {/* Кнопка сброса фильтров */}
          <Button
            variant="outline"
            onClick={() => {
              onGlobalFilterChange('')
              onColumnFiltersChange([])
            }}
          >
            Сброс фильтров <FunnelX />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Столбцы <Columns3 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 h-full flex items-center justify-center overflow-auto rounded-md border"
      >
        {isLoading ? (
          <Spinner className="size-8" />
        ) : (
          <Table className="min-w-full h-full table-auto">
            <TableHeader
              className={`sticky top-0 z-10 bg-[var(--background)] transition-shadow  ${
                isScrolled ? 'shadow-theme' : ''
              }`}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            minWidth: cell.column.getSize(),
                            width: 'auto',
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <DataTablePagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        actualCount={data.length}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
