import stableStringify from 'fast-json-stable-stringify'
import { baseApi } from '@/06-shared'
import type { Employee } from '../model/types'
import type {
  BulkCreateEmployeesRequest,
  BulkCreateEmployeesResponse,
  CreateEmployeeDto,
} from '../model/dto'
import type { DataTableQueryParams } from '@/06-shared/data-table'

export type GetEmployeesResponse = {
  items: Employee[]
  total: number
}

export const EmployeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<GetEmployeesResponse, DataTableQueryParams>({
      query: (body) => ({
        url: '/employees/search',
        method: 'POST',
        body,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${stableStringify(queryArgs)}`
      },
      providesTags: ['Employee'],
    }),

    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: '/employees/all',
      }),
    }),

    getEmployee: builder.query<Employee, string>({
      query: (id) => `/employees/${id}`,
      providesTags: ['Employee'],
    }),

    createEmployees: builder.mutation<
      BulkCreateEmployeesResponse,
      BulkCreateEmployeesRequest
    >({
      query: (body) => ({
        url: '/employees/bulk',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),

    createEmployee: builder.mutation<Employee, CreateEmployeeDto>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employee'],
    }),

    updateEmployee: builder.mutation<
      Employee,
      { id: string; data: Partial<CreateEmployeeDto> }
    >({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Employee'],
    }),

    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),

  overrideExisting: 'throw',
})

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeesMutation,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = EmployeesApi
