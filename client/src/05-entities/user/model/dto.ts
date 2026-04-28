import type { UserRole } from './types'

export type CreateUserDto = {
  id: string
  role: UserRole
}
