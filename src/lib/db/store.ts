import type {
  Department,
  DepartureReason,
  Employee,
  EmployeeType,
  JobPosition,
  Tag,
  WorkLocation,
} from "@/lib/types";

export interface DataStore {
  departments: Department[];
  jobPositions: JobPosition[];
  employeeTypes: EmployeeType[];
  workLocations: WorkLocation[];
  tags: Tag[];
  departureReasons: DepartureReason[];
  employees: Employee[];
}

const now = () => new Date().toISOString();

function seed(): DataStore {
  const ts = { createdAt: now(), updatedAt: now() };

  const departments: Department[] = [
    {
      id: "dep_admin",
      name: "Administration",
      parentId: null,
      managerId: null,
      color: "#22d3ee",
      ...ts,
    },
    {
      id: "dep_mgmt",
      name: "Management",
      parentId: null,
      managerId: "emp_michael",
      color: "#d946a6",
      ...ts,
    },
    {
      id: "dep_rnd",
      name: "Research & Development",
      parentId: null,
      managerId: null,
      color: "#34d399",
      ...ts,
    },
  ];

  const jobPositions: JobPosition[] = [
    {
      id: "job_consultant",
      name: "Consultant",
      departmentId: "dep_rnd",
      ...ts,
    },
    {
      id: "job_ceo",
      name: "Chief Executive Officer",
      departmentId: "dep_mgmt",
      ...ts,
    },
    {
      id: "job_dev",
      name: "Experienced Developer",
      departmentId: "dep_rnd",
      ...ts,
    },
    {
      id: "job_sales",
      name: "Sales Manager",
      departmentId: "dep_admin",
      ...ts,
    },
  ];

  const employeeTypes: EmployeeType[] = [
    { id: "et_employee", name: "Employee", ...ts },
    { id: "et_consultant", name: "Consultant", ...ts },
    { id: "et_contractor", name: "Contractor", ...ts },
    { id: "et_intern", name: "Intern", ...ts },
  ];

  const workLocations: WorkLocation[] = [
    {
      id: "wl_office",
      name: "Main Office",
      address: "250 Executive Park Blvd",
      locationType: "office",
      ...ts,
    },
    { id: "wl_home", name: "Home", address: "", locationType: "home", ...ts },
  ];

  const tags: Tag[] = [
    { id: "tag_consultant", name: "Consultant", color: "#0d9488", ...ts },
    { id: "tag_employee", name: "Employee", color: "#b45309", ...ts },
    { id: "tag_demo", name: "Demo", color: "#7c3aed", ...ts },
  ];

  const departureReasons: DepartureReason[] = [
    { id: "dr_fired", name: "Fired", ...ts },
    { id: "dr_resigned", name: "Resigned", ...ts },
    { id: "dr_retired", name: "Retired", ...ts },
  ];

  const employees: Employee[] = [
    {
      id: "emp_emma",
      name: "Emma Granger",
      active: true,
      workEmail: "granger@mycompany.example.com",
      workPhone: "(555)-768-6230",
      workMobile: "(555)-768-6231",
      avatarUrl: "/employees/emma.png",
      tagIds: ["tag_consultant", "tag_demo"],
      jobPositionId: "job_consultant",
      jobTitle: "Consultant",
      departmentId: "dep_rnd",
      managerId: null,
      employeeTypeId: "et_consultant",
      workLocationId: "wl_office",
      company: "My Company",
      privateEmail: "",
      privatePhone: "",
      privateAddress: "",
      gender: "female",
      dateOfBirth: "",
      nationality: "",
      maritalStatus: "",
      monthlyHours: 160,
      kanbanState: "normal",
      ...ts,
    },
    {
      id: "emp_michael",
      name: "Michael Williams",
      active: true,
      workEmail: "williams@mycompany.example.com",
      workPhone: "(555)-768-6230",
      workMobile: "(555)-768-6232",
      avatarUrl: "/employees/michael.png",
      tagIds: ["tag_employee", "tag_demo"],
      jobPositionId: "job_ceo",
      jobTitle: "Chief Executive Officer",
      departmentId: "dep_mgmt",
      managerId: null,
      employeeTypeId: "et_employee",
      workLocationId: "wl_office",
      company: "My Company",
      privateEmail: "",
      privatePhone: "",
      privateAddress: "",
      gender: "male",
      dateOfBirth: "",
      nationality: "",
      maritalStatus: "married",
      monthlyHours: 160,
      kanbanState: "done",
      ...ts,
    },
    {
      id: "emp_simon",
      name: "Simon Jones",
      active: true,
      workEmail: "jones@mycompany.example.com",
      workPhone: "(555)-768-6230",
      workMobile: "(555)-768-6233",
      avatarUrl: "/employees/simon.png",
      tagIds: ["tag_employee", "tag_demo"],
      jobPositionId: "job_dev",
      jobTitle: "Experienced Developer",
      departmentId: "dep_rnd",
      managerId: "emp_michael",
      employeeTypeId: "et_employee",
      workLocationId: "wl_office",
      company: "My Company",
      privateEmail: "",
      privatePhone: "",
      privateAddress: "",
      gender: "male",
      dateOfBirth: "",
      nationality: "",
      maritalStatus: "single",
      monthlyHours: 160,
      kanbanState: "normal",
      ...ts,
    },
  ];

  employees.push({
    id: "emp_admin1",
    name: "Olivia Brown",
    active: true,
    workEmail: "brown@mycompany.example.com",
    workPhone: "(555)-768-6240",
    workMobile: "",
    avatarUrl: null,
    tagIds: ["tag_employee"],
    jobPositionId: "job_sales",
    jobTitle: "Sales Manager",
    departmentId: "dep_admin",
    managerId: null,
    employeeTypeId: "et_employee",
    workLocationId: "wl_office",
    company: "My Company",
    privateEmail: "",
    privatePhone: "",
    privateAddress: "",
    gender: "female",
    dateOfBirth: "",
    nationality: "",
    maritalStatus: "",
    monthlyHours: 160,
    kanbanState: "normal",
    ...ts,
  });

  return {
    departments,
    jobPositions,
    employeeTypes,
    workLocations,
    tags,
    departureReasons,
    employees,
  };
}

const globalForStore = globalThis as unknown as { __hrStore?: DataStore };

export const store: DataStore = globalForStore.__hrStore ?? seed();

if (!globalForStore.__hrStore) {
  globalForStore.__hrStore = store;
}

export function genId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const timestamps = () => ({ createdAt: now(), updatedAt: now() });
export const touch = () => ({ updatedAt: now() });
