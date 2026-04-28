import type { ColumnDef } from '@tanstack/react-table'
import { createTextColumn } from '../columns/create-text-column'
import { createDateColumn } from '../columns/create-date-column'
import { createSelectColumn } from '../columns/create-select-column'
import { createActionsColumn } from '../columns/create-actions-column'
import { createLinkColumn } from '../columns/create-link-column'
import { createBooleanColumn } from '../columns/create-boolean-column'
import type { SelectConfig, BaseConfig } from '@/06-shared/data-table'
import { createNumberColumn } from '../columns/create-number-column'

export function tableBuilder<TData extends object, TMeta = unknown>() {
  const columns: ColumnDef<TData>[] = []

  return {
    text<TValue = unknown>(config: BaseConfig<TData, TValue>) {
      columns.push(createTextColumn<TData, TValue>(config))

      return this
    },

    link<TValue = unknown>(config: BaseConfig<TData, TValue>) {
      columns.push(createLinkColumn<TData, TValue>(config))

      return this
    },

    number<TValue = unknown>(config: BaseConfig<TData, TValue>) {
      columns.push(createNumberColumn<TData, TValue>(config))

      return this
    },

    date<TValue = unknown>(config: BaseConfig<TData, TValue>) {
      columns.push(createDateColumn<TData, TValue>(config))
      return this
    },

    select<TValue = unknown>(config: SelectConfig<TData, TMeta, TValue>) {
      columns.push(createSelectColumn<TData, TMeta, TValue>(config))

      return this
    },

    boolean<TValue = unknown>(config: BaseConfig<TData, TValue>) {
      columns.push(createBooleanColumn<TData, TValue>(config))
      return this
    },

    custom(column: ColumnDef<TData>) {
      columns.push(column)
      return this
    },

    actions(config: Parameters<typeof createActionsColumn<TData, TMeta>>[0]) {
      columns.push(createActionsColumn<TData, TMeta>(config))
      return this
    },

    build() {
      return columns
    },
  }
}
