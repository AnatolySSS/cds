import { Inject, Injectable } from '@nestjs/common';
import { INaturalPersonRepository } from '@/natural-persons/domain/repositories/natural-person.repository.interface';
import { BulkCreateNaturalPersonDto } from '../dto/bulk-create-natural-person.dto';

@Injectable()
export class BulkCreateNaturalPersonsUseCase {
  constructor(
    @Inject('INaturalPersonRepository')
    private readonly NaturalPersonRepo: INaturalPersonRepository,
  ) {}

  async execute(dto: BulkCreateNaturalPersonDto): Promise<{ count: number }> {
    return this.NaturalPersonRepo.createBulk(dto.NaturalPersons);
  }
}
