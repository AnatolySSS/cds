// test/courts/application/use-cases/bulk-create-courts.use-case.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BulkCreateCourtsUseCase } from '../../../../src/courts/application/use-cases/bulk-create-courts.use-case';
import { ICourtRepository } from '../../../../src/courts/domain/repositories/court.repository.interface';
import { BulkCreateCourtDto } from '../../../../src/courts/application/dto/bulk-create-court.dto';

describe('BulkCreateCourtsUseCase', () => {
  let useCase: BulkCreateCourtsUseCase;
  let courtRepoMock: jest.Mocked<ICourtRepository>;

  beforeEach(async () => {
    courtRepoMock = {
      createBulk: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ICourtRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BulkCreateCourtsUseCase,
        { provide: 'ICourtRepository', useValue: courtRepoMock },
      ],
    }).compile();

    useCase = module.get<BulkCreateCourtsUseCase>(BulkCreateCourtsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call courtRepo.createBulk with dto.courts and return result', async () => {
    const dto: BulkCreateCourtDto = {
      courts: [
        {
          name: 'Court A',
          address: 'Addr A',
          regionCode: 'R1',
          cassRegionCode: 'C1',
          typeCode: 'T1',
          serverNumbers: 5,
        },
        {
          name: 'Court B',
          address: 'Addr B',
          regionCode: 'R2',
          cassRegionCode: 'C2',
          typeCode: 'T2',
          serverNumbers: 2,
        },
      ],
    };

    const result = { count: 2 };
    courtRepoMock.createBulk.mockResolvedValue(result);

    await expect(useCase.execute(dto)).resolves.toEqual(result);
    expect(courtRepoMock.createBulk).toHaveBeenCalledWith(dto.courts);
  });
});
