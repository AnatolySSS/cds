import { useState } from 'react'
import { Textarea, Tooltip, TooltipContent, TooltipTrigger } from '@/06-shared'
import { Pencil } from 'lucide-react'
import { handleCopyToClipboard } from '../lib/handle-copy-to-clipboard'

interface TextAreaProps {
  id: string
  initialValue: string
  onChange: (value?: string) => void
}

export function EditableTextArea({
  id,
  initialValue,
  onChange,
}: TextAreaProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative">
      {/* Контейнер с hover-анимацией */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (!isEditing) handleCopyToClipboard(initialValue)
            }}
            className={`transition-shadow duration-200 rounded-lg ${!isEditing ? 'hover:shadow-md' : ''}`}
          >
            <Textarea
              id={id}
              value={initialValue}
              disabled={!isEditing}
              onChange={(e) => onChange(e.target.value)}
              className="pr-10 disabled:pointer-events-none" // место под иконку справа
            />
          </div>
        </TooltipTrigger>
        {!isEditing && (
          <TooltipContent>
            <p>Клик чтобы скопировать</p>
          </TooltipContent>
        )}
      </Tooltip>

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
