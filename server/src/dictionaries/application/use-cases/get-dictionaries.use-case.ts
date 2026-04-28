import { Inject, Injectable } from '@nestjs/common';
import { DictionariyResponseDto } from '../dto/response-dictionary.dto';
import { IDictionariesRepository } from '@/dictionaries/domain/repositories/dictionary.repository.interface';

@Injectable()
export class GetDictionariesUseCase {
  constructor(
    @Inject('IDictionariesRepository')
    private readonly dictionariesRepository: IDictionariesRepository,
  ) {}

  async execute(): Promise<DictionariyResponseDto> {
    const [regions, courtTypes, cassationDistricts, divisions, financialActivityTypes] =
      await Promise.all([
        this.dictionariesRepository.getRegions(),
        this.dictionariesRepository.getCourtTypes(),
        this.dictionariesRepository.getCassationDistricts(),
        this.dictionariesRepository.getDivisions(),
        this.dictionariesRepository.getFinancialActivityTypes(),
      ]);

    return {
      regions,
      courtTypes,
      cassationDistricts,
      divisions,
      financialActivityTypes,
    };
  }
}
