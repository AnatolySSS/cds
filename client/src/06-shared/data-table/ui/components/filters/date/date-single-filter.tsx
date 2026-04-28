import { ru } from 'date-fns/locale'

import { Button } from '@/06-shared'
import { Calendar } from '@/06-shared'
import { Popover, PopoverContent, PopoverTrigger } from '@/06-shared'
import type { DateFilterValue } from '@/06-shared/data-table'
import { DateAdapter } from '@/06-shared/lib/date/date-adapter'
import { DateMatchMode } from '@/06-shared/data-table/types/filters/match-modes'

interface Props {
  value?: Extract<DateFilterValue, { mode: 'operator'; type: 'single' }>
  onChange: (value?: DateFilterValue) => void
}

export function DateSingleFilter({ value, onChange }: Props) {
  const matchMode = value?.matchMode ?? DateMatchMode.DATE_IS
  const date = DateAdapter.fromApi(value?.date)

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 1. OPERATOR */}
      <select
        className="border rounded px-2 py-1 text-sm"
        value={matchMode}
        onChange={(e) => {
          const mm = e.target.value as typeof matchMode

          onChange({
            mode: 'operator',
            type: 'single',
            matchMode: mm,
            date: value?.date,
          })
        }}
      >
        <option value={DateMatchMode.DATE_IS}>Равно</option>
        <option value={DateMatchMode.DATE_IS_NOT}>Не равно</option>
        <option value={DateMatchMode.DATE_BEFORE}>До</option>
        <option value={DateMatchMode.DATE_AFTER}>После</option>
      </select>

      {/* 3. CALENDAR */}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full" variant="outline">
            {date ? DateAdapter.format(date) : 'Выберите дату'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            locale={ru}
            captionLayout="dropdown"
            onSelect={(d) => {
              if (!d) return onChange(undefined)

              onChange({
                mode: 'operator',
                type: 'single',
                matchMode,
                date: DateAdapter.toApiDateOnly(d)!,
              })
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
