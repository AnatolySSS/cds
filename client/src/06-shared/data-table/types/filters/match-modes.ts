export const EmptyPreset = {
  EMPTY: 'empty',
  NOT_EMPTY: 'notEmpty',
} as const

export type EmptyPreset = (typeof EmptyPreset)[keyof typeof EmptyPreset]

export const TextMatchMode = {
  STARTS_WITH: 'startsWith',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  ENDS_WITH: 'endsWith',
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  ...EmptyPreset,
} as const

export type TextMatchMode = (typeof TextMatchMode)[keyof typeof TextMatchMode]

export const NumberMatchMode = {
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  LT: 'lt',
  LTE: 'lte',
  GT: 'gt',
  GTE: 'gte',
  BETWEEN: 'between',
  ...EmptyPreset,
} as const

export type NumberMatchMode =
  (typeof NumberMatchMode)[keyof typeof NumberMatchMode]

export const TemporalDatePreset = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  TOMORROW: 'tomorrow',

  THIS_WEEK: 'this_week',
  LAST_WEEK: 'last_week',
  NEXT_WEEK: 'next_week',

  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  NEXT_MONTH: 'next_month',

  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  NEXT_YEAR: 'next_year',
} as const

export type TemporalDatePreset =
  (typeof TemporalDatePreset)[keyof typeof TemporalDatePreset]

export type DatePreset = TemporalDatePreset | EmptyPreset

export const DateMatchMode = {
  DATE_IS: 'dateIs',
  DATE_IS_NOT: 'dateIsNot',
  DATE_BEFORE: 'dateBefore',
  DATE_AFTER: 'dateAfter',
} as const

export type DateMatchMode = (typeof DateMatchMode)[keyof typeof DateMatchMode]

export type BaseFilter = {
  field: string
}

export type TextFilter = BaseFilter & {
  type: 'text'
  matchMode: TextMatchMode
  value?: string
}

export type NumberFilter = BaseFilter & {
  type: 'number'
  matchMode: NumberMatchMode
  value?: number
}

export type DateSingleFilter = BaseFilter & {
  type: 'date'
  mode: 'single'
  matchMode: DateMatchMode
  value: string
}

export type DateRangeFilter = BaseFilter & {
  type: 'date'
  mode: 'range'
  matchMode: 'between'
  from: string
  to: string
}

export type DatePresetFilter = BaseFilter & {
  type: 'date'
  mode: 'preset'
  preset: DatePreset
}

export type DateFilter = DateSingleFilter | DateRangeFilter | DatePresetFilter

export type BooleanFilter = BaseFilter & {
  type: 'boolean'
  value: boolean
}

export type SelectFilter = BaseFilter & {
  type: 'select'
  matchMode: 'in' | EmptyPreset
  value: string[]
}

export type Filter =
  | TextFilter
  | NumberFilter
  | DateFilter
  | BooleanFilter
  | SelectFilter
