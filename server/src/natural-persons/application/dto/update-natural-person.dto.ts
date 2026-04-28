import { PartialType } from '@nestjs/mapped-types';
import { CreateNaturalPersonDto } from './create-natural-person.dto';

export class UpdateNaturalPersonDto extends PartialType(CreateNaturalPersonDto) {}
