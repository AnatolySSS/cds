import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Newspaper } from 'lucide-react'
import { useIsMobile } from '@/06-shared/hooks/use-mobile'
import type { Court } from '@/05-entities'
import type { CourtTableMeta } from '@/03-widgets/courts-table'
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
} from '@/06-shared'

import { useUpdateCourtMutation } from '@/05-entities'
import type { CourtForm } from '../model/types'
import { EditableCombobox } from '@/06-shared/ui/editable-combobox'

export function CourtCellViewer({
  item,
  meta,
}: {
  item: Court
  meta: CourtTableMeta
}) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [updateCourt, { isLoading: isUpdating }] = useUpdateCourtMutation()
  const isMobile = useIsMobile()

  const [isOpen, setIsOpen] = useState(false)
  const [historyMessage, setHistoryMessage] = useState('')

  const initialForm = useMemo(
    () => ({
      name: item.name,
      address: item.address,
      email: item.email,
      site: item.site,
      phone: item.phone,
      serverNumbers: item.serverNumbers,
      regionCode: item.region.code,
      cassRegionCode: item.cassRegion.code,
      typeCode: item.type.code,
    }),
    [item],
  )

  const [form, setForm] = useState<CourtForm>(initialForm)

  //Необходимо для корректного отображения данных при открытии и закрытии дровера, а также при смене элемента в таблице
  useEffect(() => {
    setForm(initialForm)
  }, [initialForm])

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
      await updateCourt({
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
              content: `расскажи интересный и малоизвестный факт про ${item.name} диапазон слов от 50 до 70 слов, если нет достоверной информации придумай что-то правдоподобное сам. Пиши только про суд не пиши того, что у тебя нет данных и не пиши про то, что мне нужно обратиться в ГАС`,
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
      onOpenChange={setIsOpen}
      onClose={() => setHistoryMessage('')}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="w-full px-0 text-left justify-start text-foreground whitespace-normal"
        >
          <span className="line-clamp-2 break-words">{item.name}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[500px]" ref={drawerRef}>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Информация о суде и его параметры
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
                  initialValue={form.address}
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
                    initialValue={form.email}
                    onChange={(v) => handleChange('email', v ?? '')}
                  />
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label htmlFor="site">Сайт</Label>
                  <EditableInput
                    id="site"
                    initialValue={form.site}
                    onChange={(v) => handleChange('site', v ?? '')}
                  />
                </div>

                <div className="flex flex-col gap-3 md:col-span-2">
                  <Label htmlFor="phone">Телефон(ы)</Label>
                  <EditableInput
                    id="phone"
                    initialValue={form.phone}
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
                    value={
                      meta.regions.find((r) => r.value === form.regionCode) ??
                      null
                    }
                    placeholder={'Регион'}
                    onChange={(v) => handleChange('regionCode', v?.value ?? '')}
                    options={meta.regions}
                    drawerRef={drawerRef}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="cassRegion">Кассационный регион</Label>
                  <EditableCombobox
                    value={
                      meta.cassationDistricts.find(
                        (r) => r.value === form.cassRegionCode,
                      ) ?? null
                    }
                    onChange={(v) =>
                      handleChange('cassRegionCode', v?.value ?? '')
                    }
                    placeholder={'Кассационный регион'}
                    options={meta.cassationDistricts}
                    drawerRef={drawerRef}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="type">Тип суда</Label>
                  <EditableCombobox
                    value={
                      meta.courtTypes.find((r) => r.value === form.typeCode) ??
                      null
                    }
                    onChange={(v) => handleChange('typeCode', v?.value ?? '')}
                    placeholder={'Тип суда'}
                    options={meta.courtTypes}
                    drawerRef={drawerRef}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="serverNumbers">Кол-во серверов</Label>
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
