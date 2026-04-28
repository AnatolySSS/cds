import { cn } from '@/06-shared/lib/utils'
import { Button } from '@/06-shared/ui/shadcn/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/06-shared/ui/shadcn/card'
import { Field, FieldGroup, FieldLabel } from '@/06-shared/ui/shadcn/field'
import { Input } from '@/06-shared/ui/shadcn/input'
import { useLogin } from '../hooks/use-login'
import { useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/06-shared/lib/api/getErrorMessage'
import { useLocation, useNavigate } from 'react-router-dom'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { handleLogin, isLoading } = useLogin()
  const location = useLocation()
  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const from = (location.state as any)?.from?.pathname || '/'

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      await handleLogin(login, password)
      toast.success('Вы успешно вошли 🏛️')
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Добро пожаловать!</CardTitle>
          <CardDescription>
            Система учета судебных дел <br />
            Судебно-претензионного управления <br />
            АНО "СОДФУ"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="login">Логин</FieldLabel>
                <Input
                  id="login"
                  type="login"
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  Войти
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
