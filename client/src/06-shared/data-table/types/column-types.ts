export interface SelectOption<T = string> {
  label: string
  value: T
}

export type FilterType =
  | 'text'
  | 'select'
  | 'date'
  | 'boolean'
  | 'number'
  | 'custom'

export type AccessorConfig<TData> =
  | {
      accessorKey: keyof TData & string
      accessorFn?: never
    }
  | {
      accessorFn: (row: TData) => unknown
      accessorKey?: never
    }

export type BaseConfig<TData, TValue> = AccessorConfig<TData> & {
  id: string
  title: string
  size?: number
  mapValue?: (value: TValue) => React.ReactNode
}

export type SelectConfig<TData, TMeta, TValue> = AccessorConfig<TData> &
  BaseConfig<TData, TValue> & {
    getOptions: (meta: TMeta) => SelectOption[]
  }

export type CustomConfig<TData, TMeta, TValue> = AccessorConfig<TData> &
  BaseConfig<TData, TValue> & {
    component: (props: { item: TData; meta: TMeta }) => React.ReactNode
  }
