import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INaturalPersonRepository } from '@/natural-persons/domain/repositories/natural-person.repository.interface';
import { NaturalPerson } from '@/natural-persons/domain/entities/natural-person.entity';

@Injectable()
export class GetNaturalPersonUseCase {
  constructor(
    @Inject('INaturalPersonRepository')
    private readonly NaturalPersonRepo: INaturalPersonRepository,
  ) {}

  async execute(id: string): Promise<NaturalPerson> {
    const NaturalPerson = await this.NaturalPersonRepo.findById(id);
    if (!NaturalPerson) throw new NotFoundException(`NaturalPerson ${id} not found`);
    return NaturalPerson;
  }
}
