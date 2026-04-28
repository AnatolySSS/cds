import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../../domain/entities/employee.entity';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  execute(dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepo.create(dto);
  }
}
