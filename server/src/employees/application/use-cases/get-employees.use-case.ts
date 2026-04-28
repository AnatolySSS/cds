import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { GetEmployeesResult } from '../dto/get-employees-result.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

@Injectable()
export class GetEmployeesUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  execute(query: QueryParams): Promise<GetEmployeesResult> {
    return this.employeeRepo.findMany(query);
  }
}
