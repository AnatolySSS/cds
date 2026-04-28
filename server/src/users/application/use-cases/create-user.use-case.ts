import { Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { IEmailService } from 'src/auth/domain/services/email.service.interface';
import { UserRole } from 'generated/prisma/enums';
import { ResponseUserDto } from '../dto/response-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,

    @Inject('IEmailService')
    private readonly emailService: IEmailService,
  ) {}

  async execute(dto: CreateUserDto): Promise<ResponseUserDto> {
    // 🔹 1. Генерируем пароль
    const plainPassword = randomBytes(8).toString('hex'); // например: "a3f9c1e2..."

    // 🔹 2. Хэшируем
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    // 🔹 3. Создаём пользователя
    const user = await this.userRepo.create({
      id: dto.id,
      passwordHash,
      role: dto.role ?? UserRole.USER, // 🔹 Domain
    });

    // 🔹 4. Берём email из employee
    //TODO: убрать заглушку
    // const email = user.employee.email;
    const email = 'Anatoly_Shilyaev@mail.ru';
    if (!email) {
      throw new NotFoundException('Employee email not found');
    }

    // 🔹 5. Отправляем пароль
    // await this.emailService.sendCredentials(email, plainPassword);
    try {
      await this.emailService.sendCredentials(email, plainPassword);
    } catch (e) {
      await this.userRepo.delete(dto.id); // ⬅️ компенсация
      throw new ServiceUnavailableException('Не удалось отправить email. Попробуйте позже');
    }

    // 🔹 4. Возвращаем пароль (ВАЖНО: только один раз)
    //TODO: проверить поля на предмет наличия passwordHash
    return user;
  }
}
