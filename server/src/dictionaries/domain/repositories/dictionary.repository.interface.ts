import { DictionaryItem } from '@/dictionaries/application/dto/response-dictionary.dto';

export interface IDictionariesRepository {
  getRegions(): Promise<DictionaryItem[]>;
  getCourtTypes(): Promise<DictionaryItem[]>;
  getCassationDistricts(): Promise<DictionaryItem[]>;
  getDivisions(): Promise<DictionaryItem[]>;
  getFinancialActivityTypes(): Promise<DictionaryItem[]>;
}
