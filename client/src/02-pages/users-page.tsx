import { UsersTable } from '@/03-widgets/users-table'
import { useGetUsersQuery } from '@/05-entities'

export const UsersPage = () => {
  const { data: users = [], isLoading } = useGetUsersQuery()

  return (
    <div
      className="p-6"
      style={{ height: 'calc(100% - var(--header-height))' }}
    >
      <UsersTable data={users} isLoading={isLoading} />
    </div>
  )
}
