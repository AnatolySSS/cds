import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  execute(id: string) {
    return this.employeeRepo.delete(id);
  }
}
