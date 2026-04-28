import { Type } from 'class-transformer';
import { ValidateNested, ArrayMinSize, IsArray } from 'class-validator';
import { CreateNaturalPersonDto } from './create-natural-person.dto';

export class BulkCreateNaturalPersonDto {
  @ValidateNested({ each: true })
  @Type(() => CreateNaturalPersonDto)
  @IsArray()
  @ArrayMinSize(1) // хотя бы один объект
  NaturalPersons!: CreateNaturalPersonDto[];
}
