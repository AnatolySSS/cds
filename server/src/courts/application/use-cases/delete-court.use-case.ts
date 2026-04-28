import { Inject, Injectable } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';

@Injectable()
export class DeleteCourtUseCase {
  constructor(
    @Inject('ICourtRepository') private readonly courtRepo: ICourtRepository,
  ) {}

  execute(id: string) {
    return this.courtRepo.delete(id);
  }
}
