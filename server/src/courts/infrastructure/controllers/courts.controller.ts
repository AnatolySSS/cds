import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { GetCourtsUseCase } from '../../application/use-cases/get-courts.use-case';
import { GetCourtUseCase } from '../../application/use-cases/get-court.use-case';
import { CreateCourtUseCase } from '../../application/use-cases/create-court.use-case';
import { BulkCreateCourtsUseCase } from '../../application/use-cases/bulk-create-courts.use-case';
import { UpdateCourtUseCase } from '../../application/use-cases/update-court.use-case';
import { DeleteCourtUseCase } from '../../application/use-cases/delete-court.use-case';
import { CreateCourtDto } from '../../application/dto/create-court.dto';
import { UpdateCourtDto } from '../../application/dto/update-court.dto';
import { BulkCreateCourtDto } from '../../application/dto/bulk-create-court.dto';
import { QueryParams } from '@/infrastructure/database/prisma/query-builder/prisma-query.engine';

@Controller('courts')
export class CourtsController {
  constructor(
    private readonly getCourts: GetCourtsUseCase,
    private readonly getCourt: GetCourtUseCase,
    private readonly createCourt: CreateCourtUseCase,
    private readonly updateCourt: UpdateCourtUseCase,
    private readonly deleteCourt: DeleteCourtUseCase,
    private readonly bulkCreateUseCase: BulkCreateCourtsUseCase,
  ) {}

  @Post('search') getAll(@Body() query: QueryParams) {
    return this.getCourts.execute(query);
  }
  @Get(':id') getOne(@Param('id') id: string) {
    return this.getCourt.execute(id);
  }
  @Post() create(@Body() dto: CreateCourtDto) {
    return this.createCourt.execute(dto);
  }
  @Post('bulk')
  async bulkCreate(@Body() dto: BulkCreateCourtDto) {
    return this.bulkCreateUseCase.execute(dto);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateCourtDto) {
    return this.updateCourt.execute(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.deleteCourt.execute(id);
  }
}
