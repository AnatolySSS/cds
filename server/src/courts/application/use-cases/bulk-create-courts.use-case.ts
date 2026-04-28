// server/src/courts/application/use-cases/bulk-create-courts.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';
import { BulkCreateCourtDto } from '../dto/bulk-create-court.dto';

@Injectable()
export class BulkCreateCourtsUseCase {
  constructor(
    @Inject('ICourtRepository')
    private readonly courtRepo: ICourtRepository,
  ) {}

  async execute(dto: BulkCreateCourtDto): Promise<{ count: number }> {
    return this.courtRepo.createBulk(dto.courts);
  }
}
