import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { GetEmployeesUseCase } from '../../application/use-cases/get-employees.use-case';
import { GetEmployeeUseCase } from '../../application/use-cases/get-employee.use-case';
import { CreateEmployeeUseCase } from '../../application/use-cases/create-employee.use-case';
import { BulkCreateEmployeesUseCase } from '../../application/use-cases/bulk-create-employees.use-case';
import { UpdateEmployeeUseCase } from '../../application/use-cases/update-employee.use-case';
import { DeleteEmployeeUseCase } from '../../application/use-cases/delete-employee.use-case';
import { CreateEmployeeDto } from '../../application/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../application/dto/update-employee.dto';
import { BulkCreateEmployeeDto } from '../../application/dto/bulk-create-employee.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';
import { GetAllEmployeesUseCase } from '@/employees/application/use-cases/get-all-employees.use-case';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly getEmployees: GetEmployeesUseCase,
    private readonly getAllEmployees: GetAllEmployeesUseCase,
    private readonly getEmployee: GetEmployeeUseCase,
    private readonly createEmployee: CreateEmployeeUseCase,
    private readonly updateEmployee: UpdateEmployeeUseCase,
    private readonly deleteEmployee: DeleteEmployeeUseCase,
    private readonly bulkCreateUseCase: BulkCreateEmployeesUseCase,
  ) {}

  @Post('search') getMany(@Body() query: QueryParams) {
    return this.getEmployees.execute(query);
  }
  @Get('all') getAll() {
    return this.getAllEmployees.execute();
  }
  @Get(':id') getOne(@Param('id') id: string) {
    return this.getEmployee.execute(id);
  }
  @Post() create(@Body() dto: CreateEmployeeDto) {
    return this.createEmployee.execute(dto);
  }
  @Post('bulk')
  async bulkCreate(@Body() dto: BulkCreateEmployeeDto) {
    return this.bulkCreateUseCase.execute(dto);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.updateEmployee.execute(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.deleteEmployee.execute(id);
  }
}
