import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const locations: Record<string, string[]> = {
  Улаанбаатар: [
    "Багануур",
    "Багахангай",
    "Баянгол",
    "Баянзүрх",
    "Налайх",
    "Сонгинохайрхан",
    "Сүхбаатар",
    "Хан-Уул",
    "Чингэлтэй",
  ],
  Архангай: [
    "Батцэнгэл",
    "Булган",
    "Жаргалант",
    "Ихтамир",
    "Өгийнуур",
    "Өлзийт",
    "Өндөр-Улаан",
    "Тариат",
    "Төвшрүүлэх",
    "Хайрхан",
    "Хангай",
    "Хашаат",
    "Хотонт",
    "Цахир",
    "Цэнхэр",
    "Цэцэрлэг",
    "Чулуут",
    "Эрдэнэбулган",
    "Эрдэнэмандал",
  ],
  "Баян-Өлгий": [
    "Алтай",
    "Алтанцөгц",
    "Баяннуур",
    "Бугат",
    "Булган",
    "Буянт",
    "Дэлүүн",
    "Ногооннуур",
    "Сагсай",
    "Толбо",
    "Улаанхус",
    "Цэнгэл",
    "Өлгий",
  ],
  Баянхонгор: [
    "Баацагаан",
    "Баянбулаг",
    "Баянговь",
    "Баянлиг",
    "Баян-Овоо",
    "Баянцагаан",
    "Богд",
    "Бөмбөгөр",
    "Бууцагаан",
    "Галуут",
    "Гурванбулаг",
    "Жаргалант",
    "Жинст",
    "Заг",
    "Өлзийт",
    "Хүрээмарал",
    "Шинэжинст",
    "Эрдэнэцогт",
    "Баянхонгор",
  ],
  Булган: [
    "Баян-Агт",
    "Баяннуур",
    "Бугат",
    "Бүрэгхангай",
    "Гурванбулаг",
    "Дашинчилэн",
    "Могод",
    "Орхон",
    "Рашаант",
    "Сайхан",
    "Сэлэнгэ",
    "Тэшиг",
    "Хангал",
    "Хишиг-Өндөр",
    "Хутаг-Өндөр",
    "Булган",
  ],
  "Говь-Алтай": [
    "Алтай",
    "Баян-Уул",
    "Бигэр",
    "Бугат",
    "Дарви",
    "Дэлгэр",
    "Жаргалан",
    "Тайшир",
    "Тонхил",
    "Төгрөг",
    "Халиун",
    "Хөхморьт",
    "Цогт",
    "Цээл",
    "Чандмань",
    "Шарга",
    "Эрдэнэ",
    "Есөнбулаг",
  ],
  Говьсүмбэр: ["Баянтал", "Сүмбэр", "Шивээговь"],
  "Дархан-Уул": ["Дархан", "Орхон", "Хонгор", "Шарын гол"],
  Дорноговь: [
    "Айраг",
    "Алтанширээ",
    "Даланжаргалан",
    "Дэлгэрэх",
    "Замын-Үүд",
    "Иххэт",
    "Мандах",
    "Өргөн",
    "Сайхандулаан",
    "Сайншанд",
    "Улаанбадрах",
    "Хатанбулаг",
    "Хөвсгөл",
    "Эрдэнэ",
  ],
  Дорнод: [
    "Баяндун",
    "Баянтүмэн",
    "Баян-Уул",
    "Булган",
    "Гурванзагал",
    "Дашбалбар",
    "Матад",
    "Сэргэлэн",
    "Халхгол",
    "Хэрлэн",
    "Хөлөнбуйр",
    "Цагаан-Овоо",
    "Чойбалсан",
    "Чулуунхороот",
  ],
  Дундговь: [
    "Адаацаг",
    "Баянжаргалан",
    "Говь-Угтаал",
    "Гурвансайхан",
    "Дэлгэрхангай",
    "Дэлгэрцогт",
    "Дэрэн",
    "Луус",
    "Өлзийт",
    "Өндөршил",
    "Сайхан-Овоо",
    "Сайнцагаан",
    "Хулд",
    "Цагаандэлгэр",
    "Эрдэнэдалай",
  ],
  Завхан: [
    "Алдархаан",
    "Асгат",
    "Баянтэс",
    "Баянхайрхан",
    "Дөрвөлжин",
    "Завханмандал",
    "Идэр",
    "Их-Уул",
    "Нөмрөг",
    "Отгон",
    "Сантмаргац",
    "Сонгино",
    "Тосонцэнгэл",
    "Түдэвтэй",
    "Тэлмэн",
    "Тэс",
    "Улиастай",
    "Ургамал",
    "Цагаанхайрхан",
    "Цагаанчулуут",
    "Цэцэн-Уул",
    "Шилүүстэй",
    "Эрдэнэхайрхан",
    "Яруу",
  ],
  Орхон: ["Баян-Өндөр", "Жаргалант"],
  Өвөрхангай: [
    "Арвайхээр",
    "Баруунбаян-Улаан",
    "Бат-Өлзий",
    "Баянгол",
    "Баян-Өндөр",
    "Богд",
    "Бүрд",
    "Гучин-Ус",
    "Зүйл",
    "Зүүнбаян-Улаан",
    "Нарийнтээл",
    "Өлзийт",
    "Сант",
    "Тарагт",
    "Төгрөг",
    "Уянга",
    "Хайрхандулаан",
    "Хархорин",
    "Хужирт",
  ],
  Өмнөговь: [
    "Баяндалай",
    "Баян-Овоо",
    "Булган",
    "Гурвантэс",
    "Даланзадгад",
    "Мандал-Овоо",
    "Манлай",
    "Номгон",
    "Ноён",
    "Сэврэй",
    "Ханбогд",
    "Ханхонгор",
    "Хүрмэн",
    "Цогт-Овоо",
    "Цогтцэций",
  ],
  Сүхбаатар: [
    "Асгат",
    "Баяндэлгэр",
    "Баруун-Урт",
    "Дарьганга",
    "Мөнххаан",
    "Наран",
    "Онгон",
    "Сүхбаатар",
    "Түвшинширээ",
    "Түмэнцогт",
    "Уулбаян",
    "Халзан",
    "Эрдэнэцагаан",
  ],
  Сэлэнгэ: [
    "Алтанбулаг",
    "Баруунбүрэн",
    "Баянгол",
    "Ерөө",
    "Жавхлант",
    "Зүүнбүрэн",
    "Мандал",
    "Орхон",
    "Орхонтуул",
    "Сайхан",
    "Сант",
    "Сүхбаатар",
    "Түшиг",
    "Хүдэр",
    "Хушаат",
    "Цагааннуур",
    "Шаамар",
  ],
  Төв: [
    "Алтанбулаг",
    "Аргалант",
    "Архуст",
    "Батсүмбэр",
    "Баян",
    "Баяндэлгэр",
    "Баянжаргалан",
    "Баян-Өнжүүл",
    "Баянхангай",
    "Баянцагаан",
    "Баянцогт",
    "Баянчандмань",
    "Борнуур",
    "Бүрэн",
    "Дэлгэрхаан",
    "Жаргалант",
    "Заамар",
    "Зуунмод",
    "Лүн",
    "Мөнгөнморьт",
    "Өндөрширээт",
    "Сэргэлэн",
    "Угтаалцайдам",
    "Цээл",
    "Эрдэнэ",
    "Эрдэнэсант",
  ],
  Увс: [
    "Баруунтуруун",
    "Бөхмөрөн",
    "Давст",
    "Завхан",
    "Зүүнговь",
    "Зүүнхангай",
    "Малчин",
    "Наранбулаг",
    "Өлгий",
    "Өмнөговь",
    "Өндөрхангай",
    "Сагил",
    "Тариалан",
    "Түргэн",
    "Тэс",
    "Улаангом",
    "Ховд",
    "Хяргас",
    "Цагаанхайрхан",
  ],
  Ховд: [
    "Алтай",
    "Булган",
    "Буянт",
    "Дарви",
    "Дөргөн",
    "Дуут",
    "Зэрэг",
    "Жаргалант",
    "Манхан",
    "Мөнххайрхан",
    "Мөст",
    "Мянгад",
    "Үенч",
    "Ховд",
    "Цэцэг",
    "Чандмань",
    "Эрдэнэбүрэн",
  ],
  Хөвсгөл: [
    "Алаг-Эрдэнэ",
    "Арбулаг",
    "Баянзүрх",
    "Бүрэнтогтох",
    "Галт",
    "Жаргалант",
    "Их-Уул",
    "Мөрөн",
    "Рашаант",
    "Ренчинлхүмбэ",
    "Тариалан",
    "Тосонцэнгэл",
    "Төмөрбулаг",
    "Түнэл",
    "Улаан-Уул",
    "Ханх",
    "Цагааннуур",
    "Цагаан-Уул",
    "Цэцэрлэг",
    "Чандмань-Өндөр",
    "Шинэ-Идэр",
    "Эрдэнэбулган",
  ],
  Хэнтий: [
    "Батноров",
    "Батширээт",
    "Баян-Адарга",
    "Баян-Овоо",
    "Баянхутаг",
    "Биндэр",
    "Бор-Өндөр",
    "Галшар",
    "Дадал",
    "Дархан",
    "Дэлгэрхаан",
    "Жаргалтхаан",
    "Мөрөн",
    "Норовлин",
    "Өмнөдэлгэр",
    "Хэрлэн",
    "Цэнхэрмандал",
  ],
};

