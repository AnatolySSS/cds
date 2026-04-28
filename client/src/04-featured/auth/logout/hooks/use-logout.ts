import { useAppDispatch } from '@/01-app'
import { useLogoutMutation } from '@/05-entities'
import { baseApi } from '@/06-shared'

export const useLogout = () => {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch (e) {
      // даже если сервер упал — всё равно чистим клиент
    }
    sessionStorage.removeItem('accessToken')

    // ✅ инвалидируем кэш текущего пользователя
    dispatch(baseApi.util.resetApiState())
  }

  return { handleLogout }
}
