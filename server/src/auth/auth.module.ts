import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './infrastructure/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RefreshUseCase } from './application/use-cases/refresh.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { EmailService } from './infrastructure/services/email.service';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { GetUserUseCase } from 'src/users/application/use-cases/get-user.use-case';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'defaultAccessSecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RefreshUseCase,
    LogoutUseCase,
    EmailService,
    JwtAuthGuard,
    GetUserUseCase,
    {
      provide: 'ITokenService',
      useClass: JwtTokenService,
    },
    {
      provide: 'IEmailService',
      useClass: EmailService,
    },
  ],
  exports: ['ITokenService', 'IEmailService', EmailService, JwtAuthGuard],
})
export class AuthModule {}
