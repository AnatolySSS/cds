import { EmployeesTable } from '@/03-widgets/employees-table'
import { columns } from '@/03-widgets/employees-table/ui/columns'
import { useGetEmployeesQuery } from '@/05-entities'
import { useServerTable } from '@/06-shared/data-table/hooks/use-server-table'

export const EmployeesPage = () => {
  const table = useServerTable(useGetEmployeesQuery, columns)

  return (
    <div
      className="p-6"
      style={{ height: 'calc(100% - var(--header-height))' }}
    >
      <EmployeesTable
        data={table.items}
        isLoading={table.isLoading}
        serverSideOptions={table.options}
      />
    </div>
  )
}
