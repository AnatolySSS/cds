import { Employee } from '@/employees/domain/entities/employee.entity';

export class GetEmployeesResult {
  items!: Employee[];
  total!: number;
}
