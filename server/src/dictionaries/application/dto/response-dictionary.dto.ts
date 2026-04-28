export type DictionaryItem = {
  code: string;
  name: string;
  number?: string | null;
};

export type DictionariyResponseDto = {
  regions: DictionaryItem[];
  courtTypes: DictionaryItem[];
  cassationDistricts: DictionaryItem[];
  divisions: DictionaryItem[];
  financialActivityTypes: DictionaryItem[];
};
