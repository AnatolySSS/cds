import { baseApi } from '@/06-shared'
import type { AuthTokens } from '../model/types'
import type { User } from '@/05-entities'

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthTokens, { login: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CurrentUser'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['CurrentUser'],
    }),

    me: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['CurrentUser'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = AuthApi
