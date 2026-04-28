import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/06-shared/ui/shadcn/combobox'
import type { SelectFilterValue, SelectOption } from '@/06-shared/data-table'
import { ActionButtons } from '../components/action-buttons'
import { useEffect, useState } from 'react'
import { SwitchModeButtons } from '../components/switch-mode-buttons'
import { EmptyPreset } from '@/06-shared/data-table/types/filters/match-modes'

interface SelectFilterProps {
  value?: SelectFilterValue
  onChange: (value?: SelectFilterValue) => void
  options?: SelectOption[]
  placeholder?: string
  drawerRef?: React.RefObject<HTMLDivElement | null>
}

export function SelectFilter({
  value,
  onChange,
  options = [],
  placeholder,
  drawerRef,
}: SelectFilterProps) {
  const anchorRef = useComboboxAnchor()
  const [open, setOpen] = useState(false)
  const [localValue, setLocalValue] = useState<SelectFilterValue>(
    value ?? {
      mode: 'operator',
      value: [],
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
  const selected = localValue.mode === 'operator' ? localValue.value : []

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* MODE SWITCH */}
      <SwitchModeButtons<SelectFilterValue>
        mode={mode}
        setLocalValue={setLocalValue}
        operatorValue={{
          mode: 'operator',
          value: [],
        }}
        presetValue={{
          mode: 'preset',
          preset: 'empty',
        }}
      />

      {/* OPERATOR MODE */}
      {mode === 'operator' && (
        <Combobox
          items={options}
          multiple
          open={open}
          onOpenChange={setOpen}
          value={selected}
          onValueChange={(items) => {
            const next: SelectFilterValue = {
              mode: 'operator',
              value: items ?? [],
            }

            setLocalValue(next)
            setOpen(false)
          }}
          itemToStringValue={(item: SelectOption) => item.label ?? ''}
        >
          <ComboboxChips ref={anchorRef} className="w-full">
            <ComboboxValue>
              {selected.map((item) => (
                <ComboboxChip key={item.value as string}>
                  {item.label}
                </ComboboxChip>
              ))}
            </ComboboxValue>
            <ComboboxChipsInput placeholder={placeholder} />
          </ComboboxChips>

          <ComboboxContent
            drawerRef={drawerRef}
            anchor={anchorRef}
            className="w-full"
          >
            <ComboboxEmpty>Совпадений не найдено</ComboboxEmpty>

            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}

      {/* PRESET MODE */}
      {mode === 'preset' && (
        <select
          className="border rounded px-2 py-1 text-sm"
          value={localValue.preset}
          onChange={(e) => {
            const val = e.target.value as EmptyPreset

            const next: SelectFilterValue = {
              mode: 'preset',
              preset: val,
            }

            setLocalValue(next)
          }}
        >
          <option value={EmptyPreset.EMPTY}>Пусто</option>
          <option value={EmptyPreset.NOT_EMPTY}>Не пусто</option>
        </select>
      )}

      {/* ACTIONS */}
      <ActionButtons
        localValue={localValue}
        onApply={(val) => {
          onChange(val)
        }}
        onReset={() => {
          const reset: SelectFilterValue = {
            mode: 'operator',
            value: [],
          }

          setLocalValue(reset)
          onChange(undefined)
        }}
      />
    </div>
  )
}
