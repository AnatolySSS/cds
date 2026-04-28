// ======================
// Court
// ======================
export type { Court } from './court/model/types'
export {
  useGetCourtsQuery,
  useGetCourtQuery,
  useCreateCourtMutation,
  useCreateCourtsMutation,
  useUpdateCourtMutation,
  useDeleteCourtMutation,
} from './court/api/courts.api'

// ======================
// Employee
// ======================
export type { Employee } from './employee/model/types'
export {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useCreateEmployeesMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from './employee/api/employees.api'

// ======================
// User
// ======================
export type { User } from './user/model/types'
export {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './user/api/users.api'

// ======================
// Auth
// ======================
export {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from './auth/api/auth.api.ts'

// ======================
// Court
// ======================
export type { FinancialOrganization } from './financial-organization/model/types.ts'
export {
  useGetFinancialOrganizationsQuery,
  useGetFinancialOrganizationQuery,
  useCreateFinancialOrganizationMutation,
  useCreateFinancialOrganizationsMutation,
  useUpdateFinancialOrganizationMutation,
  useDeleteFinancialOrganizationMutation,
} from './financial-organization/api/financial-organizations.api'
