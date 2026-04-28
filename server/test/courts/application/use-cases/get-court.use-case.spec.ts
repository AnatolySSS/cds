// test/courts/application/use-cases/get-court.use-case.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { GetCourtUseCase } from '../../../../src/courts/application/use-cases/get-court.use-case';
import { ICourtRepository } from '../../../../src/courts/domain/repositories/court.repository.interface';
import { Court } from '../../../../src/courts/domain/entities/court.entity';
import { NotFoundException } from '@nestjs/common';

describe('GetCourtUseCase', () => {
  let useCase: GetCourtUseCase;
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
        GetCourtUseCase,
        { provide: 'ICourtRepository', useValue: courtRepoMock },
      ],
    }).compile();

    useCase = module.get<GetCourtUseCase>(GetCourtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('execute should return a court if found', async () => {
    const mockCourt = new Court(
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
    );
    courtRepoMock.findById.mockResolvedValue(mockCourt);

    const result = await useCase.execute('1');

    expect(courtRepoMock.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockCourt);
  });

  it('execute should throw NotFoundException if court not found', async () => {
    courtRepoMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('2')).rejects.toThrow(
      new NotFoundException('Court 2 not found'),
    );
    expect(courtRepoMock.findById).toHaveBeenCalledWith('2');
  });
});
