import { UpdateUserDto } from '@/users/application/dto/update-user.dto';
import { User } from '../entities/user.entity';
import { CreateUserData } from '../types/create-user.data';
import { ResponseUserDto } from '@/users/application/dto/response-user.dto';

export interface IUserRepository {
  // стандартные CRUD
  findAll(): Promise<ResponseUserDto[]>;
  findById(id: string): Promise<User | null>;
  create(user: CreateUserData): Promise<ResponseUserDto>;
  update(id: string, user: UpdateUserDto): Promise<ResponseUserDto>;
  delete(id: string): Promise<void>;

  // специфично для аутентификации
  findByLogin(login: string): Promise<User | null>;

  // управление refresh токеном
  updateRefreshToken(userId: string, refreshTokenHash: string | null): Promise<void>;
}
