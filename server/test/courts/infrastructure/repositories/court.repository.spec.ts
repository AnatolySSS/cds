import { Test, TestingModule } from '@nestjs/testing';
import { CourtRepository } from '../../../../src/courts/infrastructure/repositories/court.repository';
import { PrismaService } from '../../../../src/infrastructure/database/prisma/prisma.service';
import { CreateCourtDto } from '../../../../src/courts/application/dto/create-court.dto';
import { UpdateCourtDto } from '../../../../src/courts/application/dto/update-court.dto';
import { Court } from '../../../../src/courts/domain/entities/court.entity';

describe('CourtRepository', () => {
  let repo: CourtRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourtRepository,
        {
          provide: PrismaService,
          useValue: {
            court: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              createMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repo = module.get<CourtRepository>(CourtRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should call prisma.court.findMany on findAll', async () => {
    const mockCourts: Court[] = [
      new Court('1', 'Court A', 'Addr A', null, null, null, 'R1', 'C1', 'T1', 5),
      new Court('2', 'Court B', 'Addr B', null, null, null, 'R2', 'C2', 'T2', 2),
    ];
    (prisma.court.findMany as jest.Mock).mockResolvedValue(mockCourts);

    const result = await repo.findAll();

    expect(prisma.court.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
    expect(result).toEqual(mockCourts);
  });

  it('should call prisma.court.findUnique on findById', async () => {
    const mockCourt = new Court('1', 'Court A', 'Addr A', null, null, null, 'R1', 'C1', 'T1', 5);
    (prisma.court.findUnique as jest.Mock).mockResolvedValue(mockCourt);

    const result = await repo.findById('1');

    expect(prisma.court.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(mockCourt);
  });

  it('should call prisma.court.create on create', async () => {
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
      dto.phone ?? null,
      dto.email ?? null,
      dto.site ?? null,
      dto.regionCode ?? null,
      dto.cassRegionCode ?? null,
      dto.typeCode ?? null,
      dto.serverNumbers ?? null,
    );
    (prisma.court.create as jest.Mock).mockResolvedValue(mockCourt);

    const result = await repo.create(dto);

    expect(prisma.court.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(mockCourt);
  });

  it('should call prisma.court.createMany on createBulk', async () => {
    const data: CreateCourtDto[] = [
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
    ];
    (prisma.court.createMany as jest.Mock).mockResolvedValue({ count: 2 });

    const result = await repo.createBulk(data);

    expect(prisma.court.createMany).toHaveBeenCalledWith({
      data,
      skipDuplicates: true,
    });
    expect(result).toEqual({ count: 2 });
  });

  it('should call prisma.court.update on update', async () => {
    const dto: UpdateCourtDto = {
      name: 'Court A Updated',
      address: 'Addr A',
      regionCode: 'R1',
      cassRegionCode: 'C1',
      typeCode: 'T1',
      serverNumbers: 5,
    };
    const mockCourt = new Court(
      '1',
      dto.name!,
      dto.address ?? null,
      dto.phone ?? null,
      dto.email ?? null,
      dto.site ?? null,
      dto.regionCode ?? null,
      dto.cassRegionCode ?? null,
      dto.typeCode ?? null,
      dto.serverNumbers ?? null,
    );
    (prisma.court.update as jest.Mock).mockResolvedValue(mockCourt);

    const result = await repo.update('1', dto);

    expect(prisma.court.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: dto,
    });
    expect(result).toEqual(mockCourt);
  });

  it('should call prisma.court.delete on delete', async () => {
    (prisma.court.delete as jest.Mock).mockResolvedValue(undefined);

    await repo.delete('1');

    expect(prisma.court.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
