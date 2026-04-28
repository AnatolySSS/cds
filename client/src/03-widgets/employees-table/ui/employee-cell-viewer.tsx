import { useState } from 'react'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { useIsMobile } from '@/06-shared/hooks/use-mobile'
import type { Employee } from '@/05-entities'
import type { EmployeeTableMeta } from '@/03-widgets/employees-table'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Button,
  Separator,
  Label,
  Input,
  Textarea,
} from '@/06-shared'

export function EmployeeCellViewer({
  item,
}: {
  item: Employee
  meta: EmployeeTableMeta
}) {
  const isMobile = useIsMobile()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="w-full px-0 text-left justify-start text-foreground whitespace-normal"
        >
          <span className="line-clamp-2 break-words">{item.full_name}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[500px]">
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.full_name}</DrawerTitle>
          <DrawerDescription>Информация о сотруднике</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-2 text-sm">
          <form className="flex flex-col gap-4">
            {/* Основная информация */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold">Основное</h3>

              <div className="flex flex-col gap-3">
                <Label htmlFor="full_name">ФИО</Label>
                <Input id="full_name" value={item.full_name} disabled />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="department">Подразделение</Label>
                  <Input id="department" value={item.department} disabled />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="title">Должность</Label>
                  <Input id="title" value={item.title} disabled />
                </div>
              </div>
            </div>

            <Separator />

            {/* Контакты */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Контакты</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="division">Филиал</Label>
                  <Input id="division" value={item.division.name} disabled />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="login">Логин</Label>
                  <Input id="login" value={item.login} disabled />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="email">"Электронная почта"</Label>
                  <Input id="email" value={item.email} disabled />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" value={item.phone} disabled />
                </div>
              </div>
            </div>

            <Separator />

            {/* Дополнительные данные */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold">Дополнительные данные</h3>

              <div className="flex flex-col gap-3">
                <Label htmlFor="dn">Служебная информация</Label>
                <Textarea id="dn" value={item.dn} disabled />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="cn">Идентификатор</Label>
                  <Input id="cn" value={item.cn} disabled />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="cn">Работает</Label>
                  {item.is_present ? (
                    <CircleCheckBig color="var(--color-primary)" />
                  ) : (
                    <CircleX color="var(--color-destructive)" />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
