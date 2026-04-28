import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useAppDispatch, useAppSelector } from '@/01-app'
import { useCreateFinancialOrganizationMutation } from '@/05-entities'
import type { FinancialOrganizationTableMeta } from '@/03-widgets/financial-organizations-table'
import { EditableCalendar, useIsMobile } from '@/06-shared'
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

import {
  closeViewer,
  selectFinancialOrganizationViewerIsOpen,
} from '@/03-widgets/financial-organizations-table'
import type { FinancialOrganizationForm } from '../model/types'
import { EditableCombobox } from '@/06-shared/ui/editable-combobox'
import type { SelectOption } from '@/06-shared/data-table'
import { DateAdapter } from '@/06-shared/lib/date/date-adapter'

export function FinancialOrganizationCreateDrawer({
  meta,
}: {
  meta: FinancialOrganizationTableMeta
}) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()

  const [createFinancialOrganization, { isLoading: isCreating }] =
    useCreateFinancialOrganizationMutation()
  const isOpen = useAppSelector(selectFinancialOrganizationViewerIsOpen)

  const emptyItem = {
    shortName: '',
    fullName: '',
    inn: '',
    ogrn: '',
    actualAddress: '',
    legalAddress: '',
    phone: '',
    email: '',
    activityTypeCode: '',
    registrationDate: null,
    terminationDate: null,
    terminationDecisionNumber: '',
    externalId: '',
  }

  const [form, setForm] = useState<FinancialOrganizationForm>(emptyItem)

  const [activityType, setActivityType] = useState<SelectOption | null>({
    value: '',
    label: '',
  })

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      activityTypeCode: activityType?.value ?? '',
    }))
  }, [activityType])

  const handleChange = <K extends keyof FinancialOrganizationForm>(
    field: K,
    value: FinancialOrganizationForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleReset = () => {
    if (!confirm('Очистить все введённые данные?')) return

    setForm(emptyItem)
    setActivityType({ value: '', label: '' })
  }

  const handleSave = async () => {
    try {
      await createFinancialOrganization(form).unwrap()

      toast.success('Сохранено', {
        description: 'Финансовая организация успешно добавлена',
      })

      dispatch(closeViewer())
    } catch (e) {
      console.error(e)

      toast.error('Ошибка', {
        description: 'Не удалось добавить новую финансовую организацию',
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
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Добавление финансовой организации</DrawerTitle>
              <DrawerDescription>
                Добавление финансовой организации
              </DrawerDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Очистить форму
            </Button>
          </div>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-2 text-sm">
          <form className="flex flex-col gap-4">
            {/* Основная информация */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold">Основное</h3>

              <div className="flex flex-col gap-3">
                <Label htmlFor="shortName">Краткое наименование</Label>
                <EditableTextArea
                  id="shortName"
                  initialValue={form.shortName}
                  onChange={(v) => handleChange('shortName', v ?? '')}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="fullName">Полное наименование</Label>
                <EditableTextArea
                  id="fullName"
                  initialValue={form.fullName}
                  onChange={(v) => handleChange('fullName', v ?? '')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="inn">ИНН</Label>
                  <EditableInput
                    id="inn"
                    initialValue={form.inn}
                    onChange={(v) => handleChange('inn', v ?? '')}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="ogrn">ОГРН</Label>
                  <EditableInput
                    id="ogrn"
                    initialValue={form.ogrn}
                    onChange={(v) => handleChange('ogrn', v ?? '')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Контакты */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Контакты</h3>

              <div className="flex flex-col gap-3">
                <Label htmlFor="actualAddress">Фактический адрес</Label>
                <EditableTextArea
                  id="actualAddress"
                  initialValue={form.actualAddress}
                  onChange={(v) => handleChange('actualAddress', v ?? '')}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="legalAddress">Юридический адрес</Label>
                <EditableTextArea
                  id="legalAddress"
                  initialValue={form.legalAddress}
                  onChange={(v) => handleChange('legalAddress', v ?? '')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="phone">Телефон(ы)</Label>
                  <EditableInput
                    id="phone"
                    initialValue={form.phone}
                    onChange={(v) => handleChange('phone', v ?? '')}
                  />
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="email">Электронная почта</Label>
                  <EditableInput
                    id="email"
                    initialValue={form.email}
                    onChange={(v) => handleChange('email', v ?? '')}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Классификация */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Классификация</h3>

              <div className="flex flex-col gap-3">
                <Label htmlFor="region">Тип финансовой организации</Label>
                <EditableCombobox
                  value={activityType}
                  onChange={(v: any) => setActivityType(v)}
                  options={meta.financialActivityTypes}
                  drawerRef={drawerRef}
                />
              </div>
            </div>

            {/* Прочая информация */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Прочая информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="registrationDate">Дата регистрации</Label>
                  <EditableCalendar
                    id="registrationDate"
                    initialValue={DateAdapter.fromApi(form.registrationDate)}
                    onChange={(v) =>
                      handleChange(
                        'registrationDate',
                        DateAdapter.toApiDateOnly(v),
                      )
                    }
                  />
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="terminationDate">Дата прекращения</Label>
                  <EditableCalendar
                    id="terminationDate"
                    initialValue={DateAdapter.fromApi(form.terminationDate)}
                    onChange={(v) =>
                      handleChange(
                        'terminationDate',
                        DateAdapter.toApiDateOnly(v),
                      )
                    }
                  />
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="terminationDecisionNumber">
                    Номер приказа ЦБ
                  </Label>
                  <EditableInput
                    id="terminationDecisionNumber"
                    initialValue={form.terminationDecisionNumber}
                    onChange={(v) =>
                      handleChange('terminationDecisionNumber', v ?? '')
                    }
                  />
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="externalId">Номер ФО в СОО</Label>
                  <EditableInput
                    id="externalId"
                    initialValue={form.externalId}
                    onChange={(v) => handleChange('externalId', v ?? '')}
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
