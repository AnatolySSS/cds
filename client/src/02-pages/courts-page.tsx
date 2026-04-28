import { CourtsTable } from '@/03-widgets/courts-table'
import { columns } from '@/03-widgets/courts-table/ui/columns'
import { useGetCourtsQuery } from '@/05-entities'
import { useServerTable } from '@/06-shared/data-table/hooks/use-server-table'

export const CourtsPage = () => {
  const table = useServerTable(useGetCourtsQuery, columns)

  return (
    <div
      className="p-6"
      style={{ height: 'calc(100% - var(--header-height))' }}
    >
      <CourtsTable
        data={table.items}
        isLoading={table.isLoading}
        serverSideOptions={table.options}
      />
    </div>
  )
}
