import { ConfirmDeleteDialog, DataTable } from '@/06-shared'
import { columns } from './columns'
import { useDeleteCourtMutation, type Court } from '@/05-entities'
import { openViewer, type CourtTableMeta } from '@/03-widgets/courts-table'
import { toast } from 'sonner'
import { useState } from 'react'
import { useAppDispatch } from '@/01-app'
import { CourtCreateDrawer } from './court-create-drawer'
import { useGetAllDictionariesQuery } from '@/06-shared'
import type { DataTableServerSideOptions } from '@/06-shared/data-table'

interface CourtsTableProps {
  data: Court[]
  isLoading: boolean
  serverSideOptions: DataTableServerSideOptions
}

export function CourtsTable({
  data,
  isLoading,
  serverSideOptions,
}: CourtsTableProps) {
  const dispatch = useAppDispatch()

  const [deleteCourt] = useDeleteCourtMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletedCourt, setDeletedCourt] = useState<Court | null>(null)

  const {
    data: { regions = [], courtTypes = [], cassationDistricts = [] } = {},
  } = useGetAllDictionariesQuery()

  const handleDelete = async (court: Court) => {
    try {
      await deleteCourt(court.id).unwrap()
      toast.success('Суд успешно удален')
    } catch (err) {
      console.error(err)
      toast.error('Не удалось удалить суд')
    }
  }

  return (
    <div className="h-full">
      <DataTable<Court, CourtTableMeta>
        data={data}
        columns={columns}
        meta={{
          courtTypes,
          regions,
          cassationDistricts,
          setIsDeleteDialogOpen,
          setDeletedCourt,
        }}
        serverSideOptions={serverSideOptions}
        openViewer={() => dispatch(openViewer())}
        addButtonText="суд"
        isLoading={isLoading}
      />
      <ConfirmDeleteDialog<Court>
        deletedItem={deletedCourt}
        onDelete={handleDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        getItemName={(court) => court.name}
      />
      <CourtCreateDrawer
        meta={{
          courtTypes,
          regions,
          cassationDistricts,
        }}
      />
    </div>
  )
}
