import { forwardRef, Module } from '@nestjs/common';

import { UserRepository } from './infrastructure/repositories/user.repository';
import { UsersController } from './infrastructure/controllers/user.controller';

import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UserRepository,
    GetUsersUseCase,
    GetUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: ['IUserRepository'],
})
export class UsersModule {}
