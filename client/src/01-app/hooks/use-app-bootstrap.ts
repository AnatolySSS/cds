import { useEffect } from 'react'
import { EmployeesApi } from '@/05-entities/employee/api/employees.api'
import { AuthApi } from '@/05-entities/auth/api/auth.api'
import { DictionariesApi } from '@/06-shared/api/dictionaries.api'
import { useAppDispatch } from '../hooks'

export function useAppBootstrap() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const load = async () => {
      try {
        await Promise.all([
          dispatch(
            EmployeesApi.endpoints.getAllEmployees.initiate(undefined, {
              subscribe: false,
            }),
          ),
          dispatch(
            AuthApi.endpoints.me.initiate(undefined, { subscribe: false }),
          ),
          dispatch(
            DictionariesApi.endpoints.getAllDictionaries.initiate(undefined, {
              subscribe: false,
            }),
          ),
        ])
      } catch (e) {
        console.error('bootstrap error', e)
      }
    }

    load()
  }, [dispatch])
}
