import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/06-shared/ui/shadcn/combobox'
import type { SelectOption } from '@/06-shared/data-table'
import { useState } from 'react'
import { Pencil } from 'lucide-react'

interface ComboboxProps {
  value?: SelectOption | null
  onChange: (value?: SelectOption | null) => void
  options?: SelectOption[]
  placeholder?: string
  drawerRef?: React.RefObject<HTMLDivElement | null>
}

export function EditableCombobox({
  value,
  onChange,
  options = [],
  placeholder,
  drawerRef,
}: ComboboxProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative">
      <Combobox
        items={options}
        value={value ?? null}
        onValueChange={(item) => onChange(item)}
        itemToStringValue={(item: SelectOption) => item.label}
      >
        <ComboboxInput
          placeholder={placeholder}
          showClear={isEditing}
          editable={true}
          disabled={!isEditing}
        />
        <ComboboxContent drawerRef={drawerRef}>
          <ComboboxEmpty>Сотрудников не найдено</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item?.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <button
        type="button"
        onClick={() => setIsEditing((prev) => !prev)}
        className="absolute right-2 bottom-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200"
      >
        <Pencil className="size-4" />
      </button>
    </div>
  )
}
