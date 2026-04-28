import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  execute(id: string, dto: UpdateEmployeeDto) {
    return this.employeeRepo.update(id, dto);
  }
}
