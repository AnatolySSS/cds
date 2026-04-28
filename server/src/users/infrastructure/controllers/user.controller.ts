import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';

import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

import { GetUsersUseCase } from 'src/users/application/use-cases/get-users.use-case';
import { GetUserUseCase } from 'src/users/application/use-cases/get-user.use-case';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from 'src/users/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from 'src/users/application/use-cases/delete-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUsers: GetUsersUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get() getAll() {
    return this.getUsers.execute();
  }
  @Get(':id') getOne(@Param('id') id: string) {
    return this.getUser.execute(id);
  }
  @Post() create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUser.execute(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
