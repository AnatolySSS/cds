import { FinancialOrganizationsTable } from '@/03-widgets/financial-organizations-table'
import { columns } from '@/03-widgets/financial-organizations-table/ui/columns'
import { useGetFinancialOrganizationsQuery } from '@/05-entities'
import { useServerTable } from '@/06-shared/data-table/hooks/use-server-table'

export const FinancialOrganizationsPage = () => {
  const table = useServerTable(useGetFinancialOrganizationsQuery, columns)

  return (
    <div
      className="p-6"
      style={{ height: 'calc(100% - var(--header-height))' }}
    >
      <FinancialOrganizationsTable
        data={table.items}
        isLoading={table.isLoading}
        serverSideOptions={table.options}
      />
    </div>
  )
}