function entries(values: string[], startId = 1) {
  return values.map((description, index) => ({
    id: startId + index,
    description,
  }));
}

async function resetSequence(table: string, column: string) {
  try {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${table}"', '${column}'), COALESCE((SELECT MAX("${column}") FROM "${table}"), 1), true)`
    );
  } catch {}
}

async function main() {
  await prisma.hr_office.createMany({
    data: [
      { office_id: 1, name: "Төв оффис" },
      { office_id: 2, name: "Ресторан" },
      { office_id: 3, name: "Үйлчилгээ" },
      { office_id: 4, name: "Агуулах" },
    ],
    skipDuplicates: true,
  });

  await prisma.shifts.createMany({
    data: [
      { id: 1, name: "Үндсэн" },
      { id: 2, name: "Өглөө" },
      { id: 3, name: "Орой" },
      { id: 4, name: "24/48" },
    ],
    skipDuplicates: true,
  });

  await prisma.schedule.createMany({
    data: [
      { sched_id: 1, sched_name: "5 өдөр", work_day: 5, holiday: 2 },
      { sched_id: 2, sched_name: "6 өдөр", work_day: 6, holiday: 1 },
      { sched_id: 3, sched_name: "Ээлжийн", work_day: 4, holiday: 3 },
    ],
    skipDuplicates: true,
  });

  await prisma.deps.createMany({
    data: [
      { dep_id: 1, name: "Удирдлага", schedule: 1, office_ident: 1 },
      { dep_id: 2, name: "Санхүү", schedule: 1, office_ident: 1 },
      { dep_id: 3, name: "Хүний нөөц", schedule: 1, office_ident: 1 },
      { dep_id: 4, name: "Маркетинг", schedule: 1, office_ident: 1 },
      { dep_id: 5, name: "Үйлчилгээ", schedule: 3, office_ident: 3 },
      { dep_id: 6, name: "Гал тогоо", schedule: 3, office_ident: 2 },
      { dep_id: 7, name: "Агуулах", schedule: 1, office_ident: 4 },
      { dep_id: 8, name: "Борлуулалт", schedule: 1, office_ident: 1 },
    ],
    skipDuplicates: true,
  });

  await prisma.branch.createMany({
    data: [
      {
        branch_id: 1,
        description: "Төв салбар",
        status: 1,
        legal_name: "Компани",
      },
      {
        branch_id: 2,
        description: "Алтай ресторан",
        status: 1,
        legal_name: "Алтай ресторан",
      },
      {
        branch_id: 3,
        description: "Кофе шоп",
        status: 1,
        legal_name: "Кофе шоп",
      },
      {
        branch_id: 4,
        description: "Сеораксан ресторан",
        status: 1,
        legal_name: "Сеораксан ресторан",
      },
      {
        branch_id: 5,
        description: "Tokyo lounge",
        status: 1,
        legal_name: "Tokyo lounge",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.occupation.createMany({
    data: [
      { occupation_id: 1, description: "Гүйцэтгэх захирал", sched_id: 1 },
      { occupation_id: 2, description: "Хүний нөөцийн менежер", sched_id: 1 },
      { occupation_id: 3, description: "Нягтлан бодогч", sched_id: 1 },
      { occupation_id: 4, description: "Нярав", sched_id: 1 },
      { occupation_id: 5, description: "Бартендер", sched_id: 3 },
      { occupation_id: 6, description: "Ахлах тогооч", sched_id: 3 },
      { occupation_id: 7, description: "Үйлчилгээний ажилтан", sched_id: 3 },
      { occupation_id: 8, description: "Маркетингийн менежер", sched_id: 1 },
      { occupation_id: 9, description: "Касс", sched_id: 3 },
    ],
    skipDuplicates: true,
  });

  await prisma.profession_type.createMany({
    data: entries([
      "Механик инженер",
      "Програм хангамжийн инженер",
      "Нягтлан бодогч",
      "Нярав",
      "Сувилагч",
      "Бага ангийн багш",
      "Багш",
      "Орчуулагч",
      "Аялал жуулчлалын менежер",
      "Тогооч",
      "Үйлчилгээний ажилтан",
    ]).map((item) => ({
      professiontype_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.education.createMany({
    data: entries([
      "Бага",
      "Бүрэн бус дунд",
      "Бүрэн дунд",
      "Тусгай дунд",
      "Дээд",
      "Бакалавр",
      "Магистр",
      "Доктор",
    ]).map((item) => ({
      education_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.degree.createMany({
    data: entries(["Байхгүй", "Бакалавр", "Магистр", "Доктор"]).map((item) => ({
      degree_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.graduate.createMany({
    data: entries([
      "МУИС",
      "ШУТИС",
      "МУБИС",
      "СЭЗИС",
      "АШУҮИС",
      "Гадаад сургууль",
    ]).map((item) => ({
      graduate_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.edu_type.createMany({
    data: entries([
      "Төгссөн сургууль",
      "Гадаад хэл",
      "Тусгай мэргэжил",
      "Сургалт",
    ]).map((item) => ({
      education_id: item.id,
      name: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.spec_edu_type.createMany({
    data: entries([
      "Ахлах мэргэжилтэн",
      "Япон хэлний дээд түвшин",
      "Аюулгүй ажиллагаа",
      "Санхүүгийн сургалт",
    ]).map((item) => ({
      spec_edu_type_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.country.createMany({
    data: [
      {
        country_ident: 1,
        description: "Монгол",
        country_code: "01",
        code4bank: "MN",
      },
      {
        country_ident: 2,
        description: "Хятад",
        country_code: "03",
        code4bank: "CN",
      },
      {
        country_ident: 3,
        description: "Япон",
        country_code: "12",
        code4bank: "JP",
      },
      {
        country_ident: 4,
        description: "БНСУ",
        country_code: "82",
        code4bank: "KR",
      },
      {
        country_ident: 5,
        description: "Орос",
        country_code: "07",
        code4bank: "RU",
      },
      {
        country_ident: 6,
        description: "АНУ",
        country_code: "01",
        code4bank: "US",
      },
      {
        country_ident: 7,
        description: "Герман",
        country_code: "49",
        code4bank: "DE",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.nationality.createMany({
    data: entries([
      "Барга",
      "Баяд",
      "Буриад",
      "Дархад",
      "Дөрвөд",
      "Захчин",
      "Казак",
      "Сартуул",
      "Торгууд",
      "Урианхай",
      "Халх",
      "Өөлд",
    ]).map((item) => ({
      nationality_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.niigmiin_garal.createMany({
    data: entries([
      "Ажилчин",
      "Малчин",
      "Албан хаагч",
      "Хувиараа",
      "Оюутан",
      "Бусад",
    ]).map((item) => ({
      niigmiin_garal_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.voting_work.createMany({
    data: entries([
      "Байхгүй",
      "Сонгуулийн ажилтан",
      "Ажиглагч",
      "Хэсгийн ахлагч",
    ]).map((item) => ({
      voting_work_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.marital_status.createMany({
    data: [
      { maritalstatus_id: 1, description: "Гэрлээгүй" },
      { maritalstatus_id: 2, description: "Гэрлэсэн" },
    ],
    skipDuplicates: true,
  });

  await prisma.apartment_cond.createMany({
    data: entries([
      "Орон сууцтай",
      "Гэр хороолол",
      "Түрээсийн байр",
      "Эцэг эхтэйгээ",
      "Бусад",
    ]).map((item) => ({
      apartcond_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.carown_cond.createMany({
    data: entries(["Автомашингүй", "Автомашинтай", "Зээлтэй"]).map((item) => ({
      carowncond_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.work_skill.createMany({
    data: entries([
      "Ерөнхий",
      "Харилцаа",
      "Удирдах",
      "Борлуулалт",
      "Техник",
      "Гал тогоо",
    ]).map((item) => ({
      wskill_id: item.id,
      description: item.description,
      cost_normal: 0,
      cost_hard: 0,
      cost_other: 0,
    })),
    skipDuplicates: true,
  });

  await prisma.banks.createMany({
    data: [
      { bank_id: 1, description: "Хаан банк", country_ident: 1 },
      { bank_id: 2, description: "Хас банк", country_ident: 1 },
      { bank_id: 3, description: "Голомт банк", country_ident: 1 },
      { bank_id: 4, description: "Төрийн банк", country_ident: 1 },
      { bank_id: 5, description: "Капитрон банк", country_ident: 1 },
      { bank_id: 6, description: "QPay", country_ident: 1 },
    ],
    skipDuplicates: true,
  });

  await prisma.insur_type.createMany({
    data: [
      { insur_id: 1, description: "Нийгмийн даатгал", insur_code: "ND" },
      { insur_id: 2, description: "Эрүүл мэндийн даатгал", insur_code: "EMD" },
      { insur_id: 3, description: "Даатгалгүй", insur_code: "NO" },
    ],
    skipDuplicates: true,
  });

  await prisma.fired_reason.createMany({
    data: entries([
      "Өөрийн хүсэлтээр",
      "Гэрээ дууссан",
      "Сахилгын шалтгаан",
      "Шилжсэн",
      "Бусад",
    ]).map((item) => ({
      firedreason_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.clothes_size_type.createMany({
    data: [
      ...["XS", "S", "M", "L", "XL", "XXL"].map((clothessize, index) => ({
        typeid: index + 1,
        clothessize,
        sizetype: "clothes",
      })),
      ...["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map(
        (clothessize, index) => ({
          typeid: index + 101,
          clothessize,
          sizetype: "shoes",
        })
      ),
    ],
    skipDuplicates: true,
  });

  await prisma.flanguages.createMany({
    data: entries(["Англи", "Хятад", "Солонгос", "Япон", "Орос", "Герман"]).map(
      (item) => ({
        flanguage_id: item.id,
        description: item.description,
      })
    ),
    skipDuplicates: true,
  });

  await prisma.lang_level.createMany({
    data: entries(["Анхан", "Дунд", "Ахисан", "Дээд", "Мэргэжлийн"]).map(
      (item) => ({
        langlevel_id: item.id,
        level_name: item.description,
      })
    ),
    skipDuplicates: true,
  });

  await prisma.driver_type.createMany({
    data: entries(["A", "B", "BC", "C", "D", "E"]).map((item) => ({
      driver_type_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  await prisma.talents.createMany({
    data: entries([
      "Дуулах",
      "Хөгжим",
      "Бүжиг",
      "Спорт",
      "Зурах",
      "Илтгэх",
    ]).map((item) => ({
      talent_id: item.id,
      description: item.description,
    })),
    skipDuplicates: true,
  });

  const cityData = Object.keys(locations).map((description, index) => ({
    city_id: index + 1,
    description,
    region_code: String(index + 1).padStart(2, "0"),
  }));

  await prisma.citytown.createMany({ data: cityData, skipDuplicates: true });

  let districtId = 1;
  const districtData = cityData.flatMap((city) =>
    locations[city.description].map((description) => ({
      district_id: districtId++,
      description,
      city_ident: city.city_id,
      region_code: city.region_code,
    }))
  );

  await prisma.district.createMany({
    data: districtData,
    skipDuplicates: true,
  });

  await prisma.employee.createMany({
    data: [
      {
        employee_id: 1,
        name: "Бат",
        surname: "Дорж",
        fullname: "Дорж Бат",
        dep_ident: 1,
        post: "Гүйцэтгэх захирал",
        occupation_ident: 1,
        education_ident: 5,
        degree_ident: 2,
        email: "bat@example.com",
        workphone: "70000001",
        status: "active",
        branch_ident: 1,
        bank_ident: 1,
        schedule: 1,
        office_ident: 1,
        salary: 0,
        working_year: 5,
        workyear_sector: 5,
      },
      {
        employee_id: 2,
        name: "Саруул",
        surname: "Болд",
        fullname: "Болд Саруул",
        dep_ident: 3,
        post: "Хүний нөөцийн менежер",
        occupation_ident: 2,
        education_ident: 6,
        degree_ident: 2,
        email: "saruul@example.com",
        workphone: "70000002",
        status: "active",
        branch_ident: 1,
        bank_ident: 1,
        schedule: 1,
        office_ident: 1,
        salary: 0,
        working_year: 3,
        workyear_sector: 3,
      },
      {
        employee_id: 3,
        name: "Энх",
        surname: "Ган",
        fullname: "Ган Энх",
        dep_ident: 2,
        post: "Нягтлан бодогч",
        occupation_ident: 3,
        education_ident: 6,
        degree_ident: 2,
        email: "enkh@example.com",
        workphone: "70000003",
        status: "active",
        branch_ident: 1,
        bank_ident: 3,
        schedule: 1,
        office_ident: 1,
        salary: 0,
        working_year: 2,
        workyear_sector: 2,
      },
    ],
    skipDuplicates: true,
  });

  await Promise.all([
    resetSequence("hr_office", "office_id"),
    resetSequence("shifts", "id"),
    resetSequence("schedule", "sched_id"),
    resetSequence("deps", "dep_id"),
    resetSequence("branch", "branch_id"),
    resetSequence("occupation", "occupation_id"),
    resetSequence("profession_type", "professiontype_id"),
    resetSequence("education", "education_id"),
    resetSequence("degree", "degree_id"),
    resetSequence("graduate", "graduate_id"),
    resetSequence("edu_type", "education_id"),
    resetSequence("spec_edu_type", "spec_edu_type_id"),
    resetSequence("country", "country_ident"),
    resetSequence("nationality", "nationality_id"),
    resetSequence("niigmiin_garal", "niigmiin_garal_id"),
    resetSequence("voting_work", "voting_work_id"),
    resetSequence("marital_status", "maritalstatus_id"),
    resetSequence("apartment_cond", "apartcond_id"),
    resetSequence("carown_cond", "carowncond_id"),
    resetSequence("work_skill", "wskill_id"),
    resetSequence("banks", "bank_id"),
    resetSequence("insur_type", "insur_id"),
    resetSequence("fired_reason", "firedreason_id"),
    resetSequence("clothes_size_type", "typeid"),
    resetSequence("flanguages", "flanguage_id"),
    resetSequence("lang_level", "langlevel_id"),
    resetSequence("driver_type", "driver_type_id"),
    resetSequence("talents", "talent_id"),
    resetSequence("citytown", "city_id"),
    resetSequence("district", "district_id"),
    resetSequence("employee", "employee_id"),
  ]);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
