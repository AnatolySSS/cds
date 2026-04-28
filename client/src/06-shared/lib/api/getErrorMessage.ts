import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type ApiErrorData = {
  message: string
}

export const getErrorMessage = (error: unknown): string => {
  const err = error as FetchBaseQueryError & {
    data: ApiErrorData
  }

  if (err?.status === 400) {
    return err?.data?.message
  }

  if (err?.status === 401) {
    return err?.data?.message
  }

  if (err?.status === 503) {
    return err?.data?.message
  }

  if (err?.status === 500) {
    return 'Ошибка сервера'
  }

  return 'Что-то пошло не так'
}
