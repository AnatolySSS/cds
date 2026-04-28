import { CreateNaturalPersonDto } from '@/natural-persons/application/dto/create-natural-person.dto';
import { NaturalPerson } from '../entities/natural-person.entity';
import { UpdateNaturalPersonDto } from '@/natural-persons/application/dto/update-natural-person.dto';

export interface INaturalPersonRepository {
  findAll(): Promise<NaturalPerson[]>;
  findById(id: string): Promise<NaturalPerson | null>;
  create(data: CreateNaturalPersonDto): Promise<NaturalPerson>;
  createBulk(data: CreateNaturalPersonDto[]): Promise<{ count: number }>;
  update(id: string, data: UpdateNaturalPersonDto): Promise<NaturalPerson>;
  delete(id: string): Promise<void>;
}
