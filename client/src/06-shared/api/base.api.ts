import { createApi } from '@reduxjs/toolkit/query/react'
import { TAGS } from './types'
import { baseQueryWithReauth } from './base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: TAGS,
})
