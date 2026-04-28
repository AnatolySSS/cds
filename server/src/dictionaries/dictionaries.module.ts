import { Module } from '@nestjs/common';

import { DictionariesController } from './infrastructure/controllers/dictionaries.controller';
import { GetDictionariesUseCase } from './application/use-cases/get-dictionaries.use-case';
import { DictionariesRepository } from './infrastructure/repositories/dictionaries.repository';

@Module({
  controllers: [DictionariesController],
  providers: [
    GetDictionariesUseCase,
    { provide: 'IDictionariesRepository', useClass: DictionariesRepository },
  ],
})
export class DictionariesModule {}
