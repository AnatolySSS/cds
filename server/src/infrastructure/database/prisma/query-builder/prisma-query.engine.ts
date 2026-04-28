import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from 'date-fns';

// -------------------------
// BASE
// -------------------------
export type QueryParams = {
  page: number;
  pageSize: number;
  sorting?: SortItem[];
  filters?: Filter[];
  globalFilter?: string;
};

export type QueryEngineConfig = {
  sortRegistry: SortRegistry;
  selectRegistry?: Record<string, string>;
  searchableFields: string[];
  requiredFields?: string[];
  integerFields?: string[];
};

export type SortRegistry = Record<string, string>;

// -------------------------
// SORTING
// -------------------------
export type SortItem = {
  id: string;
  desc: boolean;
};

// -------------------------
// FILTERS
// -------------------------
export type BaseFilter = {
  field: string;
};

export type TextMatchMode =
  | 'startsWith'
  | 'contains'
  | 'notContains'
  | 'endsWith'
  | 'equals'
  | 'notEquals'
  | 'empty'
  | 'notEmpty';

export type TextFilter = BaseFilter & {
  type: 'text';
  matchMode: TextMatchMode;
  value?: string;
};

export type NumberMatchMode =
  | 'equals'
  | 'notEquals'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'between'
  | 'empty'
  | 'notEmpty';

export type NumberFilter = BaseFilter & {
  type: 'number';
  matchMode: NumberMatchMode;
  value?: number | [number, number];
};

type DatePreset = TemporalDatePreset | NullPreset;

type NullPreset = 'empty' | 'notEmpty';

type TemporalDatePreset =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'this_week'
  | 'last_week'
  | 'next_week'
  | 'this_month'
  | 'last_month'
  | 'next_month'
  | 'this_year'
  | 'last_year'
  | 'next_year';

export type DateSingleFilter = BaseFilter & {
  type: 'date';
  mode: 'single';
  matchMode: 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter';
  value: string;
};

export type DateRangeFilter = BaseFilter & {
  type: 'date';
  mode: 'range';
  matchMode: 'between';
  from: string;
  to: string;
};
export type DatePresetFilter = BaseFilter & {
  type: 'date';
  mode: 'preset';
  preset: DatePreset;
};

export type DateFilter = DateSingleFilter | DateRangeFilter | DatePresetFilter;

export type BooleanFilter = BaseFilter & {
  type: 'boolean';
  value: boolean;
};

export type SelectFilter = BaseFilter & {
  type: 'select';
  matchMode: 'in' | NullPreset;
  value: string[];
};

export type Filter = TextFilter | NumberFilter | DateFilter | BooleanFilter | SelectFilter;

export class QueryEngine {
  constructor(
    private params: QueryParams,
    private config: QueryEngineConfig,
  ) {}

  build() {
    return {
      where: this.buildWhere(),
      orderBy: this.buildOrderBy(),
      skip: this.buildSkip(),
      take: this.buildTake(),
    };
  }

  // -------------------------
  // PAGINATION
  // -------------------------
  private buildSkip() {
    return (this.params.page - 1) * this.params.pageSize;
  }

  private buildTake() {
    return this.params.pageSize;
  }

  // -------------------------
  // SORTING
  // -------------------------
  private buildOrderBy() {
    const sorting = this.params.sorting ?? [];

    return sorting
      .map((s) => {
        const path = this.config.sortRegistry[s.id];

        if (!path) return null;

        return this.toPrismaOrderBy(path, s.desc ? 'desc' : 'asc');
      })
      .filter(Boolean);
  }

  // -------------------------
  // PRISMA NESTED ORDER BUILDER
  // -------------------------
  private toPrismaOrderBy(path: string, direction: 'asc' | 'desc') {
    const parts = path.split('.');

    if (parts.length === 1) {
      return { [parts[0]]: direction };
    }

    let result: any = {};
    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      current[parts[i]] = {};
      current = current[parts[i]];
    }

