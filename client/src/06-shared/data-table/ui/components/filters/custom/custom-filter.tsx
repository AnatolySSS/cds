import { useEffect, useState } from 'react'
import type { TextFilterValue } from '@/06-shared/data-table'
import { Input } from '@/06-shared/ui/shadcn/input'
import { TextMatchMode } from '@/06-shared/data-table/types/filters/match-modes'
import { ActionButtons } from '../components/action-buttons'
import type { CustomFilterValue } from '@/06-shared/data-table/types/filters/filter-values'

interface Props {
  value?: CustomFilterValue
  onChange: (value?: CustomFilterValue) => void
}

export function CustomFilter({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState<CustomFilterValue>(
    value ?? {
      matchMode: 'contains',
      value: '',
    },
  )
  // -------------------------
  // sync снаружи (если фильтр сбросили)
  // -------------------------
  useEffect(() => {
    if (value) {
      setLocalValue(value)
    }
  }, [value])

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* OPERATOR MODE */}

      <>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={localValue.matchMode}
          onChange={(e) => {
            const mm = e.target.value as TextMatchMode

            const next: TextFilterValue = {
              mode: 'operator',
              matchMode: mm,
              value: localValue.value,
            }

            setLocalValue(next)
            // onChange(next) // ⚡ без debounce — сразу
          }}
        >
          <option value={TextMatchMode.EQUALS}>Равно</option>
          <option value={TextMatchMode.NOT_EQUALS}>Не равно</option>
          <option value={TextMatchMode.STARTS_WITH}>Начинается с</option>
          <option value={TextMatchMode.ENDS_WITH}>Заканчивается на</option>
          <option value={TextMatchMode.CONTAINS}>Содержит</option>
          <option value={TextMatchMode.NOT_CONTAINS}>Не содержит</option>
        </select>

        <Input
          placeholder="Введите текст..."
          value={localValue.value ?? ''}
          onChange={(e) => {
            const next: CustomFilterValue = {
              ...localValue,
              value: e.target.value,
            }

            setLocalValue(next)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()

              onChange(localValue)
            }
          }}
        />
      </>

      {/* ACTIONS */}
      <ActionButtons
        localValue={localValue}
        onApply={(val) => onChange(val)}
        onReset={() => {
          const reset: CustomFilterValue = {
            matchMode: 'contains',
            value: '',
          }

          setLocalValue(reset)
          onChange(undefined)
        }}
      />
    </div>
  )
}
