import { Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Employee } from '../../domain/entities/employee.entity';
import { CreateEmployeeDto } from '../../application/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../application/dto/update-employee.dto';
import { EmployeeMapper } from '../mappers/employee.mapper';
import {
  QueryEngine,
  QueryParams,
} from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';
import { employeeQueryConfig } from '../config/employee-query.config';
import { GetEmployeesResult } from '@/employees/application/dto/get-employees-result.dto';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(query: QueryParams): Promise<GetEmployeesResult> {
    const engine = new QueryEngine(query, employeeQueryConfig);
    const qb = engine.build();

    const [items, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        ...qb,
        include: {
          division: true,
        },
        orderBy: {
          full_name: 'asc',
        },
      }),
      this.prisma.employee.count({
        where: qb.where,
      }),
    ]);

    return {
      items: EmployeeMapper.toDomainList(items),
      total,
    };
  }

  async findAll(): Promise<Employee[]> {
    const results = await this.prisma.employee.findMany({
      include: {
        division: true,
      },
      orderBy: {
        full_name: 'asc',
      },
    });
    return EmployeeMapper.toDomainList(results);
  }

  async findById(id: string): Promise<Employee | null> {
    const result = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        division: true,
      },
    });
    return result ? EmployeeMapper.toDomain(result) : null;
  }

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const divisions = await this.prisma.division.findMany();

    const maps = {
      divisionMap: new Map(divisions.map((d) => [d.code, d.id])),
    };

    const input = EmployeeMapper.toCreateInput(data, maps);

    const result = await this.prisma.employee.create({
      include: {
        division: true,
      },
      data: input,
    });

    return EmployeeMapper.toDomain(result);
  }

  async createBulk(data: CreateEmployeeDto[]): Promise<{ count: number }> {
    const divisions = await this.prisma.division.findMany();

    const maps = {
      divisionMap: new Map(divisions.map((d) => [d.code, d.id])),
    };

    const prepared = EmployeeMapper.toPersistence(data, maps);

    const result = await this.prisma.employee.createMany({
      data: prepared,
      skipDuplicates: true,
    });

    return result;
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const divisions = await this.prisma.division.findMany();

    const maps = {
      divisionMap: new Map(divisions.map((d) => [d.code, d.id])),
    };

    const input = EmployeeMapper.toUpdateInput(data, maps);

    const result = await this.prisma.employee.update({
      where: { id },
      include: {
        division: true,
      },
      data: input,
    });

    return EmployeeMapper.toDomain(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id } });
  }
}
