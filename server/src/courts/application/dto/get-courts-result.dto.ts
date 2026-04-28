import { Court } from '@/courts/domain/entities/court.entity';

export class GetCourtsResult {
  items!: Court[];
  total!: number;
}
