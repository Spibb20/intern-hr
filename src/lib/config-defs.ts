import type { ConfigModel, FieldType } from "@/lib/types";

export interface ConfigFieldMeta {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  optionsKey?: string;
  placeholder?: string;
}

export interface ConfigDef {
  model: ConfigModel;
  title: string;
  prisma: string;
  idKey: string;
  labelKey: string;
  fields: ConfigFieldMeta[];
  orderBy?: string;
}

export const CONFIG_DEFS: Record<string, ConfigDef> = {
  occupations: {
    model: "occupations",
    title: "Албан тушаал",
    prisma: "occupation",
    idKey: "occupation_id",
    labelKey: "description",
    fields: [
      {
        key: "description",
        label: "Нэр",
        type: "text",
        required: true,
        placeholder: "Жишээ: Нягтлан бодогч",
      },
      {
        key: "sched_id",
        label: "Schedule",
        type: "select",
        optionsKey: "schedules",
      },
      { key: "occupation_character", label: "Шинж", type: "text" },
      { key: "oclass_code", label: "Ангилал", type: "text" },
      { key: "oclass_code2024", label: "Ангилал 2024", type: "text" },
    ],
  },
  education: {
    model: "education",
    title: "Боловсрол",
    prisma: "education",
    idKey: "education_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
    ],
  },
  graduates: {
    model: "graduates",
    title: "Төгссөн сургууль",
    prisma: "graduate",
    idKey: "graduate_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
    ],
  },
  banks: {
    model: "banks",
    title: "Банк",
    prisma: "banks",
    idKey: "bank_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Банк", type: "text", required: true },
      { key: "bank_code", label: "Код", type: "text" },
      { key: "banknumber", label: "Данс", type: "text" },
      { key: "phone", label: "Утас", type: "text" },
      { key: "email", label: "Имэйл", type: "text" },
      {
        key: "country_ident",
        label: "Улс",
        type: "select",
        optionsKey: "countries",
      },
    ],
  },
  branches: {
    model: "branches",
    title: "Салбар",
    prisma: "branch",
    idKey: "branch_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Салбар", type: "text", required: true },
      {
        key: "status",
        label: "Төлөв",
        type: "number",
        required: true,
        placeholder: "1",
      },
      { key: "boss", label: "Захирал", type: "text" },
      { key: "legal_name", label: "Хуулийн нэр", type: "text" },
      { key: "registerno", label: "Регистр", type: "text" },
      { key: "phone", label: "Утас", type: "text" },
      { key: "email", label: "Имэйл", type: "text" },
    ],
  },
  countries: {
    model: "countries",
    title: "Улс",
    prisma: "country",
    idKey: "country_ident",
    labelKey: "description",
    fields: [
      { key: "description", label: "Улс", type: "text", required: true },
      { key: "country_code", label: "Код", type: "text" },
      { key: "code4bank", label: "Банк код", type: "text" },
    ],
  },
  nationalities: {
    model: "nationalities",
    title: "Үндэс угсаа",
    prisma: "nationality",
    idKey: "nationality_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
    ],
  },
  "marital-status": {
    model: "marital-status",
    title: "Гэрлэлтийн төлөв",
    prisma: "marital_status",
    idKey: "maritalstatus_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Төлөв", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "work-skills": {
    model: "work-skills",
    title: "Ур чадвар",
    prisma: "work_skill",
    idKey: "wskill_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
      { key: "cost_normal", label: "Энгийн үнэ", type: "decimal" },
      { key: "cost_hard", label: "Хүнд үнэ", type: "decimal" },
      { key: "cost_other", label: "Бусад үнэ", type: "decimal" },
    ],
  },
  shifts: {
    model: "shifts",
    title: "Ээлж",
    prisma: "shifts",
    idKey: "id",
    labelKey: "name",
    fields: [{ key: "name", label: "Ээлж", type: "text", required: true }],
  },
  schedules: {
    model: "schedules",
    title: "Цагийн хуваарь",
    prisma: "schedule",
    idKey: "sched_id",
    labelKey: "sched_name",
    fields: [
      { key: "sched_name", label: "Нэр", type: "text", required: true },
      { key: "work_day", label: "Ажлын өдөр", type: "number", required: true },
      {
        key: "holiday",
        label: "Амралтын өдөр",
        type: "number",
        required: true,
      },
    ],
  },
  offices: {
    model: "offices",
    title: "Оффис",
    prisma: "hr_office",
    idKey: "office_id",
    labelKey: "name",
    fields: [{ key: "name", label: "Оффис", type: "text", required: true }],
  },
  degrees: {
    model: "degrees",
    title: "Зэрэг",
    prisma: "degree",
    idKey: "degree_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Зэрэг", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "insurance-types": {
    model: "insurance-types",
    title: "Даатгалын төрөл",
    prisma: "insur_type",
    idKey: "insur_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
      { key: "insur_code", label: "Код", type: "text" },
      { key: "sal_type", label: "Цалингийн төрөл", type: "number" },
      { key: "ndsh_percent", label: "НДШ %", type: "decimal" },
      { key: "emp_percent", label: "Ажилтан %", type: "decimal" },
    ],
  },
  "fired-reasons": {
    model: "fired-reasons",
    title: "Гарсан шалтгаан",
    prisma: "fired_reason",
    idKey: "firedreason_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Шалтгаан", type: "text", required: true },
    ],
  },
  "apartment-conditions": {
    model: "apartment-conditions",
    title: "Орон сууцны нөхцөл",
    prisma: "apartment_cond",
    idKey: "apartcond_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нөхцөл", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "car-ownership": {
    model: "car-ownership",
    title: "Машин эзэмшил",
    prisma: "carown_cond",
    idKey: "carowncond_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нөхцөл", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "social-origin": {
    model: "social-origin",
    title: "Нийгмийн гарал",
    prisma: "niigmiin_garal",
    idKey: "niigmiin_garal_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "voting-work": {
    model: "voting-work",
    title: "Сонгуулийн ажил",
    prisma: "voting_work",
    idKey: "voting_work_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
    ],
  },
  "clothes-sizes": {
    model: "clothes-sizes",
    title: "Хувцас/гутлын хэмжээ",
    prisma: "clothes_size_type",
    idKey: "typeid",
    labelKey: "clothessize",
    fields: [
      { key: "clothessize", label: "Хэмжээ", type: "text", required: true },
      {
        key: "sizetype",
        label: "Төрөл",
        type: "text",
        required: true,
        placeholder: "clothes/shoes",
      },
      { key: "size_other_man", label: "Эрэгтэй", type: "text" },
      { key: "size_other_woman", label: "Эмэгтэй", type: "text" },
    ],
  },
  "education-types": {
    model: "education-types",
    title: "Боловсролын төрөл",
    prisma: "edu_type",
    idKey: "education_id",
    labelKey: "name",
    fields: [
      { key: "name", label: "Нэр", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "special-education-types": {
    model: "special-education-types",
    title: "Мэргэжлийн сургалтын төрөл",
    prisma: "spec_edu_type",
    idKey: "spec_edu_type_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
    ],
  },
  "foreign-languages": {
    model: "foreign-languages",
    title: "Гадаад хэл",
    prisma: "flanguages",
    idKey: "flanguage_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Хэл", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  "driver-types": {
    model: "driver-types",
    title: "Жолооны ангилал",
    prisma: "driver_type",
    idKey: "driver_type_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Ангилал", type: "text", required: true },
      { key: "rpl_local", label: "Local", type: "text" },
    ],
  },
  talents: {
    model: "talents",
    title: "Авьяас",
    prisma: "talents",
    idKey: "talent_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Авьяас", type: "text", required: true },
    ],
  },
  cities: {
    model: "cities",
    title: "Хот/аймаг",
    prisma: "citytown",
    idKey: "city_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
      { key: "region_code", label: "Код", type: "text" },
    ],
  },
  districts: {
    model: "districts",
    title: "Дүүрэг/сум",
    prisma: "district",
    idKey: "district_id",
    labelKey: "description",
    fields: [
      { key: "description", label: "Нэр", type: "text", required: true },
      {
        key: "city_ident",
        label: "Хот/аймаг",
        type: "select",
        required: true,
        optionsKey: "cities",
      },
      { key: "code", label: "Код", type: "number" },
      { key: "loc_code", label: "Байршлын код", type: "number" },
      { key: "region_code", label: "Бүсийн код", type: "text" },
    ],
  },
};

export const CONFIG_MODELS = Object.keys(CONFIG_DEFS);
