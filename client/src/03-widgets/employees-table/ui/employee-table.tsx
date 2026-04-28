import { type Employee } from '@/05-entities'
import { DataTable, useGetAllDictionariesQuery } from '@/06-shared'
import type {
  DataTableServerSideOptions,
  SelectOption,
} from '@/06-shared/data-table'
import { columns } from './columns'
import type { EmployeeTableMeta } from '@/03-widgets/employees-table'

interface EmployeesTableProps {
  data: Employee[]
  isLoading: boolean
  serverSideOptions: DataTableServerSideOptions
}

export function EmployeesTable({
  data,
  isLoading,
  serverSideOptions,
}: EmployeesTableProps) {
  const { data: { divisions = [] } = {} } = useGetAllDictionariesQuery()

  const departments: SelectOption[] = Array.from(
    new Set(data.map((item) => item.department)),
  )
    .sort()
    .map(
      (r): SelectOption => ({
        label: r,
        value: r,
      }),
    )
  const titles: SelectOption[] = Array.from(
    new Set(data.map((item) => item.title)),
  )
    .sort()
    .map((r) => ({
      label: r,
      value: r,
    }))

  return (
    <div className="h-full">
      <DataTable<Employee, EmployeeTableMeta>
        data={data}
        columns={columns}
        meta={{
          departments,
          titles,
          divisions,
        }}
        serverSideOptions={serverSideOptions}
        isLoading={isLoading}
      />
    </div>
  )
}
