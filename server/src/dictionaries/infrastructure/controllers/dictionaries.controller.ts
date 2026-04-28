import { GetDictionariesUseCase } from '@/dictionaries/application/use-cases/get-dictionaries.use-case';
import { Controller, Get } from '@nestjs/common';

@Controller('dictionaries')
export class DictionariesController {
  constructor(private readonly getDictionaries: GetDictionariesUseCase) {}

  @Get() getAll() {
    return this.getDictionaries.execute();
  }
}
