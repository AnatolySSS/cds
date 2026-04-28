import * as bcrypt from 'bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ITokenService } from '../../domain/services/token.service.interface';
import { IUserRepository } from '../../../users/domain/repositories/user.repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,

    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  async execute(login: string, password: string) {
    const user = await this.userRepo.findByLogin(login);

    if (!user) throw new UnauthorizedException('Неверный логин или пароль');

    // проверка пароля
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Неверный логин или пароль');

    const payload = { sub: user.id };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    const hash = await bcrypt.hash(refreshToken, 10);

    await this.userRepo.updateRefreshToken(user.id, hash);

    return { accessToken, refreshToken };
  }
}
