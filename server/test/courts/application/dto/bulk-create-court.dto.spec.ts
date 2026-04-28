// test/courts/application/dto/bulk-create-court.dto.spec.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BulkCreateCourtDto } from '../../../../src/courts/application/dto/bulk-create-court.dto';
import { CreateCourtDto } from '../../../../src/courts/application/dto/create-court.dto';

describe('BulkCreateCourtDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = plainToInstance(BulkCreateCourtDto, {
      courts: [
        {
          name: 'Court A',
          address: 'Addr A',
          region: 'R1',
          cassRegion: 'C1',
          type: 'T1',
          serverNumbers: 5,
        },
        {
          name: 'Court B',
          address: 'Addr B',
          region: 'R2',
          cassRegion: 'C2',
          type: 'T2',
          serverNumbers: 2,
        },
      ],
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if courts array is empty', async () => {
    const dto = plainToInstance(BulkCreateCourtDto, { courts: [] });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('arrayMinSize');
  });

  it('should fail validation if a court inside array is invalid', async () => {
    const dto = plainToInstance(BulkCreateCourtDto, {
      courts: [
        {
          name: '', // name is required
          address: 'Addr A',
          regionCode: 'R1',
          cassRegionCode: 'C1',
          typeCode: 'T1',
          serverNumbers: 5,
        } as Partial<CreateCourtDto>,
      ],
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

    // Первый элемент массива courts
    const firstCourtErrors = errors[0].children![0].children!;
    expect(firstCourtErrors.length).toBeGreaterThan(0);

    // Проверяем, что поле name имеет constraint isNotEmpty
    const nameError = firstCourtErrors.find((e) => e.property === 'name');
    expect(nameError).toBeDefined();
    expect(nameError!.constraints).toHaveProperty('isNotEmpty');
  });
});
