import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useAppDispatch, useAppSelector } from '@/01-app'
import { useCreateUserMutation } from '@/05-entities'
import type { UserTableMeta } from '@/03-widgets/users-table'
import { useIsMobile } from '@/06-shared'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  EditableSelectField,
  Button,
} from '@/06-shared'

import { closeViewer, selectUserViewerIsOpen } from '@/03-widgets/users-table'
import type { UserForm } from '../model/types'
import type { UserRole } from '@/05-entities/user/model/types'
import { EditableCombobox } from '@/06-shared/ui/editable-combobox'
import type { SelectOption } from '@/06-shared/data-table'
import { getErrorMessage } from '@/06-shared/lib/api/getErrorMessage'

export function UserCreateDrawer({ meta }: { meta: UserTableMeta }) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const isOpen = useAppSelector(selectUserViewerIsOpen)

  const emptyItem = {
    id: '',
    role: 'USER' as UserRole,
  }

  const [form, setForm] = useState<UserForm>(emptyItem)
  const [employee, setEmployee] = useState<SelectOption | null>({
    value: '',
    label: '',
  })

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      id: employee?.value ?? '',
    }))
  }, [employee])

  const handleChange = <K extends keyof UserForm>(
    field: K,
    value: UserForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    try {
      await createUser(form).unwrap()

      toast.success('Сохранено', {
        description: 'Пользователь успешно добавлен',
      })

      dispatch(closeViewer())
    } catch (e) {
      console.error(e)

      toast.error('Ошибка', {
        description: getErrorMessage(e),
      })
    }
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={() => dispatch(closeViewer())}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent className="max-w-[500px]" ref={drawerRef}>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Добавление пользователя</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-2 text-sm">
          <form className="flex flex-col gap-4">
            {/* Основная информация */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold">Основное</h3>

              <EditableCombobox
                value={employee}
                onChange={(v: any) => setEmployee(v)}
                placeholder={'Сотрудник'}
                options={meta.employees}
                drawerRef={drawerRef}
              />

              <EditableSelectField
                value={form.role}
                onChange={(v) => handleChange('role', v as UserRole)}
                title={'Роль'}
                options={meta.roles}
              />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave} disabled={isCreating}>
            {isCreating ? 'Сохранение...' : 'Создать'}
          </Button>
          <Button onClick={() => dispatch(closeViewer())} variant="outline">
            Закрыть
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
