import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { BulkCreateEmployeeDto } from '../dto/bulk-create-employee.dto';

@Injectable()
export class BulkCreateEmployeesUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  async execute(dto: BulkCreateEmployeeDto): Promise<{ count: number }> {
    return this.employeeRepo.createBulk(dto.employees);
  }
}
