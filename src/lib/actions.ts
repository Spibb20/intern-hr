"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { CONFIG_DEFS } from "@/lib/config-defs";

export interface EmployeeInput {
  name: string;
  surname?: string;
  ovog?: string;
  urgiinOvog?: string;
  empno?: string;
  registerno?: string;
  gender?: string;
  birthday?: string;
  email?: string;
  workphone?: string;
  homephone?: string;
  phone2?: string;
  post?: string;
  status?: string;
  photoUrl?: string | null;
  depIdent?: string | null;
  occupationIdent?: string | null;
  occupationIdent2?: string | null;
  educationIdent?: string | null;
  graduateIdent?: string | null;
  wskillIdent?: string | null;
  branchIdent?: string | null;
  bankIdent?: string | null;
  contractNum?: string;
  schedule?: string | null;
  officeIdent?: string | null;
  nationalityIdent?: string | null;
  niigmiinGaralIdent?: string | null;
  countryIdent?: string | null;
  votingWorkIdent?: string | null;
  maritalstatusIdent?: string | null;
  apartcondIdent?: string | null;
  carowncondIdent?: string | null;
  degreeIdent?: string | null;
  insurIdent?: string | null;
  firedreasonIdent?: string | null;
  clothessizeIdent?: string | null;
  shoessizeIdent?: string | null;
  income?: number | string;
  locCode?: string;
  foreignEmp?: string | null;
  disabledEmp?: string | null;
  takenLeave?: string | null;
  leaveType?: string | null;
  limited?: string | null;
  wageTestEmp?: string | null;
  salary?: string;
  workingYear?: number;
  workyearSector?: number;
  inworkdate?: string;
  gDate?: string;
  gEnddate?: string;
  managerExp?: string;
  contractEmp?: string;
  jobType?: string;
  jobFigure?: string;
  passport?: string;
  ndno?: string;
  emdno?: string;
  ibankNumber?: string;
  bloodType?: string;
  grade?: string;
  gradeLevel?: string;
  gradePerc?: string;
  perc1?: string;
  perc2?: string;
  salPercent?: string;
  salAmount?: string;
  gradeAmount?: string;
  commandNo?: string;
  commandDescription?: string;
  etaxCode?: string;
  workEmail?: string;
  workPhone?: string;
  workMobile?: string;
  avatarUrl?: string | null;
  tagIds?: string[];
  jobPositionId?: string | null;
  jobTitle?: string;
  departmentId?: string | null;
  managerId?: string | null;
  employeeTypeId?: string | null;
  workLocationId?: string | null;
  company?: string;
  privateEmail?: string;
  privatePhone?: string;
  privateAddress?: string;
  dateOfBirth?: string;
  monthlyHours?: number;
  kanbanState?: string;
}

function trimmed(value?: string | null, max?: number): string | null {
  const clean = value == null ? "" : String(value).trim();
  if (!clean) return null;
  return max ? clean.slice(0, max) : clean;
}

function requiredText(value: unknown, label: string, max?: number): string {
  const clean = String(value ?? "").trim();
  if (!clean) throw new Error(`${label} шаардлагатай`);
  return max ? clean.slice(0, max) : clean;
}

function nullableInt(value?: string | null): number | null {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function requiredInt(value: unknown, label: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) throw new Error(`${label} зөв тоо байх ёстой`);
  return parsed;
}

