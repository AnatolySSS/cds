import { baseApi } from '@/06-shared'
import type { Court } from '../model/types'
import type {
  BulkCreateCourtsRequest,
  BulkCreateCourtsResponse,
  CreateCourtDto,
} from '../model/dto'
import stableStringify from 'fast-json-stable-stringify'
import type { DataTableQueryParams } from '@/06-shared/data-table'

export type GetCourtsResponse = {
  items: Court[]
  total: number
}

export const CourtsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourts: builder.query<GetCourtsResponse, DataTableQueryParams>({
      query: (body) => ({
        url: '/courts/search',
        method: 'POST',
        body,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${stableStringify(queryArgs)}`
      },
      providesTags: ['Court'],
    }),

    getCourt: builder.query<Court, string>({
      query: (id) => `/courts/${id}`,
      providesTags: ['Court'],
    }),

    createCourts: builder.mutation<
      BulkCreateCourtsResponse,
      BulkCreateCourtsRequest
    >({
      query: (body) => ({
        url: '/courts/bulk',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Court'],
    }),

    createCourt: builder.mutation<Court, CreateCourtDto>({
      query: (body) => ({
        url: '/courts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Court'],
    }),

    updateCourt: builder.mutation<
      Court,
      { id: string; data: Partial<CreateCourtDto> }
    >({
      query: ({ id, data }) => ({
        url: `/courts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Court'],
    }),

    deleteCourt: builder.mutation<void, string>({
      query: (id) => ({
        url: `/courts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Court'],
    }),
  }),

  overrideExisting: 'throw',
})

export const {
  useGetCourtsQuery,
  useGetCourtQuery,
  useCreateCourtsMutation,
  useCreateCourtMutation,
  useUpdateCourtMutation,
  useDeleteCourtMutation,
} = CourtsApi
