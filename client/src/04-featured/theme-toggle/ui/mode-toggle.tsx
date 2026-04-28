import { Moon, Sun, Monitor } from 'lucide-react' // добавили Monitor
import { Button } from '@/06-shared/ui/shadcn/button'

export function ModeToggle<TData>({
  THEMES,
  theme,
  setTheme,
}: {
  THEMES: readonly TData[]
  theme: TData
  setTheme: (theme: TData) => void
}) {
  const toggleTheme = () => {
    const currentIndex = THEMES.indexOf(theme)
    const nextIndex = (currentIndex + 1) % THEMES.length

    setTheme(THEMES[nextIndex])
  }
  const themes = THEMES.filter(
    (t) => !['light', 'dark', 'system'].includes(t as string),
  )

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${theme === 'light' ? 'scale-100' : 'scale-0'}`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${theme === 'dark' ? 'scale-100' : 'scale-0'}`}
      />
      <Monitor
        className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${theme === 'system' ? 'scale-100' : 'scale-0'}`}
      />
      {themes.map((t) => (
        <div
          key={t as string}
          className={`h-[1.2rem] w-[1.2rem] rounded-full transition-all absolute bg-[var(--accent)] ${
            theme === t ? 'scale-100' : 'scale-0'
          }`}
        />
      ))}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
