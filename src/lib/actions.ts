"use server";

// Write-side data access (mutations) exposed as Server Actions.
// On migration to PostgreSQL, replace the store operations with parameterized
// INSERT/UPDATE/DELETE statements; the action signatures remain the same.

import { revalidatePath } from "next/cache";
import { genId, store, timestamps, touch } from "@/lib/db/store";
import type { ConfigModel, Employee } from "@/lib/types";

// --- Employees ------------------------------------------------------------

export interface EmployeeInput {
  name: string;
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
  gender?: Employee["gender"];
  dateOfBirth?: string;
  nationality?: string;
  maritalStatus?: Employee["maritalStatus"];
  monthlyHours?: number;
  kanbanState?: Employee["kanbanState"];
}

function normalize(
  input: EmployeeInput
): Omit<Employee, "id" | "createdAt" | "updatedAt" | "active"> {
  return {
    name: input.name.trim(),
    workEmail: input.workEmail?.trim() ?? "",
    workPhone: input.workPhone?.trim() ?? "",
    workMobile: input.workMobile?.trim() ?? "",
    avatarUrl: input.avatarUrl ?? null,
    tagIds: input.tagIds ?? [],
    jobPositionId: input.jobPositionId || null,
    jobTitle: input.jobTitle?.trim() ?? "",
    departmentId: input.departmentId || null,
    managerId: input.managerId || null,
    employeeTypeId: input.employeeTypeId || null,
    workLocationId: input.workLocationId || null,
    company: input.company?.trim() ?? "",
    privateEmail: input.privateEmail?.trim() ?? "",
    privatePhone: input.privatePhone?.trim() ?? "",
    privateAddress: input.privateAddress?.trim() ?? "",
    gender: input.gender ?? "",
    dateOfBirth: input.dateOfBirth ?? "",
    nationality: input.nationality?.trim() ?? "",
    maritalStatus: input.maritalStatus ?? "",
    monthlyHours: input.monthlyHours ?? 0,
    kanbanState: input.kanbanState ?? "normal",
  };
}

export async function createEmployee(input: EmployeeInput): Promise<string> {
  if (!input.name?.trim()) throw new Error("Employee name is required");
  const id = genId("emp");
  store.employees.push({
    id,
    active: true,
    ...normalize(input),
    ...timestamps(),
  });
  revalidatePath("/employees");
  revalidatePath("/departments");
  return id;
}

export async function updateEmployee(
  id: string,
  input: EmployeeInput
): Promise<void> {
  const idx = store.employees.findIndex((e) => e.id === id);
  if (idx === -1) throw new Error("Employee not found");
  store.employees[idx] = {
    ...store.employees[idx],
    ...normalize(input),
    ...touch(),
  };
  revalidatePath("/employees");
  revalidatePath(`/employees/${id}`);
  revalidatePath("/departments");
}

export async function deleteEmployee(id: string): Promise<void> {
  const idx = store.employees.findIndex((e) => e.id === id);
  if (idx !== -1) store.employees.splice(idx, 1);
  revalidatePath("/employees");
  revalidatePath("/departments");
}

// --- Departments ----------------------------------------------------------

export async function createDepartment(input: {
  name: string;
  managerId?: string | null;
  parentId?: string | null;
  color?: string;
}): Promise<string> {
  if (!input.name?.trim()) throw new Error("Department name is required");
  const colors = ["#22d3ee", "#d946a6", "#34d399", "#f59e0b", "#60a5fa"];
  const id = genId("dep");
  store.departments.push({
    id,
    name: input.name.trim(),
    managerId: input.managerId || null,
    parentId: input.parentId || null,
    color: input.color || colors[store.departments.length % colors.length],
    ...timestamps(),
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
  return id;
}

export async function updateDepartment(
  id: string,
  input: { name?: string; managerId?: string | null; color?: string }
): Promise<void> {
  const idx = store.departments.findIndex((d) => d.id === id);
  if (idx === -1) throw new Error("Department not found");
  const dep = store.departments[idx];
  store.departments[idx] = {
    ...dep,
    name: input.name?.trim() ?? dep.name,
    managerId:
      input.managerId === undefined ? dep.managerId : input.managerId || null,
    color: input.color ?? dep.color,
    ...touch(),
  };
  revalidatePath("/departments");
}

export async function deleteDepartment(id: string): Promise<void> {
  const idx = store.departments.findIndex((d) => d.id === id);
  if (idx !== -1) store.departments.splice(idx, 1);
  store.employees.forEach((e) => {
    if (e.departmentId === id) e.departmentId = null;
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
}

// --- Generic configuration models ----------------------------------------

const configCollections = {
  "job-positions": () => store.jobPositions,
  "employee-types": () => store.employeeTypes,
  "work-locations": () => store.workLocations,
  tags: () => store.tags,
  "departure-reasons": () => store.departureReasons,
} as const;

const idPrefix: Record<ConfigModel, string> = {
  "job-positions": "job",
  "employee-types": "et",
  "work-locations": "wl",
  tags: "tag",
  "departure-reasons": "dr",
};

export async function createConfigItem(
  model: ConfigModel,
  data: Record<string, unknown>
): Promise<string> {
  const name = String(data.name ?? "").trim();
  if (!name) throw new Error("Name is required");
  const id = genId(idPrefix[model]);
  const base: Record<string, unknown> = { id, name, ...timestamps() };

  switch (model) {
    case "job-positions":
      base.departmentId = (data.departmentId as string) || null;
      break;
    case "work-locations":
      base.address = String(data.address ?? "");
      base.locationType = (data.locationType as string) || "office";
      break;
    case "tags":
      base.color = String(data.color ?? "#b45309");
      break;
  }

  // @ts-expect-error generic push into the matching collection
  configCollections[model]().push(base);
  revalidatePath(`/configuration/${model}`);
  return id;
}

export async function updateConfigItem(
  model: ConfigModel,
  id: string,
  data: Record<string, unknown>
): Promise<void> {
  const collection = configCollections[model]() as unknown as Array<
    Record<string, unknown>
  >;
  const idx = collection.findIndex((item) => item.id === id);
  if (idx === -1) throw new Error("Item not found");
  collection[idx] = { ...collection[idx], ...data, ...touch() };
  revalidatePath(`/configuration/${model}`);
}

export async function deleteConfigItem(
  model: ConfigModel,
  id: string
): Promise<void> {
  const collection = configCollections[model]() as unknown as Array<
    Record<string, unknown>
  >;
  const idx = collection.findIndex((item) => item.id === id);
  if (idx !== -1) collection.splice(idx, 1);
  revalidatePath(`/configuration/${model}`);
}
