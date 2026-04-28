import type { BooleanFilterValue } from '@/06-shared/data-table'

interface Props {
  value?: BooleanFilterValue
  onChange: (value?: BooleanFilterValue) => void
}

export function BooleanFilter({ value, onChange }: Props) {
  const current = value ?? 'all'

  return (
    <div className="flex flex-col gap-2 w-full">
      <select
        className="border rounded px-2 py-1 text-sm"
        value={String(current)}
        onChange={(e) => {
          const v = e.target.value

          if (v === 'all') {
            onChange(undefined)
          } else {
            onChange(v === 'true')
          }
        }}
      >
        <option value="all">Все</option>
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
    </div>
  )
}
