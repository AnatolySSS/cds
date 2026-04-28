import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { Employee } from '@/employees/domain/entities/employee.entity';

@Injectable()
export class GetAllEmployeesUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  execute(): Promise<Employee[]> {
    return this.employeeRepo.findAll();
  }
}
