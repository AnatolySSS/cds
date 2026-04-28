import { Inject, Injectable } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';
import { GetCourtsResult } from '../dto/get-courts-result.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

@Injectable()
export class GetCourtsUseCase {
  constructor(@Inject('ICourtRepository') private readonly courtRepo: ICourtRepository) {}

  execute(query: QueryParams): Promise<GetCourtsResult> {
    return this.courtRepo.findAll(query);
  }
}
