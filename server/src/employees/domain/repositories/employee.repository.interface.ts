import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';
import { CreateEmployeeDto } from '../../application/dto/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { GetEmployeesResult } from '@/employees/application/dto/get-employees-result.dto';
import { UpdateEmployeeDto } from '@/employees/application/dto/update-employee.dto';

export interface IEmployeeRepository {
  findMany(query: QueryParams): Promise<GetEmployeesResult>;
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
  create(employeeDto: CreateEmployeeDto): Promise<Employee>;
  createBulk(data: CreateEmployeeDto[]): Promise<{ count: number }>;
  update(id: string, employeeDto: UpdateEmployeeDto): Promise<Employee>;
  delete(id: string): Promise<void>;
}
