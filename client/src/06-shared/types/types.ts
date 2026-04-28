import type { SelectOption } from '@/06-shared/data-table'

export interface SelectProps {
  value?: string
  title?: string
  onChange: (value?: string) => void
  options?: SelectOption[]
  variant?: 'default' | 'filter' | 'editable'
  disabled?: boolean
}

import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    mapFilter?: (id: string, value: any) => any
  }
}
