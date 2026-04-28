import { PrismaService } from '../../../../src/infrastructure/database/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    // Мокаем только методы $connect и $disconnect на prototype
    jest.spyOn(PrismaClient.prototype, '$connect').mockResolvedValue(undefined);
    jest.spyOn(PrismaClient.prototype, '$disconnect').mockResolvedValue(undefined);

    service = new PrismaService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect on onModuleInit', async () => {
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalled();
  });

  it('should call $disconnect on onModuleDestroy', async () => {
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalled();
  });
});
