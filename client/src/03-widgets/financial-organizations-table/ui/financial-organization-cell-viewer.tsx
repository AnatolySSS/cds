import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Newspaper } from 'lucide-react'
import { useIsMobile } from '@/06-shared/hooks/use-mobile'
import type { FinancialOrganization } from '@/05-entities'
import type { FinancialOrganizationTableMeta } from '@/03-widgets/financial-organizations-table'
import { toast } from 'sonner'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  EditableInput,
  EditableTextArea,
  LoadingItem,
  Button,
  Separator,
  Label,
  EditableCalendar,
} from '@/06-shared'

import { useUpdateFinancialOrganizationMutation } from '@/05-entities'
import type { FinancialOrganizationForm } from '../model/types'
import { EditableCombobox } from '@/06-shared/ui/editable-combobox'
import { DateAdapter } from '@/06-shared/lib/date/date-adapter'

export function FinancialOrganizationCellViewer({
  item,
  meta,
}: {
  item: FinancialOrganization
  meta: FinancialOrganizationTableMeta
}) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [updateFinancialOrganization, { isLoading: isUpdating }] =
    useUpdateFinancialOrganizationMutation()
  const isMobile = useIsMobile()

  const [isOpen, setIsOpen] = useState(false)
  const [historyMessage, setHistoryMessage] = useState('')

  const initialForm = useMemo(
    () => ({
      shortName: item.shortName,
      fullName: item.fullName,
      inn: item.inn,
      ogrn: item.ogrn,
      actualAddress: item.actualAddress,
      legalAddress: item.legalAddress,
      phone: item.phone,
      email: item.email,
      activityTypeCode: item.activityType.code,
      registrationDate: item.registrationDate,
      terminationDate: item.terminationDate,
      terminationDecisionNumber: item.terminationDecisionNumber,
      externalId: item.externalId,
    }),
    [item],
  )

  const [form, setForm] = useState<FinancialOrganizationForm>(initialForm)

  //Необходимо для корректного отображения данных при открытии и закрытии дровера, а также при смене элемента в таблице
  useEffect(() => {
    setForm(initialForm)
  }, [initialForm])

  const handleChange = <K extends keyof FinancialOrganizationForm>(
    field: K,
    value: FinancialOrganizationForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    try {
      await updateFinancialOrganization({
        id: item.id,
        data: form,
      }).unwrap()

      toast.success('Сохранено', {
        description: 'Данные успешно обновлены',
      })

      setIsOpen(false)
    } catch (e) {
      console.error(e)

      toast.error('Ошибка', {
        description: 'Не удалось сохранить изменения',
      })
    }
  }

  // Запрос на краткую историческую справку о суде
  const handleAsk = useCallback(async () => {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
          'HTTP-Referer': 'http://localhost:3000', // можно любой
          'X-Title': 'My App',
        },
        body: JSON.stringify({
          model: 'minimax/minimax-m2.5:free', // или 'openai/gpt-3.5-turbo'
          messages: [
            {
              role: 'user',
              content: `расскажи интересный и малоизвестный факт про ${item.shortName} диапазон слов от 50 до 70 слов, если нет достоверной информации придумай что-то правдоподобное сам. Пиши только про финансовую организацию не пиши того, что у тебя нет данных и не пиши про то, что мне нужно поискать в интернете`,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      })

      const data = await res.json()
      setHistoryMessage(data.choices?.[0]?.message?.content || 'Нет ответа')
    } catch (err) {
      console.error(err)
      setHistoryMessage('Ошибка при запросе к AI')
    }
  }, [item])

  useEffect(() => {
    let timer: number | undefined

    if (isOpen) {
      // запускаем таймер на 2 секунды
      timer = setTimeout(() => {
        handleAsk()
      }, 2000)
    }

    // если isOpen станет false до истечения таймера — отменяем вызов
    return () => clearTimeout(timer)
  }, [isOpen, handleAsk])

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)

        if (!open) {
          setForm(initialForm)
          setHistoryMessage('')
        }
      }}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="w-full px-0 text-left justify-start text-foreground whitespace-normal"
        >
          <span className="line-clamp-2 break-words">{item.shortName}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[500px]" ref={drawerRef}>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.shortName}</DrawerTitle>
          <DrawerDescription>
            Информация о финансовой организации
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-2 text-sm">
          {!isMobile && (
            <>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Историческая справка <Newspaper className="size-4" />
                </div>
                {historyMessage ? (
                  <div className="grid gap-2">
                    <div className="text-muted-foreground">
                      {historyMessage}
                    </div>
                    <div className="text-muted-foreground text-xs text-right">
                      Сгенерировано AI, возможны неточности
                    </div>
                  </div>
                ) : (
                  <LoadingItem />
                )}
              </div>
              <Separator />
            </>
          )}
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
                  value={
                    meta.financialActivityTypes.find(
                      (r) => r.value === form.activityTypeCode,
                    ) ?? null
                  }
                  onChange={(v) =>
                    handleChange('activityTypeCode', v?.value ?? '')
                  }
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
                        DateAdapter.toApiDateOnly(v) ?? '',
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
                        DateAdapter.toApiDateOnly(v) ?? '',
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
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
