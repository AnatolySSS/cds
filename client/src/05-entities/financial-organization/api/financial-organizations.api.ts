import stableStringify from 'fast-json-stable-stringify'
import { baseApi } from '@/06-shared'
import type { FinancialOrganization } from '../model/types'
import type {
  BulkCreateFinancialOrganizationsRequest,
  BulkCreateFinancialOrganizationsResponse,
  CreateFinancialOrganizationDto,
} from '../model/dto'
import type { DataTableQueryParams } from '@/06-shared/data-table'

export type GetFinancialOrganizationsResponse = {
  items: FinancialOrganization[]
  total: number
}

export const FinancialOrganizationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialOrganizations: builder.query<
      GetFinancialOrganizationsResponse,
      DataTableQueryParams
    >({
      query: (body) => {
        return {
          url: '/FinancialOrganizations/search',
          method: 'POST',
          body,
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${stableStringify(queryArgs)}`
      },
      providesTags: ['FinancialOrganization'],
    }),

    getFinancialOrganization: builder.query<FinancialOrganization, string>({
      query: (id) => `/financialOrganizations/${id}`,
      providesTags: ['FinancialOrganization'],
    }),

    createFinancialOrganizations: builder.mutation<
      BulkCreateFinancialOrganizationsResponse,
      BulkCreateFinancialOrganizationsRequest
    >({
      query: (body) => ({
        url: '/financialOrganizations/bulk',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FinancialOrganization'],
    }),

    createFinancialOrganization: builder.mutation<
      FinancialOrganization,
      CreateFinancialOrganizationDto
    >({
      query: (body) => ({
        url: '/financialOrganizations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FinancialOrganization'],
    }),

    updateFinancialOrganization: builder.mutation<
      FinancialOrganization,
      { id: string; data: Partial<CreateFinancialOrganizationDto> }
    >({
      query: ({ id, data }) => ({
        url: `/financialOrganizations/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['FinancialOrganization'],
    }),

    deleteFinancialOrganization: builder.mutation<void, string>({
      query: (id) => ({
        url: `/financialOrganizations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FinancialOrganization'],
    }),
  }),

  overrideExisting: 'throw',
})

export const {
  useGetFinancialOrganizationsQuery,
  useGetFinancialOrganizationQuery,
  useCreateFinancialOrganizationsMutation,
  useCreateFinancialOrganizationMutation,
  useUpdateFinancialOrganizationMutation,
  useDeleteFinancialOrganizationMutation,
} = FinancialOrganizationsApi
