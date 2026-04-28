import { useEffect, useState } from 'react'
import type { DateFilterValue } from '@/06-shared/data-table'
import { DateSingleFilter } from './date-single-filter'
import { DateRangeFilter } from './date-range-filter'
import {
  DateMatchMode,
  EmptyPreset,
} from '@/06-shared/data-table/types/filters/match-modes'
import { SwitchModeButtons } from '../components/switch-mode-buttons'
import { ActionButtons } from '../components/action-buttons'
import { DatePresetFilter } from './date-preset-filter'

interface Props {
  value?: DateFilterValue
  onChange: (value?: DateFilterValue) => void
}

export function DatePickerFilter({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState<DateFilterValue>(
    value ?? {
      mode: 'operator',
      type: 'single',
      matchMode: DateMatchMode.DATE_IS,
    },
  )

  // -------------------------
  // sync снаружи (если фильтр сбросили)
  // -------------------------
  useEffect(() => {
    if (!value) return

    setLocalValue(value)
  }, [value])

  const mode = localValue.mode
  const type = localValue.mode === 'operator' ? localValue.type : undefined

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* MODE SWITCH */}
      <SwitchModeButtons<DateFilterValue>
        mode={mode}
        setLocalValue={setLocalValue}
        operatorValue={{
          mode: 'operator',
          type: 'single',
          matchMode: DateMatchMode.DATE_IS,
        }}
        presetValue={{
          mode: 'preset',
          preset: EmptyPreset.EMPTY,
        }}
      />

      {/* OPERATOR MODE */}
      {mode === 'operator' && (
        <>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={type}
            onChange={(e) => {
              const newType = e.target.value as 'single' | 'range'

              if (newType === 'single') {
                setLocalValue({
                  mode: 'operator',
                  type: 'single',
                  matchMode: DateMatchMode.DATE_IS,
                })
              } else {
                setLocalValue({
                  mode: 'operator',
                  type: 'range',
                })
              }
              // onChange(undefined)
            }}
          >
            <option value="single">Одна дата</option>
            <option value="range">Диапазон</option>
          </select>

          {/* RENDER */}
          {type === 'single' ? (
            <DateSingleFilter
              value={
                localValue.mode === 'operator' && localValue.type === 'single'
                  ? localValue
                  : undefined
              }
              onChange={(val) => {
                if (!val || val.mode !== 'operator' || val.type !== 'single')
                  return

                setLocalValue(val)
              }}
            />
          ) : (
            <DateRangeFilter
              value={
                localValue.mode === 'operator' && localValue.type === 'range'
                  ? localValue
                  : undefined
              }
              onChange={(val) => {
                if (!val || val.mode !== 'operator' || val.type !== 'range')
                  return

                setLocalValue(val)
              }}
            />
          )}
        </>
      )}

      {/* PRESET MODE */}
      {mode === 'preset' && (
        <DatePresetFilter
          value={localValue.preset}
          onChange={(preset) => {
            setLocalValue({
              mode: 'preset',
              preset,
            })
          }}
        />
      )}

      {/* ACTIONS */}
      <ActionButtons
        localValue={localValue}
        onApply={(val) => {
          onChange(val)
        }}
        onReset={() => {
          const reset: DateFilterValue = {
            mode: 'operator',
            type: 'single',
            matchMode: DateMatchMode.DATE_IS,
          }

          setLocalValue(reset)
          onChange(undefined)
        }}
      />
    </div>
  )
}
