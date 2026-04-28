import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from '../../application/dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RefreshUseCase } from '../../application/use-cases/refresh.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { AuthRequest } from '../types/auth-request.interface';
import { Public } from 'src/auth/infrastructure/decorators/public.decorator';
import { GetUserUseCase } from 'src/users/application/use-cases/get-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  // 🔹 Login endpoint
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.loginUseCase.execute(dto.login, dto.password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    return { accessToken };
  }

  // 🔹 Refresh endpoint
  @Public()
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) throw new UnauthorizedException();

    const { accessToken, newRefreshToken } = await this.refreshUseCase.execute(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  // 🔹 Logout endpoint
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.logoutUseCase.execute(req.user.id);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    });

    return { success: true };
  }

  // 🔹 Current user info
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: AuthRequest) {
    return this.getUserUseCase.execute(req.user.id);
  }
}
