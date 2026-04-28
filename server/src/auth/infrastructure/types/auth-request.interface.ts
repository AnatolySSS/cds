import { Request } from 'express';
import { User } from 'generated/prisma/browser';

export interface AuthRequest extends Request {
  user: User;
}
