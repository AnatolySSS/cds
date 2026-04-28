import { Module } from '@nestjs/common';

import { EmployeeRepository } from './infrastructure/repositories/employee.repository';
import { EmployeesController } from './infrastructure/controllers/employee.controller';

import { GetEmployeesUseCase } from './application/use-cases/get-employees.use-case';
import { GetEmployeeUseCase } from './application/use-cases/get-employee.use-case';
import { CreateEmployeeUseCase } from './application/use-cases/create-employee.use-case';
import { BulkCreateEmployeesUseCase } from './application/use-cases/bulk-create-employees.use-case';
import { UpdateEmployeeUseCase } from './application/use-cases/update-employee.use-case';
import { DeleteEmployeeUseCase } from './application/use-cases/delete-employee.use-case';
import { GetAllEmployeesUseCase } from './application/use-cases/get-all-employees.use-case';

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeeRepository,
    GetEmployeesUseCase,
    GetAllEmployeesUseCase,
    GetEmployeeUseCase,
    CreateEmployeeUseCase,
    BulkCreateEmployeesUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    { provide: 'IEmployeeRepository', useClass: EmployeeRepository },
  ],
})
export class EmployeesModule {}
