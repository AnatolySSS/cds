import { ModeToggle } from '@/04-featured'
import { Separator } from '@/06-shared'
import { SidebarTrigger } from '@/06-shared'
import { useMatches } from 'react-router-dom'

type MatchWithHandle = {
  handle?: {
    title?: string
  }
}

export function SiteHeader<TData>({
  THEMES,
  theme,
  setTheme,
}: {
  THEMES: readonly TData[]
  theme: TData
  setTheme: (theme: TData) => void
}) {
  const matches = useMatches() as MatchWithHandle[]
  const currentPage = [...matches].reverse().find((m) => m.handle?.title)
  const title = currentPage?.handle?.title || ''

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle<TData>
            THEMES={THEMES}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>
    </header>
  )
}
