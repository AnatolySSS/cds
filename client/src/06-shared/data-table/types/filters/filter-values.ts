import type { SelectOption } from '../..'
import type {
  DateMatchMode,
  DatePreset,
  EmptyPreset,
  NumberMatchMode,
  TextMatchMode,
} from './match-modes'

export type CustomFilterValue = {
  matchMode: TextMatchMode
  value?: string
}

export type TextFilterValue =
  | {
      mode: 'operator'
      matchMode: TextMatchMode
      value?: string
    }
  | {
      mode: 'preset'
      preset: EmptyPreset
    }

export type NumberFilterValue =
  | {
      mode: 'operator'
      matchMode: NumberMatchMode
      value?: number
    }
  | {
      mode: 'preset'
      preset: EmptyPreset
    }

export type SelectFilterValue =
  | {
      mode: 'operator'
      value: SelectOption[]
    }
  | {
      mode: 'preset'
      preset: EmptyPreset
    }

export type BooleanFilterValue = boolean | 'all'

export type DateFilterValue =
  | {
      mode: 'operator'
      type: 'single'
      matchMode: DateMatchMode
      date?: string
    }
  | {
      mode: 'operator'
      type: 'range'
      from?: string
      to?: string
    }
  | {
      mode: 'preset'
      preset: DatePreset
    }