    current[parts.at(-1)!] = direction;

    return result;
  }

  // -------------------------
  // FILTERS
  // -------------------------
  private buildWhere() {
    const filters = this.params.filters ?? [];

    const AND = filters.map((f) => this.buildFilter(f)).filter(Boolean);

    const search = this.buildGlobalSearch();

    if (Object.keys(search).length) {
      AND.push(search);
    }

    return AND.length ? { AND } : {};
  }

  private resolveFieldPath(field: string): string {
    return this.config.selectRegistry?.[field] ?? field;
  }

  private isRequiredField(field: string): boolean {
    return this.config.requiredFields?.includes(field) ?? false;
  }

  private isIntegerField(field: string): boolean {
    return this.config.integerFields?.includes(field) ?? false;
  }

  private toPrismaWhere(path: string, condition: any) {
    const parts = path.split('.');

    if (parts.length === 1) {
      return { [parts[0]]: condition };
    }

    let result: any = {};
    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      current[parts[i]] = {};
      current = current[parts[i]];
    }

    current[parts.at(-1)!] = condition;

    return result;
  }

  private buildFilter(filter: Filter): any {
    switch (filter.type) {
      case 'text':
        return this.buildText(filter);

      case 'number':
        return this.buildNumber(filter);

      case 'date':
        return this.buildDate(filter);

      case 'boolean':
        return this.toPrismaWhere(this.resolveFieldPath(filter.field), filter.value);

      case 'select':
        return this.buildSelect(filter);
    }
  }

  private buildEmptyCondition(path: string) {
    if (this.isRequiredField(path)) {
      return this.toPrismaWhere(path, { equals: this.isIntegerField(path) ? 0 : '' });
    }

    return this.toPrismaWhere(path, null);
  }

  private buildNotEmptyCondition(path: string) {
    if (this.isRequiredField(path)) {
      return {
        NOT: this.toPrismaWhere(path, { equals: this.isIntegerField(path) ? 0 : '' }),
      };
    }

    return {
      NOT: this.toPrismaWhere(path, null),
    };
  }

  private buildSelect(filter: SelectFilter) {
    const value = filter.value ?? [];
    const path = this.resolveFieldPath(filter.field);

    const build = (cond: any) => this.toPrismaWhere(path, cond);

    switch (filter.matchMode) {
      case 'in':
        if (!value.length) return {};

        return build({
          in: value,
        });

      case 'empty':
        return this.buildEmptyCondition(path);

      case 'notEmpty':
        return this.buildNotEmptyCondition(path);
    }
  }

  private buildText(filter: TextFilter) {
    const value = filter.value ?? '';
    const path = this.resolveFieldPath(filter.field);

    const build = (cond: any) => this.toPrismaWhere(path, cond);

    switch (filter.matchMode) {
      case 'contains':
        return build({
          contains: value,
          mode: 'insensitive',
        });

      case 'notContains':
        return {
          NOT: build({
            contains: value,
            mode: 'insensitive',
          }),
        };

      case 'startsWith':
        return build({
          startsWith: value,
          mode: 'insensitive',
        });

      case 'endsWith':
        return build({
          endsWith: value,
          mode: 'insensitive',
        });

      case 'equals':
        return build({ equals: value });

      case 'notEquals':
        return {
          NOT: build({ equals: value }),
        };

      case 'empty':
        return this.buildEmptyCondition(path);

      case 'notEmpty':
        return this.buildNotEmptyCondition(path);
    }
  }

  private buildNumber(filter: NumberFilter) {
    const path = this.resolveFieldPath(filter.field);

    const build = (cond: any) => this.toPrismaWhere(path, cond);

    switch (filter.matchMode) {
      case 'gt':
        return build({ gt: filter.value });

      case 'gte':
        return build({ gte: filter.value });

      case 'lt':
        return build({ lt: filter.value });

      case 'lte':
        return build({ lte: filter.value });

      case 'equals':
        return build({ equals: filter.value });

      case 'notEquals':
        return {
          NOT: build({ equals: filter.value }),
        };

      case 'between':
        return build({
          gte: filter.value?.[0],
          lte: filter.value?.[1],
        });

      case 'empty':
        return this.buildEmptyCondition(path);

      case 'notEmpty':
        return this.buildNotEmptyCondition(path);
    }
  }

  private buildDate(filter: DateFilter) {
    const path = this.resolveFieldPath(filter.field);

    const build = (cond: any) => this.toPrismaWhere(path, cond);

    switch (filter.mode) {
      case 'single':
        return this.buildSingleDate(filter, build);

      case 'range':
        return this.buildRangeDate(filter, build);

      case 'preset':
        return this.buildPresetDate(filter, build);
    }
  }

  private buildSingleDate(
    filter: Extract<DateFilter, { mode: 'single' }>,
    build: (cond: any) => any,
  ) {
    const date = new Date(filter.value);

    switch (filter.matchMode) {
      case 'dateIs':
        return build({
          gte: startOfDay(date),
          lte: endOfDay(date),
        });

      case 'dateIsNot':
        return {
          NOT: build({
            gte: startOfDay(date),
            lte: endOfDay(date),
          }),
        };

      case 'dateBefore':
        return build({
          lt: startOfDay(date),
        });

      case 'dateAfter':
        return build({
          gt: endOfDay(date),
        });
    }
  }

  private buildRangeDate(
    filter: Extract<DateFilter, { mode: 'range' }>,
    build: (cond: any) => any,
  ) {
    const fromDate = filter.from ? new Date(filter.from) : null;
    const toDate = filter.to ? new Date(filter.to) : null;

    const from = fromDate ? startOfDay(fromDate) : null;
    const to = toDate ? endOfDay(toDate) : null;

    return build({
      ...(from ? { gte: from } : {}),
      ...(to ? { lte: to } : {}),
    });
  }

  private buildPresetDate(
    filter: Extract<DateFilter, { mode: 'preset' }>,
    build: (cond: any) => any,
  ) {
    // -------------------------
    // NULL PRESETS
    // -------------------------
    if (filter.preset === 'empty') {
      return build(null);
    }

    if (filter.preset === 'notEmpty') {
      return {
        NOT: build(null),
      };
    }

    const now = new Date();

    const map: Record<TemporalDatePreset, [Date, Date]> = {
      today: [startOfDay(now), endOfDay(now)],

      yesterday: [startOfDay(subDays(now, 1)), endOfDay(subDays(now, 1))],

      tomorrow: [startOfDay(addDays(now, 1)), endOfDay(addDays(now, 1))],

      this_week: [startOfWeek(now), endOfWeek(now)],
      last_week: [startOfWeek(subWeeks(now, 1)), endOfWeek(subWeeks(now, 1))],
      next_week: [startOfWeek(addWeeks(now, 1)), endOfWeek(addWeeks(now, 1))],

      this_month: [startOfMonth(now), endOfMonth(now)],
      last_month: [startOfMonth(subMonths(now, 1)), endOfMonth(subMonths(now, 1))],
      next_month: [startOfMonth(addMonths(now, 1)), endOfMonth(addMonths(now, 1))],

      this_year: [startOfYear(now), endOfYear(now)],
      last_year: [startOfYear(subYears(now, 1)), endOfYear(subYears(now, 1))],
      next_year: [startOfYear(addYears(now, 1)), endOfYear(addYears(now, 1))],
    };

    const [from, to] = map[filter.preset];

    return build({
      gte: from,
      lte: to,
    });
  }

  // -------------------------
  // GLOBAL SEARCH
  // -------------------------
  private buildGlobalSearch() {
    const value = this.params.globalFilter?.trim();
    if (!value) return {};

    return {
      OR: this.config.searchableFields.map((field) => ({
        [field]: {
          contains: value,
          mode: 'insensitive',
        },
      })),
    };
  }
}
