import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/users/domain/repositories/user.repository.interface';

@Injectable()
export class LogoutUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // если уже разлогинен — просто выходим
    if (!user.refreshTokenHash) {
      return;
    }

    await this.userRepo.updateRefreshToken(userId, null);
  }
}
