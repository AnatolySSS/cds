import {
  ConfirmDeleteDialog,
  DataTable,
  useGetAllDictionariesQuery,
} from '@/06-shared'
import { columns } from './columns'
import {
  useDeleteFinancialOrganizationMutation,
  type FinancialOrganization,
} from '@/05-entities'
import {
  openViewer,
  type FinancialOrganizationTableMeta,
} from '@/03-widgets/financial-organizations-table'
import { toast } from 'sonner'
import { useState } from 'react'
import { useAppDispatch } from '@/01-app'
import { FinancialOrganizationCreateDrawer } from './financial-organization-create-drawer'
import type { DataTableServerSideOptions } from '@/06-shared/data-table'

interface FinancialOrganizationsTableProps {
  data: FinancialOrganization[]
  isLoading: boolean
  serverSideOptions: DataTableServerSideOptions
}

export function FinancialOrganizationsTable({
  data,
  isLoading,
  serverSideOptions,
}: FinancialOrganizationsTableProps) {
  const dispatch = useAppDispatch()

  const [deleteFinancialOrganization] = useDeleteFinancialOrganizationMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletedFinancialOrganization, setDeletedFinancialOrganization] =
    useState<FinancialOrganization | null>(null)

  const { data: { financialActivityTypes = [] } = {} } =
    useGetAllDictionariesQuery()

  const handleDelete = async (financialOrganization: FinancialOrganization) => {
    try {
      await deleteFinancialOrganization(financialOrganization.id).unwrap()
      toast.success('Финансовая организация успешно удалена')
    } catch (err) {
      console.error(err)
      toast.error('Не удалось удалить финансовую организацию')
    }
  }

  return (
    <div className="h-full">
      <DataTable<FinancialOrganization, FinancialOrganizationTableMeta>
        data={data}
        columns={columns}
        meta={{
          financialActivityTypes,
          setIsDeleteDialogOpen,
          setDeletedFinancialOrganization,
        }}
        serverSideOptions={serverSideOptions}
        openViewer={() => dispatch(openViewer())}
        addButtonText="финансовую организацию"
        isLoading={isLoading}
      />
      <ConfirmDeleteDialog<FinancialOrganization>
        deletedItem={deletedFinancialOrganization}
        onDelete={handleDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        getItemName={(financialOrganization) => financialOrganization.fullName}
      />
      <FinancialOrganizationCreateDrawer
        meta={{
          financialActivityTypes,
        }}
      />
    </div>
  )
}
