import { useLoginMutation } from '@/05-entities'

export const useLogin = () => {
  const [loginMutation, { isLoading }] = useLoginMutation()

  const handleLogin = async (login: string, password: string) => {
    const { accessToken } = await loginMutation({ login, password }).unwrap()

    sessionStorage.setItem('accessToken', accessToken)
  }

  return { handleLogin, isLoading }
}
