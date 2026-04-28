import * as bcrypt from 'bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ITokenService } from '../../domain/services/token.service.interface';
import { IUserRepository } from '../../../users/domain/repositories/user.repository.interface';

@Injectable()
export class RefreshUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,

    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string) {
    // 1. Проверяем JWT (подпись + срок жизни)
    const payload = this.tokenService.verifyRefreshToken(refreshToken);

    if (!payload) throw new UnauthorizedException();

    const userId = payload.sub;

    // 2. Достаём пользователя
    const user = await this.userRepo.findById(userId);

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    // 3. Сравниваем хэш
    const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!isMatch) throw new UnauthorizedException();

    // 4. Генерируем новые токены
    const newPayload = { sub: user.id };

    const accessToken = this.tokenService.generateAccessToken(newPayload);
    const newRefreshToken = this.tokenService.generateRefreshToken(newPayload);

    // 5. Хешируем новый refreshToken
    const hash = await bcrypt.hash(newRefreshToken, 10);

    await this.userRepo.updateRefreshToken(user.id, hash);

    return { accessToken, newRefreshToken };
  }
}
