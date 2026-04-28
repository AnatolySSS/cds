import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ITokenService } from '../../domain/services/token.service.interface';
import { JwtPayload } from 'src/auth/domain/services/token.types';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { IUserRepository } from '@/users/domain/repositories/user.repository.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
    @Inject('ITokenService') private tokenService: ITokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 🔹 проверяем, помечен ли маршрут как Public
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(), // метод
      context.getClass(), // класс
    ]);

    if (isPublic) return true; // маршрут публичный → guard пропускает

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Нет токена, нужно авторизоваться');

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.tokenService.verifyAccessToken(token) as JwtPayload;

      const user = await this.userRepo.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Истекло время сессии');
    }
  }
}
