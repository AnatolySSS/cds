import { useState } from 'react'
import {
  useDeleteUserMutation,
  useGetEmployeesQuery,
  type User,
} from '@/05-entities'
import { ConfirmDeleteDialog, DataTable } from '@/06-shared'
import type { SelectOption } from '@/06-shared/data-table'
import { columns } from './columns'
import type { UserTableMeta } from '../model/types'
import { useAppDispatch } from '@/01-app'
import { openViewer } from '@/03-widgets/users-table'
import { UserCreateDrawer } from './user-create-drawer'
import { toast } from 'sonner'

export function UsersTable({
  data,
  isLoading,
}: {
  data: User[]
  isLoading: boolean
}) {
  const dispatch = useAppDispatch()

  const [deleteUser] = useDeleteUserMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletedUser, setDeletedUser] = useState<User | null>(null)

  const { data: rawEmployees = [] } = useGetEmployeesQuery()

  const employees: SelectOption[] = [...rawEmployees]
    .sort((a, b) => a.full_name.localeCompare(b.full_name, 'ru'))
    .map((r) => ({
      label: r.full_name,
      value: r.id,
    }))

  const divisions: SelectOption[] = Array.from(
    new Map(
      data.map((item) => [item.employee.division.id, item.employee.division]),
    ).values(),
  )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((r) => ({
      label: r.name,
      value: r.code,
    }))

  const roles: SelectOption[] = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'MANAGER', value: 'MANAGER' },
    { label: 'USER', value: 'USER' },
  ]

  const handleDelete = async (user: User) => {
    try {
      await deleteUser(user.id).unwrap()
      toast.success('Пользователь успешно удален')
    } catch (err) {
      console.error(err)
      toast.error('Не удалось удалить пользователя')
    }
  }

  return (
    <div className="h-full">
      <DataTable<User, UserTableMeta>
        data={data}
        columns={columns}
        meta={{
          roles,
          divisions,
          employees,
          setIsDeleteDialogOpen,
          setDeletedUser,
        }}
        openViewer={() => dispatch(openViewer())}
        isLoading={isLoading}
        addButtonText="пользователя"
      />

      <ConfirmDeleteDialog<User>
        deletedItem={deletedUser}
        onDelete={handleDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        getItemName={(user) => user.employee.full_name}
      />

      <UserCreateDrawer
        meta={{
          roles,
          divisions,
          employees,
        }}
      />
    </div>
  )
}
