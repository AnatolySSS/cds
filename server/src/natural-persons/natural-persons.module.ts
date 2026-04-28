import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { BulkCreateNaturalPersonsUseCase } from './application/use-cases/bulk-create-natural-person.use-case';
import { CreateNaturalPersonUseCase } from './application/use-cases/create-natural-person.use-case';
import { NaturalPersonRepository } from './infrastructure/repositories/natural-person.repository';
import { NaturalPersonsController } from './infrastructure/controllers/natural-person.controller';
import { DeleteNaturalPersonUseCase } from './application/use-cases/delete-natural-person.use-case';
import { GetNaturalPersonUseCase } from './application/use-cases/get-natural-person.use-case';
import { GetNaturalPersonsUseCase } from './application/use-cases/get-natural-persons.use-case';
import { UpdateNaturalPersonUseCase } from './application/use-cases/update-natural-person.use-case';

@Module({
  controllers: [NaturalPersonsController],
  providers: [
    PrismaService,
    BulkCreateNaturalPersonsUseCase,
    CreateNaturalPersonUseCase,
    DeleteNaturalPersonUseCase,
    GetNaturalPersonUseCase,
    GetNaturalPersonsUseCase,
    UpdateNaturalPersonUseCase,
    {
      provide: 'INaturalPersonRepository',
      useClass: NaturalPersonRepository,
    },
  ],
})
export class NaturalPersonsModule {}
