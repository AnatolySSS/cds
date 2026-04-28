import { useTheme } from '@/01-app/hooks/use-theme'

export function Logo() {
  const { theme } = useTheme()

  const isSystemDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const isDark =
    theme === 'dark' ||
    theme.endsWith('-dark') ||
    (theme === 'system' && isSystemDark)

  const favicon = isDark ? '/favicon-dark.ico' : '/favicon-light.ico'

  return (
    <div className="flex items-center gap-4 group-data-[collapsible=icon]:gap-2">
      <div className="flex">
        <img
          src={favicon}
          className="
            h-10 w-auto 
            transition-all duration-200
            group-data-[collapsible=icon]:h-6
            group-data-[collapsible=icon]:translate-x-1
          "
          alt="Logo"
        />
      </div>

      <div
        className="text-left whitespace-nowrap text-ellipsis flex-1
          overflow-hidden transition-opacity duration-[300ms]
          group-data-[collapsible=icon]:opacity-0"
      >
        Учет судебных дел
      </div>
    </div>
  )
}
