/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/db/prisma";
import type {
  ConfigModel,
  Department,
  DepartureReason,
  Employee,
  EmployeeType,
  EmployeeWithRelations,
  JobPosition,
  Tag,
  WorkLocation,
} from "@/lib/types";

function iso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value;
}

function dateOnly(value: Date | null | undefined): string {
  return value ? value.toISOString().slice(0, 10) : "";
}

function mapDepartment(d: any): Department {
  return {
    id: d.id,
    name: d.name,
    parentId: d.parentId,
    managerId: d.managerId,
    color: d.color,
    createdAt: iso(d.createdAt),
    updatedAt: iso(d.updatedAt),
  };
}

function mapJobPosition(j: any): JobPosition {
  return {
    id: j.id,
    name: j.name,
    departmentId: j.departmentId,
    createdAt: iso(j.createdAt),
    updatedAt: iso(j.updatedAt),
  };
}

function mapEmployeeType(t: any): EmployeeType {
  return {
    id: t.id,
    name: t.name,
    createdAt: iso(t.createdAt),
    updatedAt: iso(t.updatedAt),
  };
}

function mapWorkLocation(w: any): WorkLocation {
  return {
    id: w.id,
    name: w.name,
    address: w.address,
    locationType: w.locationType,
    createdAt: iso(w.createdAt),
    updatedAt: iso(w.updatedAt),
  };
}

function mapTag(t: any): Tag {
  return {
    id: t.id,
    name: t.name,
    color: t.color,
    createdAt: iso(t.createdAt),
    updatedAt: iso(t.updatedAt),
  };
}

function mapDepartureReason(d: any): DepartureReason {
  return {
    id: d.id,
    name: d.name,
    createdAt: iso(d.createdAt),
    updatedAt: iso(d.updatedAt),
  };
}

function mapEmployee(e: any): Employee {
  return {
    id: e.id,
    name: e.name,
    active: e.active,
    workEmail: e.workEmail,
    workPhone: e.workPhone,
    workMobile: e.workMobile,
    avatarUrl: e.avatarUrl,
    tagIds: e.tags?.map((item: any) => item.tagId) ?? [],
    jobPositionId: e.jobPositionId,
    jobTitle: e.jobTitle,
    departmentId: e.departmentId,
    managerId: e.managerId,
    employeeTypeId: e.employeeTypeId,
    workLocationId: e.workLocationId,
    company: e.company,
    privateEmail: e.privateEmail,
    privatePhone: e.privatePhone,
    privateAddress: e.privateAddress,
    gender: e.gender ?? "",
    dateOfBirth: dateOnly(e.dateOfBirth),
    nationality: e.nationality,
    maritalStatus: e.maritalStatus ?? "",
    monthlyHours: e.monthlyHours,
    kanbanState: e.kanbanState,
    createdAt: iso(e.createdAt),
    updatedAt: iso(e.updatedAt),
  };
}

function mapEmployeeWithRelations(e: any): EmployeeWithRelations {
  return {
    ...mapEmployee(e),
    department: e.department ? mapDepartment(e.department) : null,
    jobPosition: e.jobPosition ? mapJobPosition(e.jobPosition) : null,
    employeeType: e.employeeType ? mapEmployeeType(e.employeeType) : null,
    workLocation: e.workLocation ? mapWorkLocation(e.workLocation) : null,
    manager: e.manager ? mapEmployee(e.manager) : null,
    tags: e.tags?.map((item: any) => mapTag(item.tag)) ?? [],
  };
}

const employeeInclude = {
  department: true,
  jobPosition: true,
  employeeType: true,
  workLocation: true,
  manager: { include: { tags: true } },
  tags: { include: { tag: true } },
};

export async function getDepartments(): Promise<Department[]> {
  const rows = await prisma.department.findMany({ orderBy: { name: "asc" } });
  return rows.map(mapDepartment);
}

export async function getDepartment(id: string): Promise<Department | null> {
  const row = await prisma.department.findUnique({ where: { id } });
  return row ? mapDepartment(row) : null;
}

export async function countEmployeesByDepartment(
  departmentId: string
): Promise<number> {
  return prisma.employee.count({ where: { active: true, departmentId } });
}

export interface DepartmentWithCount extends Department {
  employeeCount: number;
  managerName: string | null;
}

export async function getDepartmentsWithCounts(): Promise<
  DepartmentWithCount[]
> {
  const rows = await prisma.department.findMany({
    orderBy: { name: "asc" },
    include: {
      manager: { select: { name: true } },
      _count: { select: { employees: { where: { active: true } } } },
    },
  });

  return rows.map((d: any) => ({
    ...mapDepartment(d),
    employeeCount: d._count.employees,
    managerName: d.manager?.name ?? null,
  }));
}

export interface EmployeeQuery {
  search?: string;
  departmentId?: string;
}

export async function getEmployees(
  query: EmployeeQuery = {}
): Promise<EmployeeWithRelations[]> {
  const rows = await prisma.employee.findMany({
    where: {
      active: true,
      ...(query.departmentId ? { departmentId: query.departmentId } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: "insensitive" } },
              { workEmail: { contains: query.search, mode: "insensitive" } },
              { jobTitle: { contains: query.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { name: "asc" },
    include: employeeInclude,
  });
  return rows.map(mapEmployeeWithRelations);
}

export async function getEmployee(
  id: string
): Promise<EmployeeWithRelations | null> {
  const row = await prisma.employee.findUnique({
    where: { id },
    include: employeeInclude,
  });
  return row ? mapEmployeeWithRelations(row) : null;
}

export async function getJobPositions(): Promise<JobPosition[]> {
  return (await prisma.jobPosition.findMany({ orderBy: { name: "asc" } })).map(
    mapJobPosition
  );
}

export async function getEmployeeTypes(): Promise<EmployeeType[]> {
  return (await prisma.employeeType.findMany({ orderBy: { name: "asc" } })).map(
    mapEmployeeType
  );
}

export async function getWorkLocations(): Promise<WorkLocation[]> {
  return (await prisma.workLocation.findMany({ orderBy: { name: "asc" } })).map(
    mapWorkLocation
  );
}

export async function getTags(): Promise<Tag[]> {
  return (await prisma.tag.findMany({ orderBy: { name: "asc" } })).map(mapTag);
}

export async function getDepartureReasons(): Promise<DepartureReason[]> {
  return (
    await prisma.departureReason.findMany({ orderBy: { name: "asc" } })
  ).map(mapDepartureReason);
}

export async function getConfigRows(
  model: ConfigModel
): Promise<Record<string, unknown>[]> {
  switch (model) {
    case "job-positions":
      return (await getJobPositions()) as unknown as Record<string, unknown>[];
    case "employee-types":
      return (await getEmployeeTypes()) as unknown as Record<string, unknown>[];
    case "work-locations":
      return (await getWorkLocations()) as unknown as Record<string, unknown>[];
    case "tags":
      return (await getTags()) as unknown as Record<string, unknown>[];
    case "departure-reasons":
      return (await getDepartureReasons()) as unknown as Record<
        string,
        unknown
      >[];
  }
}

export async function getFormOptions() {
  const [
    departments,
    jobPositions,
    employeeTypes,
    workLocations,
    tags,
    managers,
  ] = await Promise.all([
    prisma.department.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.jobPosition.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.employeeType.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.workLocation.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, color: true },
    }),
    prisma.employee.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return {
    departments,
    jobPositions,
    employeeTypes,
    workLocations,
    tags,
    managers,
  };
}
