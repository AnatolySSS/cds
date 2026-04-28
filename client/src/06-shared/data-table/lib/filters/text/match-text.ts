import type { TextFilterValue } from '@/06-shared/data-table'
import { TextMatchMode } from '@/06-shared/data-table/types/filters/match-modes'

export function matchText(
  rowValue: string,
  search: string,
  operator: TextFilterValue['matchMode'],
) {
  switch (operator) {
    case TextMatchMode.EQUALS:
      return rowValue === search

    case TextMatchMode.NOT_EQUALS:
      return rowValue !== search

    case TextMatchMode.STARTS_WITH:
      return rowValue.startsWith(search)

    case TextMatchMode.ENDS_WITH:
      return rowValue.endsWith(search)

    case TextMatchMode.CONTAINS:
      return rowValue.includes(search)

    case TextMatchMode.NOT_CONTAINS:
      return !rowValue.includes(search)

    default:
      return true
  }
}
