import { Module } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';

import { CourtRepository } from './infrastructure/repositories/court.repository';
import { CourtsController } from './infrastructure/controllers/courts.controller';

import { GetCourtsUseCase } from './application/use-cases/get-courts.use-case';
import { GetCourtUseCase } from './application/use-cases/get-court.use-case';
import { CreateCourtUseCase } from './application/use-cases/create-court.use-case';
import { BulkCreateCourtsUseCase } from './application/use-cases/bulk-create-courts.use-case';
import { UpdateCourtUseCase } from './application/use-cases/update-court.use-case';
import { DeleteCourtUseCase } from './application/use-cases/delete-court.use-case';

@Module({
  controllers: [CourtsController],
  providers: [
    CourtRepository,
    GetCourtsUseCase,
    GetCourtUseCase,
    CreateCourtUseCase,
    BulkCreateCourtsUseCase,
    UpdateCourtUseCase,
    DeleteCourtUseCase,
    { provide: 'ICourtRepository', useClass: CourtRepository },
  ],
})
export class CourtsModule {}
