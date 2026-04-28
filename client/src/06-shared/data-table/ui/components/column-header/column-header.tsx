import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/06-shared'
import { Funnel } from 'lucide-react'

import { ColumnSort } from './column-sort'
import { TextFilter } from '../filters/text/text-filter'

import type { Column, Table } from '@tanstack/react-table'
import { Button } from '@/06-shared'
import { SelectFilter } from '../filters/select/select-filter'
import { useRef } from 'react'
import { DatePickerFilter } from '../filters/date/date-picker-filter'
import type { TextFilterValue, DateFilterValue } from '@/06-shared/data-table'
import type { SelectOption, FilterType } from '@/06-shared/data-table'
import { BooleanFilter } from '../filters/boolean/boolean-filter'
import { CustomFilter } from '../filters/custom/custom-filter'
import type {
  CustomFilterValue,
  NumberFilterValue,
  SelectFilterValue,
} from '@/06-shared/data-table/types/filters/filter-values'
import { NumberFilter } from '../filters/number/number-filter'

interface Props<TData> {
  column: Column<TData, unknown>
  table: Table<TData>
  title: string
  filterType?: FilterType
  options?: SelectOption[]
}

export function ColumnHeader<TData>({
  column,
  table,
  title,
  filterType,
  options = [],
}: Props<TData>) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const filterValue = column.getFilterValue() as string | string[] | undefined

  return (
    <div className="flex items-center gap-2">
      <ColumnSort column={column} table={table} title={title} />

      {filterType && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={
                filterValue &&
                (Array.isArray(filterValue) ? filterValue.length > 0 : true)
                  ? 'dark:bg-muted/50 bg-muted'
                  : ''
              }
            >
              <Funnel />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-2 w-56" ref={drawerRef}>
            {/* FILTER TYPE CUSTOM */}

            {filterType === 'custom' && (
              <CustomFilter
                value={filterValue as CustomFilterValue | undefined}
                onChange={(v) => column.setFilterValue(v)}
              />
            )}

            {/* FILTER TYPE TEXT */}

            {filterType === 'text' && (
              <TextFilter
                value={filterValue as TextFilterValue | undefined}
                onChange={(v) => column.setFilterValue(v)}
              />
            )}

            {/* FILTER TYPE NUMBER */}

            {filterType === 'number' && (
              <NumberFilter
                value={filterValue as NumberFilterValue | undefined}
                onChange={(v) => {
                  console.log(v)

                  column.setFilterValue(v)
                }}
              />
            )}

            {/* FILTER TYPE SELECT */}

            {filterType === 'select' && (
              <SelectFilter
                value={filterValue as SelectFilterValue | undefined}
                onChange={(val) => {
                  column.setFilterValue(val)
                }}
                options={options}
                placeholder="Выберите..."
                drawerRef={drawerRef}
              />
            )}

            {/* FILTER TYPE DATE */}

            {filterType === 'date' && (
              <DatePickerFilter
                value={filterValue as DateFilterValue | undefined}
                onChange={(v) => column.setFilterValue(v)}
              />
            )}

            {/* FILTER TYPE BOOLEAN */}

            {filterType === 'boolean' && (
              <BooleanFilter
                value={filterValue as boolean | undefined}
                onChange={(v) => column.setFilterValue(v)}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
