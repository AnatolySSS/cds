import { Test, TestingModule } from '@nestjs/testing';
import { CourtsController } from '../../../../src/courts/infrastructure/controllers/courts.controller';
import { GetCourtsUseCase } from '../../../../src/courts/application/use-cases/get-courts.use-case';
import { GetCourtUseCase } from '../../../../src/courts/application/use-cases/get-court.use-case';
import { CreateCourtUseCase } from '../../../../src/courts/application/use-cases/create-court.use-case';
import { BulkCreateCourtsUseCase } from '../../../../src/courts/application/use-cases/bulk-create-courts.use-case';
import { UpdateCourtUseCase } from '../../../../src/courts/application/use-cases/update-court.use-case';
import { DeleteCourtUseCase } from '../../../../src/courts/application/use-cases/delete-court.use-case';
import { CreateCourtDto } from '../../../../src/courts/application/dto/create-court.dto';
import { UpdateCourtDto } from '../../../../src/courts/application/dto/update-court.dto';
import { BulkCreateCourtDto } from '../../../../src/courts/application/dto/bulk-create-court.dto';

describe('CourtsController', () => {
  let controller: CourtsController;

  // Создаем моки для всех UseCase
  const getCourtsMock = { execute: jest.fn() };
  const getCourtMock = { execute: jest.fn() };
  const createCourtMock = { execute: jest.fn() };
  const updateCourtMock = { execute: jest.fn() };
  const deleteCourtMock = { execute: jest.fn() };
  const bulkCreateMock = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtsController],
      providers: [
        { provide: GetCourtsUseCase, useValue: getCourtsMock },
        { provide: GetCourtUseCase, useValue: getCourtMock },
        { provide: CreateCourtUseCase, useValue: createCourtMock },
        { provide: UpdateCourtUseCase, useValue: updateCourtMock },
        { provide: DeleteCourtUseCase, useValue: deleteCourtMock },
        { provide: BulkCreateCourtsUseCase, useValue: bulkCreateMock },
      ],
    }).compile();

    controller = module.get<CourtsController>(CourtsController);

    // Сбрасываем вызовы перед каждым тестом
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll should call getCourtsUseCase.execute', async () => {
    const result = [{ id: '1', name: 'Court A' }];
    getCourtsMock.execute.mockResolvedValue(result);

    expect(await controller.getAll()).toEqual(result);
    expect(getCourtsMock.execute).toHaveBeenCalledTimes(1);
  });

  it('getOne should call getCourtUseCase.execute with id', async () => {
    const result = { id: '1', name: 'Court A' };
    getCourtMock.execute.mockResolvedValue(result);

    expect(await controller.getOne('1')).toEqual(result);
    expect(getCourtMock.execute).toHaveBeenCalledWith('1');
  });

  it('create should call createCourtUseCase.execute with DTO', async () => {
    const dto: CreateCourtDto = {
      name: 'Court A',
      address: 'Addr',
      regionCode: 'R1',
      cassRegionCode: 'C1',
      typeCode: 'T1',
      serverNumbers: 5,
    };
    const result = { id: '1', ...dto };
    createCourtMock.execute.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(createCourtMock.execute).toHaveBeenCalledWith(dto);
  });

  it('bulkCreate should call bulkCreateUseCase.execute with DTO', async () => {
    const dto: BulkCreateCourtDto = { courts: [] };
    const result = { count: 0 };
    bulkCreateMock.execute.mockResolvedValue(result);

    expect(await controller.bulkCreate(dto)).toEqual(result);
    expect(bulkCreateMock.execute).toHaveBeenCalledWith(dto);
  });

  it('update should call updateCourtUseCase.execute with id and DTO', async () => {
    const dto: UpdateCourtDto = { name: 'Updated' };
    const result = { id: '1', ...dto };
    updateCourtMock.execute.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toEqual(result);
    expect(updateCourtMock.execute).toHaveBeenCalledWith('1', dto);
  });

  it('remove should call deleteCourtUseCase.execute with id', async () => {
    deleteCourtMock.execute.mockResolvedValue(undefined);

    expect(await controller.remove('1')).toEqual(undefined);
    expect(deleteCourtMock.execute).toHaveBeenCalledWith('1');
  });
});
