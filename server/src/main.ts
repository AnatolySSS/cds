import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './auth/infrastructure/guards/jwt-auth.guard';
import { SanitizationPipe } from './infrastructure/pipes/sanitization.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // 🔹 Разрешаем CORS для фронтенда на порту 5173
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // если нужны куки
  });

  app.use(cookieParser());

  // 🔹 Увеличиваем лимит JSON и urlencoded до 10 МБ
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // 🔹 Валидация DTO
  app.useGlobalPipes(
    new SanitizationPipe(),
    new ValidationPipe({
      whitelist: true, // удаляет лишние поля
      forbidNonWhitelisted: true, // выбрасывает ошибку на лишние поля
      transform: true, // преобразует payload в классы DTO
    }),
  );

  // 🔹 Глобальный Guard (для всех защищённых endpoint)
  app.useGlobalGuards(app.get(JwtAuthGuard));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
