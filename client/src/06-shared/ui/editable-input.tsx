import { useState } from 'react'
import { Input, Tooltip, TooltipContent, TooltipTrigger } from '@/06-shared'
import { Pencil } from 'lucide-react'
import { handleCopyToClipboard } from '../lib/handle-copy-to-clipboard'

interface InputProps {
  id: string
  initialValue: string | number
  type?: string
  onChange: (value?: string) => void
}

export function EditableInput({
  id,
  type,
  initialValue,
  onChange,
}: InputProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative">
      {/* Контейнер с hover-анимацией */}

      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (!isEditing && typeof initialValue === 'string')
                handleCopyToClipboard(initialValue)
            }}
            className={`transition-shadow duration-200 rounded-lg ${!isEditing && typeof initialValue === 'string' ? 'hover:shadow-md' : ''}`}
          >
            <Input
              id={id}
              type={type}
              value={initialValue}
              disabled={!isEditing}
              onChange={(e) => onChange(e.target.value)}
              className="pr-10 disabled:pointer-events-none"
            />
          </div>
        </TooltipTrigger>
        {!isEditing && typeof initialValue === 'string' && (
          <TooltipContent>
            <p>Клик чтобы скопировать</p>
          </TooltipContent>
        )}
      </Tooltip>

      <button
        type="button"
        onClick={() => setIsEditing((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200"
      >
        <Pencil className="size-4" />
      </button>
    </div>
  )
}
