import type { Court } from '@/05-entities'
import type { CourtTableMeta } from '../model/types'
import type {
  CassationDistrict,
  CourtType,
  Region,
} from '@/05-entities/court/model/types'

import { CourtCellViewer } from './court-cell-viewer'

import { createCustomColumn, tableBuilder } from '@/06-shared/data-table'

export const columns = tableBuilder<Court, CourtTableMeta>()
  .custom(
    createCustomColumn<Court, CourtTableMeta>({
      id: 'name',
      accessorKey: 'name',
      title: 'Наименование',
      component: ({ item, meta }) => (
        <CourtCellViewer item={item} meta={meta} />
      ),
    }),
  )
  .select<CourtType>({
    id: 'type',
    accessorKey: 'type',
    title: 'Тип',
    getOptions: (meta) => meta.courtTypes,
    mapValue: (v) => v.name,
    size: 150,
  })
  .select<Region>({
    id: 'region',
    accessorKey: 'region',
    title: 'Регион',
    getOptions: (meta) => meta.regions,
    mapValue: (v) => v.name,
    size: 150,
  })
  .select<CassationDistrict>({
    id: 'cassRegion',
    accessorKey: 'cassRegion',
    title: 'КО',
    getOptions: (meta) => meta.cassationDistricts,
    mapValue: (v) => v.name,
    size: 150,
  })
  .link({
    id: 'site',
    accessorKey: 'site',
    title: 'Сайт',
    size: 160,
  })
  .number({
    id: 'serverNumbers',
    accessorKey: 'serverNumbers',
    title: 'Количество серверов',
    size: 150,
  })
  .actions({
    label: 'Действия',
    actions: [
      {
        label: 'Удалить',
        variant: 'destructive',
        onClick: (row, meta) => {
          meta?.setDeletedCourt?.(row)
          meta?.setIsDeleteDialogOpen?.(true)
        },
      },
    ],
  })
  .build()
