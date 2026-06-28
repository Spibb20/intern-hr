export type ID = string;

export interface Option {
  id: ID;
  name: string;
  color?: string;
}

export type KanbanState = "normal" | "done" | "blocked";

export interface Department {
  id: ID;
  name: string;
  parentId: ID | null;
  parentName?: string | null;
  scheduleId?: ID | null;
  scheduleName?: string | null;
  officeId?: ID | null;
  officeName?: string | null;
  color: string;
}

export interface SimpleRelation {
  id: ID;
  name: string;
}

export interface Employee {
  id: ID;
  employeeId: number;
  name: string;
  firstName: string;
  surname: string;
  ovog: string;
  urgiinOvog: string;
  empno: string;
  registerno: string;
  gender: string;
  birthday: string;
  email: string;
  workphone: string;
  homephone: string;
  phone2: string;
  post: string;
  status: string;
  active: boolean;
  photoUrl: string | null;
  depIdent: ID | null;
  occupationIdent: ID | null;
  occupationIdent2: ID | null;
  educationIdent: ID | null;
  graduateIdent: ID | null;
  wskillIdent: ID | null;
  branchIdent: ID | null;
  bankIdent: ID | null;
  schedule: ID | null;
  officeIdent: ID | null;
  nationalityIdent: ID | null;
  countryIdent: ID | null;
  maritalstatusIdent: ID | null;
  apartcondIdent: ID | null;
  carowncondIdent: ID | null;
  degreeIdent: ID | null;
  insurIdent: ID | null;
  firedreasonIdent: ID | null;
  clothessizeIdent: ID | null;
  shoessizeIdent: ID | null;
  salary: string;
  workingYear: number;
  workyearSector: number;
  inworkdate: string;
  gDate: string;
  gEnddate: string;
  managerExp: string;
  contractEmp: string;
  jobType: string;
  jobFigure: string;
  passport: string;
  ndno: string;
  emdno: string;
  ibankNumber: string;
  bloodType: string;
  grade: string;
  gradeLevel: string;
  gradePerc: string;
  perc1: string;
  perc2: string;
  salPercent: string;
  salAmount: string;
  gradeAmount: string;
  commandNo: string;
  commandDescription: string;
  etaxCode: string;
  department?: Department | null;
  jobPosition?: SimpleRelation | null;
  jobPosition2?: SimpleRelation | null;
  education?: SimpleRelation | null;
  graduate?: SimpleRelation | null;
  workSkill?: SimpleRelation | null;
  bank?: SimpleRelation | null;
  branch?: SimpleRelation | null;
  shift?: SimpleRelation | null;
  office?: SimpleRelation | null;
  nationality?: SimpleRelation | null;
  country?: SimpleRelation | null;
  maritalStatus?: SimpleRelation | null;
  apartmentCondition?: SimpleRelation | null;
  carOwnershipCondition?: SimpleRelation | null;
  degree?: SimpleRelation | null;
  insuranceType?: SimpleRelation | null;
  firedReason?: SimpleRelation | null;
  clothesSize?: SimpleRelation | null;
  shoesSize?: SimpleRelation | null;
  kanbanState: KanbanState;
  workEmail: string;
  workPhone: string;
  workMobile: string;
  avatarUrl: string | null;
  tagIds: ID[];
  jobTitle: string;
  departmentId: ID | null;
  managerId: ID | null;
  employeeTypeId: ID | null;
  workLocationId: ID | null;
  company: string;
  privateEmail: string;
  privatePhone: string;
  privateAddress: string;
  dateOfBirth: string;
  maritalStatusText: string;
  monthlyHours: number;
  tags: { id: ID; name: string; color: string }[];
}

export type EmployeeWithRelations = Employee;

export type FieldType =
  | "text"
  | "number"
  | "decimal"
  | "date"
  | "select"
  | "color";

export type ConfigModel = string;
