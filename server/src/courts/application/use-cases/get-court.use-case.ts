import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';
import { Court } from '../../domain/entities/court.entity';

@Injectable()
export class GetCourtUseCase {
  constructor(
    @Inject('ICourtRepository') private readonly courtRepo: ICourtRepository,
  ) {}

  async execute(id: string): Promise<Court> {
    const court = await this.courtRepo.findById(id);
    if (!court) throw new NotFoundException(`Court ${id} not found`);
    return court;
  }
}
