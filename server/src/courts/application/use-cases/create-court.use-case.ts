import { Inject, Injectable } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';
import { CreateCourtDto } from '../dto/create-court.dto';
import { Court } from '../../domain/entities/court.entity';

@Injectable()
export class CreateCourtUseCase {
  constructor(
    @Inject('ICourtRepository') private readonly courtRepo: ICourtRepository,
  ) {}

  execute(dto: CreateCourtDto): Promise<Court> {
    return this.courtRepo.create(dto);
  }
}
