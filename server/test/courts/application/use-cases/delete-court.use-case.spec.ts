// test/courts/application/use-cases/delete-court.use-case.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCourtUseCase } from '../../../../src/courts/application/use-cases/delete-court.use-case';
import { ICourtRepository } from '../../../../src/courts/domain/repositories/court.repository.interface';

describe('DeleteCourtUseCase', () => {
  let useCase: DeleteCourtUseCase;
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
        DeleteCourtUseCase,
        { provide: 'ICourtRepository', useValue: courtRepoMock },
      ],
    }).compile();

    useCase = module.get<DeleteCourtUseCase>(DeleteCourtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('execute should call courtRepo.delete with id', async () => {
    courtRepoMock.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('1');

    expect(courtRepoMock.delete).toHaveBeenCalledWith('1');
    expect(result).toBeUndefined();
  });
});
