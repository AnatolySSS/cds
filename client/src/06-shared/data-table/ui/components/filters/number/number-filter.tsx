import { useEffect, useState } from 'react'
import { Input } from '@/06-shared/ui/shadcn/input'
import {
  EmptyPreset,
  NumberMatchMode,
} from '@/06-shared/data-table/types/filters/match-modes'
import { ActionButtons } from '../components/action-buttons'
import { SwitchModeButtons } from '../components/switch-mode-buttons'
import type { NumberFilterValue } from '@/06-shared/data-table/types/filters/filter-values'

interface Props {
  value?: NumberFilterValue
  onChange: (value?: NumberFilterValue) => void
}

export function NumberFilter({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState<NumberFilterValue>(
    value ?? {
      mode: 'operator',
      matchMode: NumberMatchMode.EQUALS,
      value: undefined,
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

  const mode = localValue.mode

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* MODE SWITCH */}
      <SwitchModeButtons<NumberFilterValue>
        mode={mode}
        setLocalValue={setLocalValue}
        operatorValue={{
          mode: 'operator',
          matchMode: NumberMatchMode.EQUALS,
          value: undefined,
        }}
        presetValue={{
          mode: 'preset',
          preset: 'empty',
        }}
      />

      {/* OPERATOR MODE */}
      {mode === 'operator' && (
        <>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={localValue.matchMode}
            onChange={(e) => {
              const mm = e.target.value as NumberMatchMode

              const next: NumberFilterValue = {
                mode: 'operator',
                matchMode: mm,
                value: localValue.value,
              }

              setLocalValue(next)
            }}
          >
            <option value={NumberMatchMode.EQUALS}>Равно</option>
            <option value={NumberMatchMode.NOT_EQUALS}>Не равно</option>
            <option value={NumberMatchMode.GT}>Больше</option>
            <option value={NumberMatchMode.LT}>Меньше</option>
            <option value={NumberMatchMode.GTE}>Больше или равно</option>
            <option value={NumberMatchMode.LTE}>Меньше или равно</option>
          </select>

          <Input
            placeholder="Введите число..."
            type="number"
            value={localValue.value ?? ''}
            onChange={(e) => {
              const raw = e.target.value

              const next: NumberFilterValue = {
                ...localValue,
                value: raw === '' ? undefined : Number(raw),
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
      )}

      {/* PRESET MODE */}
      {mode === 'preset' && (
        <select
          className="border rounded px-2 py-1 text-sm"
          value={localValue.preset}
          onChange={(e) => {
            const val = e.target.value as EmptyPreset

            const next: NumberFilterValue = {
              mode: 'preset',
              preset: val,
            }

            setLocalValue(next)
            // onChange(next) // сразу
          }}
        >
          <option value={EmptyPreset.EMPTY}>Пусто</option>
          <option value={EmptyPreset.NOT_EMPTY}>Не пусто</option>
        </select>
      )}

      {/* ACTIONS */}
      <ActionButtons<NumberFilterValue>
        localValue={localValue}
        onApply={(val) => onChange(val)}
        onReset={() => {
          const reset: NumberFilterValue = {
            mode: 'operator',
            matchMode: NumberMatchMode.EQUALS,
            value: undefined,
          }

          setLocalValue(reset)
          onChange(undefined)
        }}
      />
    </div>
  )
}
