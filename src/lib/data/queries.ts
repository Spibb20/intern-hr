import { store } from "@/lib/db/store";
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

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function getDepartments(): Department[] {
  return clone(store.departments);
}

export function getDepartment(id: string): Department | null {
  const dep = store.departments.find((d) => d.id === id);
  return dep ? clone(dep) : null;
}

export function countEmployeesByDepartment(departmentId: string): number {
  return store.employees.filter(
    (e) => e.active && e.departmentId === departmentId
  ).length;
}

export interface DepartmentWithCount extends Department {
  employeeCount: number;
  managerName: string | null;
}

export function getDepartmentsWithCounts(): DepartmentWithCount[] {
  return store.departments.map((d) => ({
    ...clone(d),
    employeeCount: countEmployeesByDepartment(d.id),
    managerName: d.managerId
      ? store.employees.find((e) => e.id === d.managerId)?.name ?? null
      : null,
  }));
}

function resolveEmployee(e: Employee): EmployeeWithRelations {
  return {
    ...clone(e),
    department: e.departmentId
      ? clone(store.departments.find((d) => d.id === e.departmentId) ?? null)
      : null,
    jobPosition: e.jobPositionId
      ? clone(store.jobPositions.find((j) => j.id === e.jobPositionId) ?? null)
      : null,
    employeeType: e.employeeTypeId
      ? clone(
          store.employeeTypes.find((t) => t.id === e.employeeTypeId) ?? null
        )
      : null,
    workLocation: e.workLocationId
      ? clone(
          store.workLocations.find((w) => w.id === e.workLocationId) ?? null
        )
      : null,
    manager: e.managerId
      ? clone(store.employees.find((m) => m.id === e.managerId) ?? null)
      : null,
    tags: e.tagIds
      .map((id) => store.tags.find((t) => t.id === id))
      .filter(Boolean)
      .map((t) => clone(t!)),
  };
}

export interface EmployeeQuery {
  search?: string;
  departmentId?: string;
}

export function getEmployees(
  query: EmployeeQuery = {}
): EmployeeWithRelations[] {
  let list = store.employees.filter((e) => e.active);

  if (query.departmentId) {
    list = list.filter((e) => e.departmentId === query.departmentId);
  }

  if (query.search) {
    const q = query.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.workEmail.toLowerCase().includes(q) ||
        e.jobTitle.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => a.name.localeCompare(b.name)).map(resolveEmployee);
}

export function getEmployee(id: string): EmployeeWithRelations | null {
  const emp = store.employees.find((e) => e.id === id);
  return emp ? resolveEmployee(emp) : null;
}

export function getJobPositions(): JobPosition[] {
  return clone(store.jobPositions);
}

export function getEmployeeTypes(): EmployeeType[] {
  return clone(store.employeeTypes);
}

export function getWorkLocations(): WorkLocation[] {
  return clone(store.workLocations);
}

export function getTags(): Tag[] {
  return clone(store.tags);
}

export function getDepartureReasons(): DepartureReason[] {
  return clone(store.departureReasons);
}

const configCollections: Record<ConfigModel, () => unknown[]> = {
  "job-positions": () => store.jobPositions,
  "employee-types": () => store.employeeTypes,
  "work-locations": () => store.workLocations,
  tags: () => store.tags,
  "departure-reasons": () => store.departureReasons,
};

export function getConfigRows(model: ConfigModel): Record<string, unknown>[] {
  return clone(configCollections[model]()) as Record<string, unknown>[];
}

export interface Option {
  id: string;
  name: string;
}

export function getFormOptions() {
  return {
    departments: store.departments.map((d) => ({ id: d.id, name: d.name })),
    jobPositions: store.jobPositions.map((j) => ({ id: j.id, name: j.name })),
    employeeTypes: store.employeeTypes.map((t) => ({ id: t.id, name: t.name })),
    workLocations: store.workLocations.map((w) => ({ id: w.id, name: w.name })),
    tags: store.tags.map((t) => ({ id: t.id, name: t.name, color: t.color })),
    managers: store.employees
      .filter((e) => e.active)
      .map((e) => ({ id: e.id, name: e.name })),
  };
}
