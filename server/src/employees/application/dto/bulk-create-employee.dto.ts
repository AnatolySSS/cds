import { Type } from 'class-transformer';
import { ValidateNested, ArrayMinSize, IsArray } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class BulkCreateEmployeeDto {
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeDto)
  @IsArray()
  @ArrayMinSize(1) // хотя бы один объект
  employees!: CreateEmployeeDto[];
}
