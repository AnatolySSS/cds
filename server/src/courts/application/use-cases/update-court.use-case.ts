import { Inject, Injectable } from '@nestjs/common';
import { ICourtRepository } from '../../domain/repositories/court.repository.interface';
import { UpdateCourtDto } from '../dto/update-court.dto';

@Injectable()
export class UpdateCourtUseCase {
  constructor(
    @Inject('ICourtRepository') private readonly courtRepo: ICourtRepository,
  ) {}

  execute(id: string, dto: UpdateCourtDto) {
    return this.courtRepo.update(id, dto);
  }
}
