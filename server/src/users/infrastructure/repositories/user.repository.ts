import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { CreateUserData } from 'src/users/domain/types/create-user.data';
import { UserMapper } from '../mappers/user.mapper';
import { ResponseUserDto } from '@/users/application/dto/response-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ResponseUserDto[]> {
    const result = await this.prisma.user.findMany({
      include: {
        employee: {
          include: {
            division: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return UserMapper.toResponseList(result);
  }

  async findById(id: string): Promise<User | null> {
    const model = await this.prisma.user.findUnique({
      where: { id },
      include: {
        employee: {
          include: {
            division: true,
          },
        },
      },
    });

    return model ? UserMapper.toDomain(model) : null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const model = await this.prisma.user.findFirst({
      where: {
        employee: {
          login: login,
        },
      },
      include: {
        employee: {
          include: {
            division: true,
          },
        },
      },
    });

    return model ? UserMapper.toDomain(model) : null;
  }

  async create(data: CreateUserData): Promise<ResponseUserDto> {
    const model = await this.prisma.user.create({
      data,
      include: {
        employee: {
          include: {
            division: true,
          },
        },
      },
    });

    return UserMapper.toResponse(model);
  }

  async update(id: string, data: UpdateUserDto): Promise<ResponseUserDto> {
    const model = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        employee: {
          include: {
            division: true,
          },
        },
      },
    });

    return UserMapper.toResponse(model);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async updateRefreshToken(userId: string, refreshTokenHash: string | null): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  }
}
