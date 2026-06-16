export type ID = string;

export interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

export interface Department extends Timestamped {
  id: ID;
  name: string;
  parentId: ID | null;
  managerId: ID | null;
  color: string;
}

export interface JobPosition extends Timestamped {
  id: ID;
  name: string;
  departmentId: ID | null;
}

export interface EmployeeType extends Timestamped {
  id: ID;
  name: string;
}

export interface WorkLocation extends Timestamped {
  id: ID;
  name: string;
  address: string;
  locationType: "office" | "home" | "other";
}

export interface Tag extends Timestamped {
  id: ID;
  name: string;
  color: string;
}

export interface DepartureReason extends Timestamped {
  id: ID;
  name: string;
}

export type KanbanState = "normal" | "done" | "blocked";

export interface Employee extends Timestamped {
  id: ID;
  name: string;
  active: boolean;
  workEmail: string;
  workPhone: string;
  workMobile: string;
  avatarUrl: string | null;
  tagIds: ID[];
  jobPositionId: ID | null;
  jobTitle: string;
  departmentId: ID | null;
  managerId: ID | null;
  employeeTypeId: ID | null;
  workLocationId: ID | null;
  company: string;
  privateEmail: string;
  privatePhone: string;
  privateAddress: string;
  gender: "male" | "female" | "other" | "";
  dateOfBirth: string;
  nationality: string;
  maritalStatus:
    | "single"
    | "married"
    | "cohabitant"
    | "widower"
    | "divorced"
    | "";
  monthlyHours: number;
  kanbanState: KanbanState;
}

export interface EmployeeWithRelations extends Employee {
  department?: Department | null;
  jobPosition?: JobPosition | null;
  employeeType?: EmployeeType | null;
  workLocation?: WorkLocation | null;
  manager?: Employee | null;
  tags: Tag[];
}

export type ConfigModel =
  | "job-positions"
  | "employee-types"
  | "work-locations"
  | "tags"
  | "departure-reasons";