function optionalNumber(value: unknown): number | undefined {
  if (value == null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function date(value?: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function money(value?: string | null): string | undefined {
  if (value == null || value === "") return undefined;
  const parsed = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? String(parsed) : undefined;
}

function employeeData(input: EmployeeInput) {
  const name = requiredText(input.name, "Нэр", 25);
  const surname = trimmed(input.surname, 25);
  const fullname = [surname, name].filter(Boolean).join(" ");
  return {
    name,
    surname,
    fullname: fullname || name,
    ovog: trimmed(input.ovog, 25),
    urgiin_ovog: trimmed(input.urgiinOvog, 100),
    empno: trimmed(input.empno, 10),
    registerno: trimmed(input.registerno, 20),
    gender: trimmed(input.gender, 1),
    birthday: date(input.birthday ?? input.dateOfBirth),
    email: trimmed(input.email ?? input.workEmail, 50),
    workphone: trimmed(input.workphone ?? input.workPhone, 14),
    homephone: trimmed(input.homephone ?? input.privatePhone, 14),
    phone2: trimmed(input.phone2 ?? input.workMobile, 14),
    post: trimmed(input.post ?? input.jobTitle, 25),
    status: trimmed(input.status, 8) ?? "active",
    photo_url: trimmed(input.photoUrl ?? input.avatarUrl, 300),
    dep_ident: nullableInt(input.depIdent ?? input.departmentId),
    occupation_ident: nullableInt(input.occupationIdent ?? input.jobPositionId),
    occupation_ident2: nullableInt(input.occupationIdent2),
    education_ident: nullableInt(input.educationIdent),
    graduate_ident: nullableInt(input.graduateIdent),
    wskill_ident: nullableInt(input.wskillIdent),
    branch_ident: nullableInt(input.branchIdent),
    bank_ident: nullableInt(input.bankIdent),
    contract_num: trimmed(input.contractNum, 10),
    schedule: nullableInt(input.schedule),
    office_ident: nullableInt(input.officeIdent ?? input.workLocationId),
    nationality_ident: nullableInt(input.nationalityIdent),
    niigmiin_garal_ident: nullableInt(input.niigmiinGaralIdent),
    country_ident: nullableInt(input.countryIdent),
    voting_work_ident: nullableInt(input.votingWorkIdent),
    maritalstatus_ident: nullableInt(input.maritalstatusIdent),
    apartcond_ident: nullableInt(input.apartcondIdent),
    carowncond_ident: nullableInt(input.carowncondIdent),
    degree_ident: nullableInt(input.degreeIdent),
    insur_ident: nullableInt(input.insurIdent),
    firedreason_ident: nullableInt(input.firedreasonIdent),
    clothessize_ident: nullableInt(input.clothessizeIdent),
    shoessize_ident: nullableInt(input.shoessizeIdent),
    income: optionalNumber(input.income),
    loc_code: trimmed(input.locCode, 4),
    foreign_emp: nullableInt(input.foreignEmp),
    disabled_emp: nullableInt(input.disabledEmp),
    taken_leave: nullableInt(input.takenLeave),
    leave_type: nullableInt(input.leaveType),
    limited: nullableInt(input.limited),
    wagetest_emp: nullableInt(input.wageTestEmp),
    salary: money(input.salary) ?? "0",
    working_year: input.workingYear ?? 0,
    workyear_sector: input.workyearSector ?? 0,
    inworkdate: date(input.inworkdate),
    g_date: date(input.gDate),
    g_enddate: date(input.gEnddate),
    manager_exp: trimmed(input.managerExp, 12) ?? "no",
    contract_emp: trimmed(input.contractEmp, 12) ?? "no",
    job_type: trimmed(input.jobType, 20),
    job_figure: trimmed(input.jobFigure, 20) ?? "Main",
    passport: trimmed(input.passport, 14),
    ndno: trimmed(input.ndno, 14),
    emdno: trimmed(input.emdno, 14),
    ibank_number: trimmed(input.ibankNumber, 20),
    blood_type: trimmed(input.bloodType, 2),
    grade: trimmed(input.grade, 1),
    grade_level: trimmed(input.gradeLevel, 10),
    grade_perc: money(input.gradePerc) ?? "0",
    perc1: money(input.perc1) ?? "0",
    perc2: money(input.perc2) ?? "0",
    sal_percent: money(input.salPercent) ?? "0",
    sal_amount: money(input.salAmount) ?? "0",
    grade_amount: money(input.gradeAmount) ?? "0",
    command_no: trimmed(input.commandNo, 10),
    command_description: trimmed(input.commandDescription, 100),
    etax_code: trimmed(input.etaxCode, 30),
  };
}

function employeeId(value: string): number {
  return requiredInt(value, "Ажилтны ID");
}

function revalidateEmployeeViews(id?: string) {
  revalidatePath("/employees");
  revalidatePath("/departments");
  revalidatePath("/dashboard");
  if (id) revalidatePath(`/employees/${id}`);
}

export async function createEmployee(input: EmployeeInput): Promise<string> {
  const created = await prisma.employee.create({
    data: employeeData(input),
    select: { employee_id: true },
  });
  const id = String(created.employee_id);
  revalidateEmployeeViews(id);
  return id;
}

export async function updateEmployee(
  idValue: string,
  input: EmployeeInput
): Promise<void> {
  await prisma.employee.update({
    where: { employee_id: employeeId(idValue) },
    data: employeeData(input),
  });
  revalidateEmployeeViews(idValue);
}

export async function deleteEmployee(idValue: string): Promise<void> {
  await prisma.employee.delete({ where: { employee_id: employeeId(idValue) } });
  revalidateEmployeeViews(idValue);
}

export async function archiveEmployee(idValue: string): Promise<void> {
  await prisma.employee.update({
    where: { employee_id: employeeId(idValue) },
    data: { status: "inactive" },
  });
  revalidateEmployeeViews(idValue);
}

export async function createDepartment(input: {
  name: string;
  parentId?: string | null;
  schedule?: string | null;
  officeIdent?: string | null;
}): Promise<string> {
  const created = await prisma.deps.create({
    data: {
      name: requiredText(input.name, "Хэлтэс", 25),
      parent_id: nullableInt(input.parentId),
      schedule: nullableInt(input.schedule),
      office_ident: nullableInt(input.officeIdent),
    },
    select: { dep_id: true },
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
  return String(created.dep_id);
}

export async function updateDepartment(
  idValue: string,
  input: {
    name?: string;
    parentId?: string | null;
    schedule?: string | null;
    officeIdent?: string | null;
  }
): Promise<void> {
  await prisma.deps.update({
    where: { dep_id: requiredInt(idValue, "Хэлтсийн ID") },
    data: {
      ...(input.name !== undefined
        ? { name: requiredText(input.name, "Хэлтэс", 25) }
        : {}),
      ...(input.parentId !== undefined
        ? { parent_id: nullableInt(input.parentId) }
        : {}),
      ...(input.schedule !== undefined
        ? { schedule: nullableInt(input.schedule) }
        : {}),
      ...(input.officeIdent !== undefined
        ? { office_ident: nullableInt(input.officeIdent) }
        : {}),
    },
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
}

export async function deleteDepartment(idValue: string): Promise<void> {
  await prisma.deps.delete({
    where: { dep_id: requiredInt(idValue, "Хэлтсийн ID") },
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
}

function configValue(
  type: string,
  raw: unknown,
  required: boolean | undefined,
  label: string
) {
  if (raw == null || raw === "") {
    if (required) throw new Error(`${label} шаардлагатай`);
    return undefined;
  }
  if (type === "number" || type === "select")
    return required ? requiredInt(raw, label) : optionalNumber(raw);
  if (type === "decimal") return money(String(raw));
  if (type === "date") return date(String(raw));
  return String(raw).trim();
}

function configData(model: string, input: Record<string, unknown>) {
  const def = CONFIG_DEFS[model];
  if (!def) throw new Error("Тохиргооны төрөл олдсонгүй");
  const data: Record<string, unknown> = {};
  for (const field of def.fields) {
    const value = configValue(
      field.type,
      input[field.key],
      field.required,
      field.label
    );
    if (value !== undefined) data[field.key] = value;
  }
  return data;
}

export async function createConfigItem(
  model: string,
  data: Record<string, unknown>
): Promise<string> {
  const def = CONFIG_DEFS[model];
  if (!def) throw new Error("Тохиргооны төрөл олдсонгүй");
  const delegate = (
    prisma as unknown as Record<
      string,
      { create: (args: unknown) => Promise<Record<string, unknown>> }
    >
  )[def.prisma];
  const created = await delegate.create({
    data: configData(model, data),
    select: { [def.idKey]: true },
  });
  revalidatePath(`/configuration/${model}`);
  revalidatePath("/employees");
  return String(created[def.idKey]);
}

export async function updateConfigItem(
  model: string,
  idValue: string,
  data: Record<string, unknown>
): Promise<void> {
  const def = CONFIG_DEFS[model];
  if (!def) throw new Error("Тохиргооны төрөл олдсонгүй");
  const delegate = (
    prisma as unknown as Record<
      string,
      { update: (args: unknown) => Promise<unknown> }
    >
  )[def.prisma];
  await delegate.update({
    where: { [def.idKey]: requiredInt(idValue, "ID") },
    data: configData(model, data),
  });
  revalidatePath(`/configuration/${model}`);
  revalidatePath("/employees");
}

export async function deleteConfigItem(
  model: string,
  idValue: string
): Promise<void> {
  const def = CONFIG_DEFS[model];
  if (!def) throw new Error("Тохиргооны төрөл олдсонгүй");
  const delegate = (
    prisma as unknown as Record<
      string,
      { delete: (args: unknown) => Promise<unknown> }
    >
  )[def.prisma];
  await delegate.delete({ where: { [def.idKey]: requiredInt(idValue, "ID") } });
  revalidatePath(`/configuration/${model}`);
  revalidatePath("/employees");
}
