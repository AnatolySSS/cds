import { Inject, Injectable } from '@nestjs/common';
import { INaturalPersonRepository } from '@/natural-persons/domain/repositories/natural-person.repository.interface';

@Injectable()
export class DeleteNaturalPersonUseCase {
  constructor(
    @Inject('INaturalPersonRepository')
    private readonly NaturalPersonRepo: INaturalPersonRepository,
  ) {}

  execute(id: string) {
    return this.NaturalPersonRepo.delete(id);
  }
}
