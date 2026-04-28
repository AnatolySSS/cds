// test/courts/application/use-cases/get-courts.use-case.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { GetCourtsUseCase } from '../../../../src/courts/application/use-cases/get-courts.use-case';
import { ICourtRepository } from '../../../../src/courts/domain/repositories/court.repository.interface';
import { Court } from '../../../../src/courts/domain/entities/court.entity';

describe('GetCourtsUseCase', () => {
  let useCase: GetCourtsUseCase;
  let courtRepoMock: jest.Mocked<ICourtRepository>;

  beforeEach(async () => {
    courtRepoMock = {
      create: jest.fn(),
      createBulk: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ICourtRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCourtsUseCase,
        { provide: 'ICourtRepository', useValue: courtRepoMock },
      ],
    }).compile();

    useCase = module.get<GetCourtsUseCase>(GetCourtsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('execute should return array of courts', async () => {
    const mockCourts = [
      new Court(
        '1',
        'Court A',
        'Addr A',
        null,
        null,
        null,
        'R1',
        'C1',
        'T1',
        5,
      ),
      new Court(
        '2',
        'Court B',
        'Addr B',
        null,
        null,
        null,
        'R2',
        'C2',
        'T2',
        3,
      ),
    ];
    courtRepoMock.findAll.mockResolvedValue(mockCourts);

    const result = await useCase.execute();

    expect(courtRepoMock.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCourts);
  });
});
