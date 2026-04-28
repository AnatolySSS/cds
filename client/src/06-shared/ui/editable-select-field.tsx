import { useState } from 'react'
import { SelectField } from '@/06-shared'
import { Pencil } from 'lucide-react'
import type { SelectProps } from '../types/types'

export function EditableSelectField({
  value,
  title,
  onChange,
  options = [],
}: SelectProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative">
      <SelectField
        value={value || undefined}
        title={title}
        options={options}
        variant="editable"
        disabled={!isEditing}
        onChange={onChange}
      />

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
