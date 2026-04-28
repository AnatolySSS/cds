import type { User } from '@/05-entities'
import type { UserTableMeta } from '../model/types'

import { UserCellViewer } from './user-cell-viewer'

import { createCustomColumn, tableBuilder } from '@/06-shared/data-table'
import type { Division } from '@/05-entities/employee/model/types'

export const columns = tableBuilder<User, UserTableMeta>()
  .custom(
    createCustomColumn<User, UserTableMeta>({
      id: 'employee_full_name', // базовое поле
      accessorFn: (row) => row.employee.full_name,
      title: 'ФИО',
      component: ({ item, meta }) => <UserCellViewer item={item} meta={meta} />,
    }),
  )
  .select({
    id: 'role',
    accessorKey: 'role',
    title: 'Роль',
    getOptions: (meta) => meta.roles,
    size: 150,
  })
  .select<Division>({
    id: 'division',
    accessorFn: (row) => row.employee.division,
    title: 'Филиал',
    getOptions: (meta) => meta.divisions,
    mapValue: (v) => v.name,
    size: 150,
  })
  .actions({
    label: 'Действия',
    actions: [
      {
        label: 'Удалить',
        variant: 'destructive',
        onClick: (row, meta) => {
          meta?.setDeletedUser?.(row)
          meta?.setIsDeleteDialogOpen?.(true)
        },
      },
    ],
  })
  .build()
