import * as bcrypt from 'bcrypt';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';

async function main() {
  const prisma = new PrismaService(); // используем сервис, TS не ругается
  await prisma.$connect();

  // ====== FinancialActivityType ======
  const activityTypes = [
    { code: 'INSURANCE', name: 'Страхование', order: 0 },
    { code: 'BANKING', name: 'Деятельность кредитных организаций', order: 1 },
    { code: 'MICROFINANCE', name: 'Деятельность микрофинансовых организаций', order: 2 },
    { code: 'PENSION_FUNDS', name: 'Деятельность негосударственных пенсионных фондов', order: 3 },
    { code: 'CREDIT_COOPERATION', name: 'Кредитная кооперация', order: 4 },
    { code: 'PAWNSHOP', name: 'Ломбардная деятельность', order: 5 },
    {
      code: 'OTHER_NON_INTERACTING',
      name: 'Деятельность иных организаций, не взаимодействующих с финансовым уполномоченным',
      order: 6,
    },
  ];

  await prisma.financialActivityType.createMany({
    data: activityTypes,
    skipDuplicates: true,
  });

  console.log('FinancialActivityType seed finished!');

  // ====== Region ======
  const regions = [
    { code: 'ALTAISKY_KRAI', name: 'Алтайский край', order: 0 },
    { code: 'AMURSKAYA_OBLAST', name: 'Амурская область', order: 1 },
    { code: 'ARKHANGELSKAYA_OBLAST', name: 'Архангельская область', order: 2 },
    { code: 'ASTRAKHANSKAYA_OBLAST', name: 'Астраханская область', order: 3 },
    { code: 'BELGORODSKAYA_OBLAST', name: 'Белгородская область', order: 4 },
    { code: 'BRYANSKAYA_OBLAST', name: 'Брянская область', order: 5 },
    { code: 'VLADIMIRSKAYA_OBLAST', name: 'Владимирская область', order: 6 },
    { code: 'VOLGOGRADSKAYA_OBLAST', name: 'Волгоградская область', order: 7 },
    { code: 'VOLOGODSKAYA_OBLAST', name: 'Вологодская область', order: 8 },
    { code: 'VORONEZHSKAYA_OBLAST', name: 'Воронежская область', order: 9 },

    { code: 'DONETSK_NARODNAYA_RESPUBLIKA', name: 'Донецкая Народная Республика', order: 10 },
    { code: 'EVREISKAYA_AVTONOMNAYA_OBLAST', name: 'Еврейская автономная область', order: 11 },
    { code: 'ZABAIKALSKY_KRAI', name: 'Забайкальский край', order: 12 },
    { code: 'ZAPOROZHSKAYA_OBLAST', name: 'Запорожская область', order: 13 },
    { code: 'IVANOVSKAYA_OBLAST', name: 'Ивановская область', order: 14 },
    { code: 'IRKUTSKAYA_OBLAST', name: 'Иркутская область', order: 15 },
    {
      code: 'KABARDINO_BALKARSKAYA_RESPUBLIKA',
      name: 'Кабардино-Балкарская Республика',
      order: 16,
    },
    { code: 'KALININGRADSKAYA_OBLAST', name: 'Калининградская область', order: 17 },
    { code: 'KALUZHSKAYA_OBLAST', name: 'Калужская область', order: 18 },
    { code: 'KAMCHATSKY_KRAI', name: 'Камчатский край', order: 19 },

    {
      code: 'KARACHAY_CHERKESSKAYA_RESPUBLIKA',
      name: 'Карачаево-Черкесская Республика',
      order: 20,
    },
    { code: 'KEMEROVSKAYA_OBLAST_KUZBASS', name: 'Кемеровская область – Кузбасс', order: 21 },
    { code: 'KIROVSKAYA_OBLAST', name: 'Кировская область', order: 22 },
    { code: 'KOSTROMSKAYA_OBLAST', name: 'Костромская область', order: 23 },
    { code: 'KRASNODARSKY_KRAI', name: 'Краснодарский край', order: 24 },
    { code: 'KRASNOYARSKY_KRAI', name: 'Красноярский край', order: 25 },
    { code: 'KURGANSKAYA_OBLAST', name: 'Курганская область', order: 26 },
    { code: 'KURSKAYA_OBLAST', name: 'Курская область', order: 27 },
    { code: 'LENINGRADSKAYA_OBLAST', name: 'Ленинградская область', order: 28 },
    { code: 'LIPETSKAYA_OBLAST', name: 'Липецкая область', order: 29 },

    { code: 'LUGANSK_NARODNAYA_RESPUBLIKA', name: 'Луганская Народная Республика', order: 30 },
    { code: 'MAGADANSKAYA_OBLAST', name: 'Магаданская область', order: 31 },
    { code: 'MOSCOW', name: 'Москва', order: 32 },
    { code: 'MOSKOVSKAYA_OBLAST', name: 'Московская область', order: 33 },
    { code: 'MURMANSKAYA_OBLAST', name: 'Мурманская область', order: 34 },
    { code: 'NENECKIY_AVTONOMNY_OKRUG', name: 'Ненецкий автономный округ', order: 35 },
    { code: 'NIZHEGORODSKAYA_OBLAST', name: 'Нижегородская область', order: 36 },
    { code: 'NOVGORODSKAYA_OBLAST', name: 'Новгородская область', order: 37 },
    { code: 'NOVOSIBIRSKAYA_OBLAST', name: 'Новосибирская область', order: 38 },
    { code: 'OMSKAYA_OBLAST', name: 'Омская область', order: 39 },

    { code: 'ORENBURGSKAYA_OBLAST', name: 'Оренбургская область', order: 40 },
    { code: 'ORLOVSKAYA_OBLAST', name: 'Орловская область', order: 41 },
    { code: 'PENZENSKAYA_OBLAST', name: 'Пензенская область', order: 42 },
    { code: 'PERMSKY_KRAI', name: 'Пермский край', order: 43 },
    { code: 'PRIMORSKY_KRAI', name: 'Приморский край', order: 44 },
    { code: 'PSKOVSKAYA_OBLAST', name: 'Псковская область', order: 45 },

    { code: 'ADYGEA_RESPUBLIKA', name: 'Республика Адыгея', order: 46 },
    { code: 'ALTAI_RESPUBLIKA', name: 'Республика Алтай', order: 47 },
    { code: 'BASHKORTOSTAN_RESPUBLIKA', name: 'Республика Башкортостан', order: 48 },
    { code: 'BURYATIA_RESPUBLIKA', name: 'Республика Бурятия', order: 49 },
    { code: 'DAGESTAN_RESPUBLIKA', name: 'Республика Дагестан', order: 50 },
    { code: 'INGUSHETIA_RESPUBLIKA', name: 'Республика Ингушетия', order: 51 },
    { code: 'KALMYKIA_RESPUBLIKA', name: 'Республика Калмыкия', order: 52 },
    { code: 'KARELIA_RESPUBLIKA', name: 'Республика Карелия', order: 53 },
    { code: 'KOMI_RESPUBLIKA', name: 'Республика Коми', order: 54 },
    { code: 'CRIMEA_RESPUBLIKA', name: 'Республика Крым', order: 55 },

    { code: 'MARI_EL_RESPUBLIKA', name: 'Республика Марий Эл', order: 56 },
    { code: 'MORDOVIA_RESPUBLIKA', name: 'Республика Мордовия', order: 57 },
    { code: 'SAKHA_YAKUTIA_RESPUBLIKA', name: 'Республика Саха (Якутия)', order: 58 },
    {
      code: 'NORTH_OSSETIA_ALANIA_RESPUBLIKA',
      name: 'Республика Северная Осетия – Алания',
      order: 59,
    },
    { code: 'TATARSTAN_RESPUBLIKA', name: 'Республика Татарстан', order: 60 },
    { code: 'TUVA_RESPUBLIKA', name: 'Республика Тыва', order: 61 },
    { code: 'KHAKASSIA_RESPUBLIKA', name: 'Республика Хакасия', order: 62 },

    { code: 'ROSTOVSKAYA_OBLAST', name: 'Ростовская область', order: 63 },
    { code: 'RYAZANSKAYA_OBLAST', name: 'Рязанская область', order: 64 },
    { code: 'SAMARSKAYA_OBLAST', name: 'Самарская область', order: 65 },
    { code: 'SAINT_PETERSBURG', name: 'Санкт-Петербург', order: 66 },
    { code: 'SARATOVSKAYA_OBLAST', name: 'Саратовская область', order: 67 },
    { code: 'SAKHALINSKAYA_OBLAST', name: 'Сахалинская область', order: 68 },
    { code: 'SVERDLOVSKAYA_OBLAST', name: 'Свердловская область', order: 69 },
    { code: 'SEVASTOPOL', name: 'Севастополь', order: 70 },
    { code: 'SMOLENSKAYA_OBLAST', name: 'Смоленская область', order: 71 },
    { code: 'STAVROPOLSKY_KRAI', name: 'Ставропольский край', order: 72 },

    { code: 'TAMBOVSKAYA_OBLAST', name: 'Тамбовская область', order: 73 },
    { code: 'TVERSKAYA_OBLAST', name: 'Тверская область', order: 74 },
    { code: 'TOMSKAYA_OBLAST', name: 'Томская область', order: 75 },
    { code: 'TULSKAYA_OBLAST', name: 'Тульская область', order: 76 },
    { code: 'TYUMENSKAYA_OBLAST', name: 'Тюменская область', order: 77 },

    { code: 'UDMURTIA_RESPUBLIKA', name: 'Удмуртская Республика', order: 78 },
    { code: 'ULYANOVSKAYA_OBLAST', name: 'Ульяновская область', order: 79 },
    { code: 'KHABAROVSKY_KRAI', name: 'Хабаровский край', order: 80 },
    {
      code: 'KHANTY_MANSI_AUTONOMOUS_OKRUG_YUGRA',
      name: 'Ханты-Мансийский автономный округ – Югра',
      order: 81,
    },
    { code: 'KHERSONSKAYA_OBLAST', name: 'Херсонская область', order: 82 },

    { code: 'CHELYABINSKAYA_OBLAST', name: 'Челябинская область', order: 83 },
    { code: 'CHECHENSKAYA_RESPUBLIKA', name: 'Чеченская Республика', order: 84 },
    { code: 'CHUVASHIA_RESPUBLIKA', name: 'Чувашская Республика', order: 85 },
    { code: 'CHUKOTKA_AUTONOMOUS_OKRUG', name: 'Чукотский автономный округ', order: 86 },
    {
      code: 'YAMALO_NENECKIY_AUTONOMOUS_OKRUG',
      name: 'Ямало-Ненецкий автономный округ',
      order: 87,
    },
    { code: 'YAROSLAVSKAYA_OBLAST', name: 'Ярославская область', order: 88 },
  ];

  await prisma.region.createMany({
    data: regions,
    skipDuplicates: true,
  });

  console.log('Regions seed finished!');

  // ====== CourtType ======
  const courtTypes = [
    { code: 'APPEAL_ARBITRATION', name: 'Апелляционный арбитраж', order: 0 },
    { code: 'APPEAL_SOU', name: 'Апелляционный СОЮ', order: 1 },
    { code: 'ARBITRATION', name: 'Арбитраж', order: 2 },
    { code: 'ARBITRATION_DISTRICT', name: 'Арбитраж окружной', order: 3 },
    { code: 'MILITARY', name: 'Военный', order: 4 },
    { code: 'SUPREME_COURT_RF', name: 'ВС РФ', order: 5 },
    { code: 'CITY', name: 'Городской', order: 6 },
    { code: 'CASSATION_SOU', name: 'Кассационный СОЮ', order: 7 },
    { code: 'MOSCOW_REGION', name: 'Московская область', order: 8 },
    { code: 'MAGISTRATE_COURT', name: 'МС СУ', order: 9 },
    { code: 'DISTRICT', name: 'Районный', order: 10 },
    { code: 'SUBJECT', name: 'Субъекта', order: 11 },
  ];

  await prisma.courtType.createMany({
    data: courtTypes,
    skipDuplicates: true,
  });

  console.log('CourtTypes seed finished!');

  // ====== CassationDistrict ======
  const cassationDistricts = [
    { code: 'CASSATION_DISTRICT_1', name: 'Первый кассационный округ', order: 0 },
    { code: 'CASSATION_DISTRICT_2', name: 'Второй кассационный округ', order: 1 },
    { code: 'CASSATION_DISTRICT_3', name: 'Третий кассационный округ', order: 2 },
    { code: 'CASSATION_DISTRICT_4', name: 'Четвертый кассационный округ', order: 3 },
    { code: 'CASSATION_DISTRICT_5', name: 'Пятый кассационный округ', order: 4 },
    { code: 'CASSATION_DISTRICT_6', name: 'Шестой кассационный округ', order: 5 },
    { code: 'CASSATION_DISTRICT_7', name: 'Седьмой кассационный округ', order: 6 },
    { code: 'CASSATION_DISTRICT_8', name: 'Восьмой кассационный округ', order: 7 },
    { code: 'CASSATION_DISTRICT_9', name: 'Девятый кассационный округ', order: 8 },
  ];

  await prisma.cassationDistrict.createMany({
    data: cassationDistricts,
    skipDuplicates: true,
  });

  console.log('CassationDistricts seed finished!');

  // ====== Division ======
  const divisions = [
    { code: 'MOSCOW', name: 'Москва', order: 0 },
    { code: 'SARATOV', name: 'Саратов', order: 1, number: '1' },
    { code: 'SAINT_PETERSBURG', name: 'Санкт-Петербург', order: 2, number: '2' },
    { code: 'NIZHNY_NOVGOROD', name: 'Нижний Новгород', order: 3, number: '3' },
  ];

  await prisma.division.createMany({
    data: divisions,
    skipDuplicates: true,
  });

  console.log('Divisions seed finished!');

  // ====== Employee/User ======
  const password = 'test123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const employeeId = '00000000-0000-0000-0000-000000000001';

  // Сначала создаём Employee
  await prisma.employee.upsert({
    where: { id: employeeId },
    update: {},
    create: {
      id: employeeId,
      cn: 'EMP001',
      full_name: 'Test Admin',
      department: 'IT',
      title: 'Administrator',
      division: {
        connect: {
          code: 'NIZHNY_NOVGOROD',
        },
      },
      login: 'admin',
      is_present: true,
    },
  });

  // Потом создаём User с тем же id
  const user = await prisma.user.upsert({
    where: { id: employeeId },
    update: {},
    create: {
      id: employeeId,
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Test user created:', user.id);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
