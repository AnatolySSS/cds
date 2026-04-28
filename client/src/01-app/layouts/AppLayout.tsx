import React from 'react'
import { Outlet } from 'react-router-dom'

import { useTheme } from '@/01-app/hooks/use-theme'
import { AppSidebar } from '@/03-widgets'
import { SiteHeader } from '@/03-widgets'
import { SidebarInset, SidebarProvider } from '@/06-shared'

import { THEMES, type Theme } from '../providers/model/types'

export function AppLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <SidebarProvider
      className="h-screen"
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset
        className="min-w-0 max-w-full overflow-auto"
        style={{ height: 'calc(100% - 16px)' }} // 16px — отступ сверху/снизу
      >
        <SiteHeader<Theme> THEMES={THEMES} theme={theme} setTheme={setTheme} />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
