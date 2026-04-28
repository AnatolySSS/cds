import { Inject, Injectable } from '@nestjs/common';
import { INaturalPersonRepository } from '@/natural-persons/domain/repositories/natural-person.repository.interface';
import { CreateNaturalPersonDto } from '../dto/create-natural-person.dto';
import { NaturalPerson } from '@/natural-persons/domain/entities/natural-person.entity';

@Injectable()
export class CreateNaturalPersonUseCase {
  constructor(
    @Inject('INaturalPersonRepository')
    private readonly NaturalPersonRepo: INaturalPersonRepository,
  ) {}

  execute(dto: CreateNaturalPersonDto): Promise<NaturalPerson> {
    return this.NaturalPersonRepo.create(dto);
  }
}
