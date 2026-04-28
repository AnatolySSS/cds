import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/06-shared'
import { courtViewerReducer } from '@/03-widgets/courts-table/model/court-table-slice'
import { employeeViewerReducer } from '@/03-widgets/employees-table/model/employee-table-slice'
import { userViewerReducer } from '@/03-widgets/users-table/model/user-table-slice'
import { financialOrganizationViewerReducer } from '@/03-widgets/financial-organizations-table/model/financial-organization-table-slice'

export const store = configureStore({
  reducer: {
    courtViewer: courtViewerReducer,
    financialOrganizationViewer: financialOrganizationViewerReducer,
    employeeViewer: employeeViewerReducer,
    userViewer: userViewerReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
