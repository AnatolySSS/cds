import { ru } from 'date-fns/locale'

import { Button } from '@/06-shared'
import { Calendar } from '@/06-shared'
import { Popover, PopoverContent, PopoverTrigger } from '@/06-shared'
import type { DateFilterValue } from '@/06-shared/data-table'
import { DateAdapter } from '@/06-shared/lib/date/date-adapter'

interface Props {
  value?: Extract<DateFilterValue, { mode: 'operator'; type: 'range' }>
  onChange: (value?: DateFilterValue) => void
}

export function DateRangeFilter({ value, onChange }: Props) {
  const from = DateAdapter.fromApi(value?.from)
  const to = DateAdapter.fromApi(value?.to)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full" variant="outline">
          {from && to
            ? `${DateAdapter.shortFormat(from)} — ${DateAdapter.shortFormat(to)}`
            : from
              ? `с ${DateAdapter.shortFormat(from)}`
              : to
                ? `до ${DateAdapter.shortFormat(to)}`
                : 'Выберите диапазон'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          numberOfMonths={2}
          captionLayout="dropdown"
          selected={{ from, to }}
          locale={ru}
          onSelect={(range) => {
            if (!range) return onChange(undefined)

            onChange({
              mode: 'operator',
              type: 'range',
              from: DateAdapter.toApiDateOnly(range.from)!,
              to: DateAdapter.toApiDateOnly(range.to)!,
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
