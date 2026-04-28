import type { SelectOption } from '@/06-shared/data-table'
import { baseApi } from './base.api'

export type DictionariesResponse = {
  regions: SelectOption[]
  courtTypes: SelectOption[]
  cassationDistricts: SelectOption[]
  divisions: (SelectOption & { number: string })[]
  financialActivityTypes: SelectOption[]
}

export const DictionariesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDictionaries: builder.query<DictionariesResponse, void>({
      query: () => '/dictionaries',

      transformResponse: (response: any) => {
        const toOptions = (items: any[]) =>
          items.map((i) => ({
            label: i.name,
            value: i.code,
          }))

        return {
          regions: toOptions(response.regions),
          courtTypes: toOptions(response.courtTypes),
          cassationDistricts: toOptions(response.cassationDistricts),
          divisions: response.divisions.map((i: any) => ({
            label: i.name,
            value: i.code,
            number: i.number, // 👈 добавили поле
          })),
          financialActivityTypes: toOptions(response.financialActivityTypes),
        }
      },

      keepUnusedDataFor: 3600 * 24,
    }),
  }),
})

export const { useGetAllDictionariesQuery } = DictionariesApi
