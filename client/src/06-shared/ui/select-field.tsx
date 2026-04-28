import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/06-shared/ui/shadcn/select'
import type { SelectProps } from '../types/types'

export function SelectField({
  value,
  title,
  onChange,
  options = [],
  variant = 'default',
  disabled = false,
}: SelectProps) {
  return (
    <Select
      value={value ?? ''}
      onValueChange={(v) => onChange(v === '__all__' ? undefined : v)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full" variant={variant}>
        <SelectValue placeholder="Выберите..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {variant === 'filter' && <SelectItem value="__all__">Все</SelectItem>}
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value ?? ''}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
