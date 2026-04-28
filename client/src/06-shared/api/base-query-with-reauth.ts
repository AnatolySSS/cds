import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

const API_URL = import.meta.env.VITE_API_URL

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    // ❗ защита от бесконечного цикла
    if (typeof args === 'object' && args.url === '/auth/refresh') {
      sessionStorage.removeItem('accessToken')
      return result
    }

    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as { accessToken: string })
        .accessToken

      sessionStorage.setItem('accessToken', newAccessToken)

      // 🔁 повторяем исходный запрос
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      sessionStorage.removeItem('accessToken')
    }
  }

  return result
}
