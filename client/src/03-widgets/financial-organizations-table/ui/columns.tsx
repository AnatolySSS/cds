import type { FinancialOrganization } from '@/05-entities'
import type { FinancialOrganizationTableMeta } from '../model/types'
import type { ActivityType } from '@/05-entities/financial-organization/model/types'

import { FinancialOrganizationCellViewer } from './financial-organization-cell-viewer'

import { createCustomColumn } from '@/06-shared/data-table/lib/columns/create-custom-column'
import { tableBuilder } from '@/06-shared/data-table'

export const columns = tableBuilder<
  FinancialOrganization,
  FinancialOrganizationTableMeta
>()
  .custom(
    createCustomColumn<FinancialOrganization, FinancialOrganizationTableMeta>({
      id: 'shortName',
      accessorKey: 'shortName',
      title: 'Краткое наименование',
      component: ({ item, meta }) => (
        <FinancialOrganizationCellViewer item={item} meta={meta} />
      ),
    }),
  )
  .text({
    id: 'fullName',
    accessorKey: 'fullName',
    title: 'Полное наименование',
    size: 130,
  })
  .text({
    id: 'inn',
    accessorKey: 'inn',
    title: 'ИНН',
    size: 160,
  })
  .text({
    id: 'ogrn',
    accessorKey: 'ogrn',
    title: 'ОГРН',
    size: 160,
  })
  .text({
    id: 'actualAddress',
    accessorKey: 'actualAddress',
    title: 'Фактический адрес',
    size: 160,
  })
  .text({
    id: 'legalAddress',
    accessorKey: 'legalAddress',
    title: 'Юридический адрес',
    size: 160,
  })
  .text({
    id: 'phone',
    accessorKey: 'phone',
    title: 'Телефон',
    size: 160,
  })
  .text({
    id: 'email',
    accessorKey: 'email',
    title: 'Электронная почта',
    size: 160,
  })

  .select<ActivityType>({
    id: 'activityType',
    accessorKey: 'activityType',
    title: 'Тип финансовой деятельности',
    getOptions: (meta) => meta.financialActivityTypes,
    mapValue: (v) => v.name,
    size: 150,
  })

  .date({
    id: 'registrationDate',
    accessorKey: 'registrationDate',
    title: 'Дата регистрации',
    size: 160,
  })
  .date({
    id: 'terminationDate',
    accessorKey: 'terminationDate',
    title: 'Дата прекращения деятельности',
    size: 160,
  })

  .text({
    id: 'terminationDecisionNumber',
    accessorKey: 'terminationDecisionNumber',
    title: 'Номер приказа ЦБ о прекращении деятельности',
    size: 160,
  })

  .text({
    id: 'externalId',
    accessorKey: 'externalId',
    title: 'Номер ФО в СОО',
    size: 160,
  })

  .actions({
    label: 'Действия',
    actions: [
      {
        label: 'Удалить',
        variant: 'destructive',
        onClick: (row, meta) => {
          meta?.setDeletedFinancialOrganization?.(row)
          meta?.setIsDeleteDialogOpen?.(true)
        },
      },
    ],
  })

  .build()
