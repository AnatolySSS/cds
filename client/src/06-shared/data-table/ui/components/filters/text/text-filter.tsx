import { useEffect, useState } from 'react'
import type { TextFilterValue } from '@/06-shared/data-table'
import { Input } from '@/06-shared/ui/shadcn/input'
import {
  EmptyPreset,
  TextMatchMode,
} from '@/06-shared/data-table/types/filters/match-modes'
import { ActionButtons } from '../components/action-buttons'
import { SwitchModeButtons } from '../components/switch-mode-buttons'

interface Props {
  value?: TextFilterValue
  onChange: (value?: TextFilterValue) => void
}

export function TextFilter({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState<TextFilterValue>(
    value ?? {
      mode: 'operator',
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

  const mode = localValue.mode

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* MODE SWITCH */}
      <SwitchModeButtons<TextFilterValue>
        mode={mode}
        setLocalValue={setLocalValue}
        operatorValue={{
          mode: 'operator',
          matchMode: 'contains',
          value: '',
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
              const next: TextFilterValue = {
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
      )}

      {/* PRESET MODE */}
      {mode === 'preset' && (
        <select
          className="border rounded px-2 py-1 text-sm"
          value={localValue.preset}
          onChange={(e) => {
            const val = e.target.value as EmptyPreset

            const next: TextFilterValue = {
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
      <ActionButtons
        localValue={localValue}
        onApply={(val) => onChange(val)}
        onReset={() => {
          const reset: TextFilterValue = {
            mode: 'operator',
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
