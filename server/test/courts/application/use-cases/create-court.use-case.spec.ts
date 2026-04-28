// test/courts/application/use-cases/create-court.use-case.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourtUseCase } from '../../../../src/courts/application/use-cases/create-court.use-case';
import { ICourtRepository } from '../../../../src/courts/domain/repositories/court.repository.interface';
import { CreateCourtDto } from '../../../../src/courts/application/dto/create-court.dto';
import { Court } from '../../../../src/courts/domain/entities/court.entity';

describe('CreateCourtUseCase', () => {
  let useCase: CreateCourtUseCase;
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
      providers: [CreateCourtUseCase, { provide: 'ICourtRepository', useValue: courtRepoMock }],
    }).compile();

    useCase = module.get<CreateCourtUseCase>(CreateCourtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('execute should call courtRepo.create with dto and return Court', async () => {
    const dto: CreateCourtDto = {
      name: 'Court A',
      address: 'Addr A',
      regionCode: 'R1',
      cassRegionCode: 'C1',
      typeCode: 'T1',
      serverNumbers: 5,
    };

    const mockCourt = new Court(
      '1',
      dto.name,
      dto.address ?? null,
      null,
      null,
      null,
      dto.regionCode,
      dto.cassRegionCode,
      dto.typeCode,
      dto.serverNumbers,
    );

    courtRepoMock.create.mockResolvedValue(mockCourt);

    const result = await useCase.execute(dto);

    expect(courtRepoMock.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockCourt);
  });
});
