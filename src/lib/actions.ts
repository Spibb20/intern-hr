"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import type { ConfigModel, Employee } from "@/lib/types";

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

function emptyToNull(value?: string | null) {
  return value && value.trim() ? value : null;
}

function parseDate(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function uniqueIds(ids?: string[]) {
  return [...new Set((ids ?? []).filter(Boolean))];
}

function locationType(value: unknown): "office" | "home" | "other" {
  return value === "home" || value === "other" ? value : "office";
}

function normalize(input: EmployeeInput) {
  return {
    name: input.name.trim(),
    workEmail: input.workEmail?.trim() ?? "",
    workPhone: input.workPhone?.trim() ?? "",
    workMobile: input.workMobile?.trim() ?? "",
    avatarUrl: input.avatarUrl ?? null,
    jobPositionId: emptyToNull(input.jobPositionId),
    jobTitle: input.jobTitle?.trim() ?? "",
    departmentId: emptyToNull(input.departmentId),
    managerId: emptyToNull(input.managerId),
    employeeTypeId: emptyToNull(input.employeeTypeId),
    workLocationId: emptyToNull(input.workLocationId),
    company: input.company?.trim() ?? "",
    privateEmail: input.privateEmail?.trim() ?? "",
    privatePhone: input.privatePhone?.trim() ?? "",
    privateAddress: input.privateAddress?.trim() ?? "",
    gender: input.gender || null,
    dateOfBirth: parseDate(input.dateOfBirth),
    nationality: input.nationality?.trim() ?? "",
    maritalStatus: input.maritalStatus || null,
    monthlyHours: input.monthlyHours ?? 0,
    kanbanState: input.kanbanState ?? "normal",
  };
}

function revalidateEmployeeViews(id?: string) {
  revalidatePath("/employees");
  revalidatePath("/departments");
  if (id) revalidatePath(`/employees/${id}`);
}

export async function createEmployee(input: EmployeeInput): Promise<string> {
  if (!input.name?.trim()) throw new Error("Employee name is required");

  const employee = await prisma.employee.create({
    data: {
      ...normalize(input),
      active: true,
      tags: {
        create: uniqueIds(input.tagIds).map((tagId) => ({
          tag: { connect: { id: tagId } },
        })),
      },
    },
    select: { id: true },
  });

  revalidateEmployeeViews(employee.id);
  return employee.id;
}

export async function updateEmployee(
  id: string,
  input: EmployeeInput
): Promise<void> {
  if (!input.name?.trim()) throw new Error("Employee name is required");

  await prisma.$transaction([
    prisma.employeeTag.deleteMany({ where: { employeeId: id } }),
    prisma.employee.update({
      where: { id },
      data: {
        ...normalize(input),
        tags: {
          create: uniqueIds(input.tagIds).map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
    }),
  ]);

  revalidateEmployeeViews(id);
}

export async function deleteEmployee(id: string): Promise<void> {
  await prisma.employee.delete({ where: { id } });
  revalidateEmployeeViews(id);
}

export async function archiveEmployee(id: string): Promise<void> {
  await prisma.employee.update({ where: { id }, data: { active: false } });
  revalidateEmployeeViews(id);
}

export async function createDepartment(input: {
  name: string;
  managerId?: string | null;
  parentId?: string | null;
  color?: string;
}): Promise<string> {
  if (!input.name?.trim()) throw new Error("Department name is required");
  const colors = ["#22d3ee", "#d946a6", "#34d399", "#f59e0b", "#60a5fa"];
  const count = await prisma.department.count();
  const department = await prisma.department.create({
    data: {
      name: input.name.trim(),
      managerId: emptyToNull(input.managerId),
      parentId: emptyToNull(input.parentId),
      color: input.color || colors[count % colors.length],
    },
    select: { id: true },
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
  return department.id;
}

export async function updateDepartment(
  id: string,
  input: {
    name?: string;
    managerId?: string | null;
    parentId?: string | null;
    color?: string;
  }
): Promise<void> {
  await prisma.department.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
      ...(input.managerId !== undefined
        ? { managerId: emptyToNull(input.managerId) }
        : {}),
      ...(input.parentId !== undefined
        ? { parentId: emptyToNull(input.parentId) }
        : {}),
      ...(input.color !== undefined ? { color: input.color } : {}),
    },
  });
  revalidatePath("/departments");
  revalidatePath("/employees");
}

export async function deleteDepartment(id: string): Promise<void> {
  await prisma.department.delete({ where: { id } });
  revalidatePath("/departments");
  revalidatePath("/employees");
}

export async function createConfigItem(
  model: ConfigModel,
  data: Record<string, unknown>
): Promise<string> {
  const name = String(data.name ?? "").trim();
  if (!name) throw new Error("Name is required");

  let created: { id: string };
  switch (model) {
    case "job-positions":
      created = await prisma.jobPosition.create({
        data: {
          name,
          departmentId: emptyToNull(data.departmentId as string | undefined),
        },
        select: { id: true },
      });
      break;
    case "employee-types":
      created = await prisma.employeeType.create({
        data: { name },
        select: { id: true },
      });
      break;
    case "work-locations":
      created = await prisma.workLocation.create({
        data: {
          name,
          address: String(data.address ?? ""),
          locationType: locationType(data.locationType),
        },
        select: { id: true },
      });
      break;
    case "tags":
      created = await prisma.tag.create({
        data: { name, color: String(data.color ?? "#b45309") },
        select: { id: true },
      });
      break;
    case "departure-reasons":
      created = await prisma.departureReason.create({
        data: { name },
        select: { id: true },
      });
      break;
  }

  revalidatePath(`/configuration/${model}`);
  revalidatePath("/employees");
  return created.id;
}

export async function updateConfigItem(
  model: ConfigModel,
  id: string,
  data: Record<string, unknown>
): Promise<void> {
  const name = data.name === undefined ? undefined : String(data.name).trim();
  switch (model) {
    case "job-positions":
      await prisma.jobPosition.update({
        where: { id },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(data.departmentId !== undefined
            ? {
                departmentId: emptyToNull(
                  data.departmentId as string | undefined
                ),
              }
            : {}),
        },
      });
      break;
    case "employee-types":
      await prisma.employeeType.update({
        where: { id },
        data: { ...(name !== undefined ? { name } : {}) },
      });
      break;
    case "work-locations":
      await prisma.workLocation.update({
        where: { id },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(data.address !== undefined
            ? { address: String(data.address ?? "") }
            : {}),
          ...(data.locationType !== undefined
            ? { locationType: locationType(data.locationType) }
            : {}),
        },
      });
      break;
    case "tags":
      await prisma.tag.update({
        where: { id },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(data.color !== undefined ? { color: String(data.color) } : {}),
        },
      });
      break;
    case "departure-reasons":
      await prisma.departureReason.update({
        where: { id },
        data: { ...(name !== undefined ? { name } : {}) },
      });
      break;
  }
  revalidatePath(`/configuration/${model}`);
  revalidatePath("/employees");
}

export async function deleteConfigItem(
  model: ConfigModel,
  id: string
): Promise<void> {
  switch (model) {
    case "job-positions":
      await prisma.jobPosition.delete({ where: { id } });
      break;
    case "employee-types":
      await prisma.employeeType.delete({ where: { id } });
      break;
    case "work-locations":
      await prisma.workLocation.delete({ where: { id } });
      break;
    case "tags":
      await prisma.tag.delete({ where: { id } });
      break;
    case "departure-reasons":
      await prisma.departureReason.delete({ where: { id } });
      break;
  }
  revalidatePath(`/configuration/${model}`);
  revalidatePath("/employees");
}
