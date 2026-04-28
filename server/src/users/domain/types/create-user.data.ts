import { UserRole } from 'generated/prisma/enums';

export interface CreateUserData {
  id: string;
  passwordHash: string;
  role: UserRole;
}
