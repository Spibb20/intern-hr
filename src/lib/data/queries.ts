import { prisma } from "@/lib/db/prisma";
import { CONFIG_DEFS } from "@/lib/config-defs";
import type { Department, EmployeeWithRelations, Option } from "@/lib/types";

const palette = ["#6b7280", "#64748b", "#78716c", "#475569", "#52525b"];

function text(value: unknown): string {
  return value == null ? "" : String(value).trim();
}

function id(value: unknown): string | null {
  return value == null ? null : String(value);
}

function dateOnly(value: Date | string | null | undefined): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function decimal(value: unknown): string {
  if (value == null) return "0";
  return String(value);
}

function num(value: unknown): number {
  if (typeof value === "number") return value;
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function colorFor(value: unknown): string {
  return palette[Math.abs(num(value)) % palette.length];
}

function activeFrom(row: Record<string, unknown>): boolean {
  const status = text(row.status).toLowerCase();
  const died = text(row.died).toLowerCase();
  return status !== "inactive" && status !== "fired" && died !== "yes";
}

function displayName(row: Record<string, unknown>): string {
  const full = text(row.fullname);
  if (full) return full;
  return (
    [text(row.surname), text(row.name)].filter(Boolean).join(" ") ||
    `Ажилтан ${row.employee_id}`
  );
}

function relation(
  row: unknown,
  idKey: string,
  labelKey: string
): Option | null {
  if (!row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;
  const value = record[idKey];
  if (value == null) return null;
  return { id: String(value), name: text(record[labelKey]) || String(value) };
}

function mapDepartment(row: Record<string, unknown>): Department {
  const parent = row.parent as Record<string, unknown> | undefined;
  const shift = row.shift as Record<string, unknown> | undefined;
  const office = row.office as Record<string, unknown> | undefined;
  return {
    id: String(row.dep_id),
    name: text(row.name) || `Хэлтэс ${row.dep_id}`,
    parentId: id(row.parent_id),
    parentName: parent ? text(parent.name) : null,
    scheduleId: id(row.schedule),
    scheduleName: shift ? text(shift.name) : null,
    officeId: id(row.office_ident),
    officeName: office ? text(office.name) : null,
    color: colorFor(row.dep_id),
  };
}

function mapEmployee(row: Record<string, unknown>): EmployeeWithRelations {
  const department = row.dep
    ? mapDepartment(row.dep as Record<string, unknown>)
    : null;
  const branch = relation(row.branch, "branch_id", "description");
  const office = relation(row.office, "office_id", "name");
  const marital = relation(
    row.marital_status,
    "maritalstatus_id",
    "description"
  );
  const employee: EmployeeWithRelations = {
    id: String(row.employee_id),
    employeeId: num(row.employee_id),
    name: displayName(row),
    firstName: text(row.name),
    surname: text(row.surname),
    ovog: text(row.ovog),
    urgiinOvog: text(row.urgiin_ovog),
    empno: text(row.empno),
    registerno: text(row.registerno),
    gender: text(row.gender),
    birthday: dateOnly(row.birthday as Date | null),
    email: text(row.email),
    workphone: text(row.workphone),
    homephone: text(row.homephone),
    phone2: text(row.phone2),
    post: text(row.post),
    status: text(row.status) || "active",
    active: activeFrom(row),
    photoUrl: text(row.photo_url) || null,
    depIdent: id(row.dep_ident),
    occupationIdent: id(row.occupation_ident),
    occupationIdent2: id(row.occupation_ident2),
    educationIdent: id(row.education_ident),
    graduateIdent: id(row.graduate_ident),
    wskillIdent: id(row.wskill_ident),
    branchIdent: id(row.branch_ident),
    bankIdent: id(row.bank_ident),
    contractNum: text(row.contract_num),
    schedule: id(row.schedule),
    officeIdent: id(row.office_ident),
    nationalityIdent: id(row.nationality_ident),
    niigmiinGaralIdent: id(row.niigmiin_garal_ident),
    countryIdent: id(row.country_ident),
    votingWorkIdent: id(row.voting_work_ident),
    maritalstatusIdent: id(row.maritalstatus_ident),
    apartcondIdent: id(row.apartcond_ident),
    carowncondIdent: id(row.carowncond_ident),
    degreeIdent: id(row.degree_ident),
    insurIdent: id(row.insur_ident),
    firedreasonIdent: id(row.firedreason_ident),
    clothessizeIdent: id(row.clothessize_ident),
    shoessizeIdent: id(row.shoessize_ident),
    income: num(row.income),
    locCode: text(row.loc_code),
    foreignEmp: id(row.foreign_emp),
    disabledEmp: id(row.disabled_emp),
    takenLeave: id(row.taken_leave),
    leaveType: id(row.leave_type),
    limited: id(row.limited),
    wageTestEmp: id(row.wagetest_emp),
    salary: decimal(row.salary),
    workingYear: num(row.working_year),
    workyearSector: num(row.workyear_sector),
    inworkdate: dateOnly(row.inworkdate as Date | null),
    gDate: dateOnly(row.g_date as Date | null),
    gEnddate: dateOnly(row.g_enddate as Date | null),
    managerExp: text(row.manager_exp) || "no",
    contractEmp: text(row.contract_emp) || "no",
    jobType: text(row.job_type),
    jobFigure: text(row.job_figure) || "Main",
    passport: text(row.passport),
    ndno: text(row.ndno),
    emdno: text(row.emdno),
    ibankNumber: text(row.ibank_number),
    bloodType: text(row.blood_type),
    grade: text(row.grade),
    gradeLevel: text(row.grade_level),
    gradePerc: decimal(row.grade_perc),
    perc1: decimal(row.perc1),
    perc2: decimal(row.perc2),
    salPercent: decimal(row.sal_percent),
    salAmount: decimal(row.sal_amount),
    gradeAmount: decimal(row.grade_amount),
    commandNo: text(row.command_no),
    commandDescription: text(row.command_description),
    etaxCode: text(row.etax_code),
    department,
    jobPosition: relation(row.occupation, "occupation_id", "description"),
    jobPosition2: relation(row.occupation2, "occupation_id", "description"),
    education: relation(row.education, "education_id", "description"),
    graduate: relation(row.graduate, "graduate_id", "description"),
    workSkill: relation(row.work_skill, "wskill_id", "description"),
    bank: relation(row.bank, "bank_id", "description"),
    branch,
    shift: relation(row.shift, "id", "name"),
    office,
    nationality: relation(row.nationality, "nationality_id", "description"),
    niigmiinGaral: relation(
      row.niigmiin_garal,
      "niigmiin_garal_id",
      "description"
    ),
    country: relation(row.country, "country_ident", "description"),
    votingWork: relation(row.voting_work, "voting_work_id", "description"),
    maritalStatus: marital,
    apartmentCondition: relation(
      row.apartment_cond,
      "apartcond_id",
      "description"
    ),
    carOwnershipCondition: relation(
      row.carown_cond,
      "carowncond_id",
      "description"
    ),
    degree: relation(row.degree, "degree_id", "description"),
    insuranceType: relation(row.insur_type, "insur_id", "description"),
    firedReason: relation(row.fired_reason, "firedreason_id", "description"),
    clothesSize: relation(row.clothes_size, "typeid", "clothessize"),
    shoesSize: relation(row.shoes_size, "typeid", "clothessize"),
    kanbanState: activeFrom(row) ? "normal" : "blocked",
    workEmail: text(row.email),
    workPhone: text(row.workphone),
    workMobile: text(row.phone2) || text(row.homephone),
    avatarUrl: text(row.photo_url) || null,
    tagIds: [],
    jobTitle: text(row.post),
    departmentId: id(row.dep_ident),
    managerId: null,
    employeeTypeId: null,
    workLocationId: id(row.office_ident),
    company: branch?.name ?? "",
    privateEmail: text(row.email),
    privatePhone: text(row.homephone),
    privateAddress: "",
    dateOfBirth: dateOnly(row.birthday as Date | null),
    maritalStatusText: marital?.name ?? "",
    monthlyHours: 0,
    tags: [],
  };
  return employee;
}

const employeeInclude = {
  dep: { include: { parent: true, shift: true, office: true } },
  occupation: true,
  occupation2: true,
  education: true,
  graduate: true,
  work_skill: true,
  bank: true,
  branch: true,
  shift: true,
  office: true,
  nationality: true,
  niigmiin_garal: true,
  country: true,
  voting_work: true,
  marital_status: true,
  apartment_cond: true,
  carown_cond: true,
  degree: true,
  insur_type: true,
  fired_reason: true,
  clothes_size: true,
  shoes_size: true,
};

function toInt(value?: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : undefined;
}

export async function getDepartments(): Promise<Department[]> {
  const rows = await prisma.deps.findMany({
    orderBy: { name: "asc" },
    include: { parent: true, shift: true, office: true },
  });
  return rows.map((row: unknown) =>
    mapDepartment(row as unknown as Record<string, unknown>)
  );
}

export async function getDepartment(
  idValue: string
): Promise<Department | null> {
  const depId = toInt(idValue);
  if (depId == null) return null;
  const row = await prisma.deps.findUnique({
    where: { dep_id: depId },
    include: { parent: true, shift: true, office: true },
  });
  return row ? mapDepartment(row as unknown as Record<string, unknown>) : null;
}

export async function countEmployeesByDepartment(
  departmentId: string
): Promise<number> {
  const depId = toInt(departmentId);
  if (depId == null) return 0;
  return prisma.employee.count({ where: { dep_ident: depId } });
}

export interface DepartmentWithCount extends Department {
  employeeCount: number;
  managerName: string | null;
}

export async function getDepartmentsWithCounts(): Promise<
  DepartmentWithCount[]
> {
  const rows = await prisma.deps.findMany({
    orderBy: { name: "asc" },
    include: {
      parent: true,
      shift: true,
      office: true,
      _count: { select: { employees: true } },
    },
  });
  return rows.map((row: unknown) => {
    const record = row as unknown as Record<string, unknown> & {
      _count: { employees: number };
    };
    return {
      ...mapDepartment(record),
      employeeCount: record._count.employees,
      managerName: record.parent
        ? text((record.parent as Record<string, unknown>).name)
        : null,
    };
  });
}

export interface EmployeeQuery {
  search?: string;
  departmentId?: string;
}

export async function getEmployees(
  query: EmployeeQuery = {}
): Promise<EmployeeWithRelations[]> {
  const depId = toInt(query.departmentId);
  const search = text(query.search);
  const rows = await prisma.employee.findMany({
    where: {
      ...(depId != null ? { dep_ident: depId } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { surname: { contains: search, mode: "insensitive" } },
              { fullname: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { post: { contains: search, mode: "insensitive" } },
              { registerno: { contains: search, mode: "insensitive" } },
              { empno: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ employee_id: "desc" }],
    include: employeeInclude,
  });
  return rows.map((row: unknown) =>
    mapEmployee(row as unknown as Record<string, unknown>)
  );
}

export async function getEmployee(
  idValue: string
): Promise<EmployeeWithRelations | null> {
  const employeeId = toInt(idValue);
  if (employeeId == null) return null;
  const row = await prisma.employee.findUnique({
    where: { employee_id: employeeId },
    include: employeeInclude,
  });
  return row ? mapEmployee(row as unknown as Record<string, unknown>) : null;
}

function normalizeConfigRow(
  model: string,
  row: Record<string, unknown>
): Record<string, unknown> {
  const def = CONFIG_DEFS[model];
  const output: Record<string, unknown> = { id: String(row[def.idKey]) };
  for (const field of def.fields) {
    output[field.key] =
      field.type === "date"
        ? dateOnly(row[field.key] as Date | null)
        : row[field.key] == null
        ? ""
        : String(row[field.key]).trim();
  }
  return output;
}

export async function getConfigRows(
  model: string
): Promise<Record<string, unknown>[]> {
  const def = CONFIG_DEFS[model];
  if (!def) return [];
  const delegate = (
    prisma as unknown as Record<
      string,
      { findMany: (args: unknown) => Promise<Record<string, unknown>[]> }
    >
  )[def.prisma];
  const rows = await delegate.findMany({
    orderBy: { [def.orderBy ?? def.labelKey]: "asc" },
  });
  return rows.map((row: Record<string, unknown>) =>
    normalizeConfigRow(model, row)
  );
}

async function optionsFrom(model: string): Promise<Option[]> {
  const def = CONFIG_DEFS[model];
  const delegate = (
    prisma as unknown as Record<
      string,
      { findMany: (args: unknown) => Promise<Record<string, unknown>[]> }
    >
  )[def.prisma];
  const rows = await delegate.findMany({
    orderBy: { [def.orderBy ?? def.labelKey]: "asc" },
  });
  return rows.map((row: Record<string, unknown>) => ({
    id: String(row[def.idKey]),
    name: text(row[def.labelKey]) || String(row[def.idKey]),
  }));
}

export async function getFormOptions(): Promise<Record<string, Option[]>> {
  const [
    departments,
    occupations,
    educations,
    graduates,
    banks,
    branches,
    shifts,
    schedules,
    offices,
    workSkills,
    maritalStatuses,
    nationalities,
    countries,
    degrees,
    socialOrigins,
    votingWorks,
    driverTypes,
    foreignLanguages,
    professions,
    specializations,
    insuranceTypes,
    firedReasons,
    apartmentConds,
    carownConds,
    clothesSizes,
    cities,
  ] = await Promise.all([
    getDepartments().then((rows) =>
      rows.map((row) => ({ id: row.id, name: row.name, color: row.color }))
    ),
    optionsFrom("occupations"),
    optionsFrom("education"),
    optionsFrom("graduates"),
    optionsFrom("banks"),
    optionsFrom("branches"),
    optionsFrom("shifts"),
    optionsFrom("schedules"),
    optionsFrom("offices"),
    optionsFrom("work-skills"),
    optionsFrom("marital-status"),
    optionsFrom("nationalities"),
    optionsFrom("countries"),
    optionsFrom("degrees"),
    optionsFrom("social-origin"),
    optionsFrom("voting-work"),
    optionsFrom("driver-types"),
    optionsFrom("foreign-languages"),
    optionsFrom("professions"),
    optionsFrom("special-education-types"),
    optionsFrom("insurance-types"),
    optionsFrom("fired-reasons"),
    optionsFrom("apartment-conditions"),
    optionsFrom("car-ownership"),
    optionsFrom("clothes-sizes"),
    optionsFrom("cities"),
  ]);

  return {
    departments,
    occupations,
    jobPositions: occupations,
    educations,
    employeeTypes: [],
    workLocations: offices,
    tags: [],
    managers: [],
    graduates,
    banks,
    branches,
    shifts,
    schedules,
    offices,
    workSkills,
    maritalStatuses,
    nationalities,
    countries,
    degrees,
    socialOrigins,
    votingWorks,
    driverTypes,
    foreignLanguages,
    professions,
    specializations,
    insuranceTypes,
    firedReasons,
    apartmentConds,
    carownConds,
    clothesSizes,
    cities,
  };
}

export async function getDashboardStats(): Promise<{
  employeeCount: number;
  departmentCount: number;
  occupationCount: number;
  educationCount: number;
  recentEmployees: EmployeeWithRelations[];
}> {
  const [
    employeeCount,
    departmentCount,
    occupationCount,
    educationCount,
    recentEmployees,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.deps.count(),
    prisma.occupation.count(),
    prisma.education.count(),
    getEmployees(),
  ]);
  return {
    employeeCount,
    departmentCount,
    occupationCount,
    educationCount,
    recentEmployees: recentEmployees.slice(0, 8),
  };
}
