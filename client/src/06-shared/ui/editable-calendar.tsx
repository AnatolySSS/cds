import { useState } from 'react'
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/06-shared'
import { Pencil } from 'lucide-react'
import { handleCopyToClipboard } from '../lib/handle-copy-to-clipboard'
import { format } from 'date-fns/format'
import { ru } from 'date-fns/locale'
import { parseDateFromString } from '../lib/date/parse-date-from-string'
import { DateAdapter } from '../lib/date/date-adapter'

export interface CalendarProps {
  id: string
  initialValue?: Date
  onChange: (value?: Date) => void
}

export function EditableCalendar({
  id,
  initialValue,
  onChange,
}: CalendarProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative">
      {/* Контейнер с hover-анимацией */}

      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => {
              if (!isEditing)
                handleCopyToClipboard(DateAdapter.format(initialValue)!)
            }}
            onPaste={(e) => {
              const text = e.clipboardData.getData('text')

              const parsed = parseDateFromString(text)

              if (parsed) {
                onChange(parsed)
                e.preventDefault()
              }
            }}
            className={`transition-shadow duration-200 rounded-lg ${!isEditing && initialValue ? 'hover:shadow-md' : ''}`}
          >
            <Popover>
              <PopoverTrigger asChild disabled={!isEditing}>
                <Button className="w-full" variant="outline">
                  {initialValue
                    ? format(initialValue, 'd MMMM yyyy', { locale: ru })
                    : 'Выберите дату'}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  id={id}
                  mode="single"
                  selected={initialValue}
                  locale={ru}
                  captionLayout="dropdown"
                  onSelect={(d) => {
                    onChange(d ?? undefined)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </TooltipTrigger>
        {!isEditing && initialValue && (
          <TooltipContent>
            <p>Клик чтобы скопировать</p>
          </TooltipContent>
        )}
      </Tooltip>

      {/* clear */}
      {initialValue && isEditing && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onChange(undefined)
          }}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200"
        >
          ✕
        </button>
      )}

      {/* edit */}
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
