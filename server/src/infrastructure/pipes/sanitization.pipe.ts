import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class SanitizationPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    return this.sanitizeObject(value);
  }

  private sanitizeObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.sanitizeObject(v));
    }

    const result: any = {};

    for (const key in obj) {
      const value = obj[key];

      result[key] = this.sanitizeValue(key, value);
    }

    return result;
  }

  private sanitizeValue(key: string, value: any) {
    if (typeof value === 'string') {
      const trimmed = value.trim();

      // пустые строки → null
      if (trimmed === '') return null;

      // специальные поля
      if (key === 'inn' || key === 'ogrn') {
        return trimmed.replace(/\D/g, '');
      }

      return trimmed;
    }

    return value;
  }
}
