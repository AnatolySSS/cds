import { Inject, Injectable } from '@nestjs/common';
import { INaturalPersonRepository } from '@/natural-persons/domain/repositories/natural-person.repository.interface';
import { NaturalPerson } from '@/natural-persons/domain/entities/natural-person.entity';

@Injectable()
export class GetNaturalPersonsUseCase {
  constructor(
    @Inject('INaturalPersonRepository')
    private readonly NaturalPersonRepo: INaturalPersonRepository,
  ) {}

  execute(): Promise<NaturalPerson[]> {
    return this.NaturalPersonRepo.findAll();
  }
}
