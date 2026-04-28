import { Type } from 'class-transformer';
import { ValidateNested, ArrayMinSize, IsArray } from 'class-validator';
import { CreateCourtDto } from './create-court.dto';

export class BulkCreateCourtDto {
  @ValidateNested({ each: true })
  @Type(() => CreateCourtDto)
  @IsArray()
  @ArrayMinSize(1) // хотя бы один объект
  courts!: CreateCourtDto[];
}
