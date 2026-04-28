import type { SelectOption } from '@/06-shared/data-table'

export interface EmployeeTableMeta {
  departments: SelectOption[]
  titles: SelectOption[]
  divisions: (SelectOption & { number: string })[]
}
