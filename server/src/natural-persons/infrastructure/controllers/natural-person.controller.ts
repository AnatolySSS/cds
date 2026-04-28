import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { GetNaturalPersonsUseCase } from '../../application/use-cases/get-natural-persons.use-case';
import { GetNaturalPersonUseCase } from '../../application/use-cases/get-natural-person.use-case';
import { CreateNaturalPersonUseCase } from '../../application/use-cases/create-natural-person.use-case';
import { BulkCreateNaturalPersonsUseCase } from '../../application/use-cases/bulk-create-natural-person.use-case';
import { UpdateNaturalPersonUseCase } from '../../application/use-cases/update-natural-person.use-case';
import { DeleteNaturalPersonUseCase } from '../../application/use-cases/delete-natural-person.use-case';
import { CreateNaturalPersonDto } from '../../application/dto/create-natural-person.dto';
import { UpdateNaturalPersonDto } from '../../application/dto/update-natural-person.dto';
import { BulkCreateNaturalPersonDto } from '../../application/dto/bulk-create-natural-person.dto';

@Controller('NaturalPersons')
export class NaturalPersonsController {
  constructor(
    private readonly getNaturalPersons: GetNaturalPersonsUseCase,
    private readonly getNaturalPerson: GetNaturalPersonUseCase,
    private readonly createNaturalPerson: CreateNaturalPersonUseCase,
    private readonly updateNaturalPerson: UpdateNaturalPersonUseCase,
    private readonly deleteNaturalPerson: DeleteNaturalPersonUseCase,
    private readonly bulkCreateUseCase: BulkCreateNaturalPersonsUseCase,
  ) {}

  @Get() getAll() {
    return this.getNaturalPersons.execute();
  }
  @Get(':id') getOne(@Param('id') id: string) {
    return this.getNaturalPerson.execute(id);
  }
  @Post() create(@Body() dto: CreateNaturalPersonDto) {
    return this.createNaturalPerson.execute(dto);
  }
  @Post('bulk')
  async bulkCreate(@Body() dto: BulkCreateNaturalPersonDto) {
    return this.bulkCreateUseCase.execute(dto);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateNaturalPersonDto) {
    return this.updateNaturalPerson.execute(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.deleteNaturalPerson.execute(id);
  }
}
