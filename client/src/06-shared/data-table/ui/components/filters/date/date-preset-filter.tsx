import {
  EmptyPreset,
  TemporalDatePreset,
  type DatePreset,
} from '@/06-shared/data-table/types/filters/match-modes'

interface Props {
  value?: DatePreset
  onChange: (preset: DatePreset) => void
}

export function DatePresetFilter({ value, onChange }: Props) {
  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value as DatePreset)}
    >
      <option value="">— Без пресета —</option>

      <option value={EmptyPreset.EMPTY}>Пусто</option>
      <option value={EmptyPreset.NOT_EMPTY}>Не пусто</option>

      <option value={TemporalDatePreset.TODAY}>Сегодня</option>
      <option value={TemporalDatePreset.YESTERDAY}>Вчера</option>
      <option value={TemporalDatePreset.TOMORROW}>Завтра</option>

      <option value={TemporalDatePreset.THIS_WEEK}>На этой неделе</option>
      <option value={TemporalDatePreset.LAST_WEEK}>На прошлой неделе</option>
      <option value={TemporalDatePreset.NEXT_WEEK}>На следующей неделе</option>

      <option value={TemporalDatePreset.THIS_MONTH}>В этом месяце</option>
      <option value={TemporalDatePreset.LAST_MONTH}>В прошлом месяце</option>
      <option value={TemporalDatePreset.NEXT_MONTH}>В следующем месяце</option>

      <option value={TemporalDatePreset.THIS_YEAR}>В этом году</option>
      <option value={TemporalDatePreset.LAST_YEAR}>В прошлом году</option>
      <option value={TemporalDatePreset.NEXT_YEAR}>В следующем году</option>
    </select>
  )
}
