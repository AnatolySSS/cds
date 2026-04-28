import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourtsModule } from './courts/courts.module';
import { EmployeesModule } from './employees/employees.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FinancialOrganizationsModule } from './financial-organizations/financial-organizations.module';
import { DictionariesModule } from './dictionaries/dictionaries.module';

@Module({
  imports: [
    PrismaModule,
    CourtsModule,
    EmployeesModule,
    AuthModule,
    UsersModule,
    FinancialOrganizationsModule,
    DictionariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
