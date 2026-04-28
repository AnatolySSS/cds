import type { Employee } from '@/05-entities'
import type { EmployeeTableMeta } from '@/03-widgets/employees-table'
import type { Division } from '@/05-entities/employee/model/types'

import { EmployeeCellViewer } from './employee-cell-viewer'

import { createCustomColumn, tableBuilder } from '@/06-shared/data-table'

export const columns = tableBuilder<Employee, EmployeeTableMeta>()
  .custom(
    createCustomColumn<Employee, EmployeeTableMeta>({
      id: 'full_name',
      accessorKey: 'full_name',
      title: 'ФИО',
      component: ({ item, meta }) => (
        <EmployeeCellViewer item={item} meta={meta} />
      ),
      size: 250,
    }),
  )
  .select({
    id: 'department',
    accessorKey: 'department',
    title: 'Тип',
    getOptions: (meta) => meta.departments,
    size: 150,
  })
  .select({
    id: 'title',
    accessorKey: 'title',
    title: 'Должность',
    getOptions: (meta) => meta.titles,
    size: 150,
  })
  .select<Division>({
    id: 'division',
    accessorKey: 'division',
    title: 'Филиал',
    getOptions: (meta) => meta.divisions,
    mapValue: (v) => v.name,
    size: 100,
  })
  .text({
    id: 'login',
    accessorKey: 'login',
    title: 'Логин',
    size: 100,
  })
  .text({
    id: 'email',
    accessorKey: 'email',
    title: 'Электронная почта',
    size: 100,
  })
  .text({
    id: 'phone',
    accessorKey: 'phone',
    title: 'Телефон',
    size: 100,
  })
  .text({
    id: 'dn',
    accessorKey: 'dn',
    title: 'Служебная информация',
    size: 100,
  })
  .text({
    id: 'cn',
    accessorKey: 'cn',
    title: 'Идентификатор',
    size: 100,
  })
  .boolean({
    id: 'is_present',
    accessorKey: 'is_present',
    title: 'Работает',
    size: 100,
  })
  .build()
