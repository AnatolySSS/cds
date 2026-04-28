import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/06-shared/ui/shadcn/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/06-shared/ui/shadcn/sidebar'
import { ChevronRightIcon } from 'lucide-react'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const location = useLocation()
  const pathname = location.pathname

  const [openItem, setOpenItem] = useState<string | null>(
    items.find(
      (item) =>
        item.url === pathname ||
        item.items?.some((sub) => sub.url === pathname),
    )?.title || null,
  )

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Основное меню</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            item.url === pathname ||
            item.items?.some((sub) => sub.url === pathname)

          const isOpen = openItem === item.title

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              open={isOpen}
              onOpenChange={(open) => setOpenItem(open ? item.title : null)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="
                    transition-all duration-200
                    hover:bg-accent hover:text-accent-foreground
                    active:scale-[0.98]
                    group-data-[state=open]/collapsible:bg-accent
                  "
                  >
                    <div className="flex items-center gap-2 transition-all duration-200 group-hover/collapsible:translate-x-1">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent
                  className="
                  overflow-hidden
                  transition-all duration-300 ease-in-out
                  data-[state=closed]:animate-collapsible-up
                  data-[state=open]:animate-collapsible-down
                "
                >
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
