// test/courts/application/use-cases/update-court.use-case.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCourtUseCase } from '../../../../src/courts/application/use-cases/update-court.use-case';
import { ICourtRepository } from '../../../../src/courts/domain/repositories/court.repository.interface';
import { UpdateCourtDto } from '../../../../src/courts/application/dto/update-court.dto';
import { Court } from '../../../../src/courts/domain/entities/court.entity';

describe('UpdateCourtUseCase', () => {
  let useCase: UpdateCourtUseCase;
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
      providers: [UpdateCourtUseCase, { provide: 'ICourtRepository', useValue: courtRepoMock }],
    }).compile();

    useCase = module.get<UpdateCourtUseCase>(UpdateCourtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('execute should call courtRepo.update with id and dto', async () => {
    const id = '1';
    const dto: UpdateCourtDto = { name: 'Updated Court' };
    const updatedCourt = new Court(
      id,
      dto.name || '', // если name undefined, поставим пустую строку
      dto.address || null,
      dto.phone || null,
      dto.email || null,
      dto.site || null,
      dto.regionCode || null,
      dto.cassRegionCode || null,
      dto.typeCode || null,
      dto.serverNumbers ?? null, // для number лучше использовать nullish coalescing
    );
    courtRepoMock.update.mockResolvedValue(updatedCourt);

    const result = await useCase.execute(id, dto);

    expect(courtRepoMock.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updatedCourt);
  });
});
