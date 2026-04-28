import type { User, UserRole } from '@/05-entities/user/model/types'
import type { SelectOption } from '@/06-shared/data-table'

export interface UserTableMeta {
  roles: SelectOption[]
  divisions: SelectOption[]
  employees: SelectOption[]
  setIsDeleteDialogOpen?: (value: boolean) => void
  setDeletedUser?: (court: User | null) => void
}

export type UserForm = {
  id: string
  role: UserRole
}
