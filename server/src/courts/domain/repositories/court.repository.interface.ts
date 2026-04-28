import { UpdateCourtDto } from '@/courts/application/dto/update-court.dto';
import { CreateCourtDto } from '../../application/dto/create-court.dto';
import { Court } from '../entities/court.entity';
import { GetCourtsResult } from '@/courts/application/dto/get-courts-result.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

export interface ICourtRepository {
  findAll(query: QueryParams): Promise<GetCourtsResult>;
  findById(id: string): Promise<Court | null>;
  create(courtDto: CreateCourtDto): Promise<Court>;
  createBulk(data: CreateCourtDto[]): Promise<{ count: number }>;
  update(id: string, courtDto: UpdateCourtDto): Promise<Court>;
  delete(id: string): Promise<void>;
}
