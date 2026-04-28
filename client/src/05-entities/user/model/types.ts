import type { Employee } from '@/05-entities/employee/model/types'

export const UserRoles = ['ADMIN', 'MANAGER', 'USER'] as const
export type UserRole = (typeof UserRoles)[number]

export interface User {
  id: string
  role: UserRole
  employee: Employee
}
