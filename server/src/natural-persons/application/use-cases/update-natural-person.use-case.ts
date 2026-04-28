import { Inject, Injectable } from '@nestjs/common';
import { INaturalPersonRepository } from '@/natural-persons/domain/repositories/natural-person.repository.interface';
import { UpdateNaturalPersonDto } from '../dto/update-natural-person.dto';

@Injectable()
export class UpdateNaturalPersonUseCase {
  constructor(
    @Inject('INaturalPersonRepository')
    private readonly NaturalPersonRepo: INaturalPersonRepository,
  ) {}

  execute(id: string, dto: UpdateNaturalPersonDto) {
    return this.NaturalPersonRepo.update(id, dto);
  }
}
