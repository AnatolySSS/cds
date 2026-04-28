import { THEMES, type Theme } from '@/01-app/providers/model/types'
import { LoginForm } from '@/04-featured'
import { ModeToggle } from '@/04-featured'
import { Logo } from '@/06-shared'

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-xs flex-col gap-6">
        <div className="flex w-full items-center justify-around">
          <Logo />
          {/* <ModeToggle<Theme> THEMES={THEMES} /> */}
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
