import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useAppDispatch, useAppSelector } from '@/01-app'
import { useCreateCourtMutation } from '@/05-entities'
import type { CourtTableMeta } from '@/03-widgets/courts-table'
import { useIsMobile } from '@/06-shared'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  EditableInput,
  EditableTextArea,
  Button,
  Separator,
  Label,
} from '@/06-shared'

import { closeViewer, selectCourtViewerIsOpen } from '@/03-widgets/courts-table'
import type { CourtForm } from '../model/types'
import { EditableCombobox } from '@/06-shared/ui/editable-combobox'
import type { SelectOption } from '@/06-shared/data-table'

export function CourtCreateDrawer({ meta }: { meta: CourtTableMeta }) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()

  const [createCourt, { isLoading: isCreating }] = useCreateCourtMutation()
  const isOpen = useAppSelector(selectCourtViewerIsOpen)

  const emptyItem = {
    name: '',
    address: '',
    phone: '',
    email: '',
    site: '',
    regionCode: '',
    cassRegionCode: '',
    typeCode: '',
    serverNumbers: 1,
  }

  const [form, setForm] = useState<CourtForm>(emptyItem)

  const [region, setRegion] = useState<SelectOption | null>({
    value: '',
    label: '',
  })
  const [cassRegion, setCassRegion] = useState<SelectOption | null>({
    value: '',
    label: '',
  })
  const [type, setType] = useState<SelectOption | null>({
    value: '',
    label: '',
  })

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      regionCode: region?.value ?? '',
      cassRegionCode: cassRegion?.value ?? '',
      typeCode: type?.value ?? '',
    }))
  }, [region, cassRegion, type])

  const handleChange = <K extends keyof CourtForm>(
    field: K,
    value: CourtForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    try {
      await createCourt(form).unwrap()

      toast.success('Сохранено', {
        description: 'Суд успешно добавлен',
      })

      dispatch(closeViewer())
    } catch (e) {
      console.error(e)

      toast.error('Ошибка', {
        description: 'Не удалось добавить новый суд',
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
          <DrawerTitle>Добавление суда</DrawerTitle>
          <DrawerDescription>Добавление суда</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-2 text-sm">
          <form className="flex flex-col gap-4">
            {/* Основная информация */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold">Основное</h3>

              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Наименование</Label>
                <EditableTextArea
                  id="name"
                  initialValue={form.name}
                  onChange={(v) => handleChange('name', v ?? '')}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="address">Адрес</Label>
                <EditableTextArea
                  id="address"
                  initialValue={form.address!}
                  onChange={(v) => handleChange('address', v ?? '')}
                />
              </div>
            </div>

            <Separator />

            {/* Контакты */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Контакты</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email">Email</Label>
                  <EditableInput
                    id="email"
                    initialValue={form.email!}
                    onChange={(v) => handleChange('email', v ?? '')}
                  />
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="site">Сайт</Label>
                  <EditableInput
                    id="site"
                    initialValue={form.site!}
                    onChange={(v) => handleChange('site', v ?? '')}
                  />
                </div>

                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="phone">Телефон(ы)</Label>
                  <EditableInput
                    id="phone"
                    initialValue={form.phone!}
                    onChange={(v) => handleChange('phone', v ?? '')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Классификация */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Классификация</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="region">Регион</Label>
                  <EditableCombobox
                    value={region}
                    onChange={(v: any) => setRegion(v)}
                    placeholder={'Регион'}
                    options={meta.regions}
                    drawerRef={drawerRef}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="cassRegion">Кассационный регион</Label>
                  <EditableCombobox
                    value={cassRegion}
                    onChange={(v: any) => setCassRegion(v)}
                    placeholder={'Кассационный регион'}
                    options={meta.cassationDistricts}
                    drawerRef={drawerRef}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="type">Тип суда</Label>
                  <EditableCombobox
                    value={type}
                    onChange={(v: any) => setType(v)}
                    placeholder={'Тип суда'}
                    options={meta.courtTypes}
                    drawerRef={drawerRef}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="servers">Кол-во серверов</Label>
                  <EditableInput
                    id="serverNumbers"
                    type="number"
                    initialValue={Number(form.serverNumbers)}
                    onChange={(v: any) =>
                      handleChange('serverNumbers', Number(v))
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave} disabled={isCreating}>
            {isCreating ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button onClick={() => dispatch(closeViewer())} variant="outline">
            Закрыть
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
