"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createEmployee,
  updateEmployee,
  type EmployeeInput,
} from "@/lib/actions";
import type { EmployeeWithRelations, Option } from "@/lib/types";

interface EmployeeFormProps {
  options?: Record<string, Option[]>;
  employee?: EmployeeWithRelations;
}

const emptyOptions: Record<string, Option[]> = {};

const genderOptions = [
  { id: "M", name: "Эрэгтэй" },
  { id: "F", name: "Эмэгтэй" },
];

const yesNoOptions = [
  { id: "0", name: "Үгүй" },
  { id: "1", name: "Тийм" },
];

const yesNoTextOptions = [
  { id: "no", name: "Үгүй" },
  { id: "yes", name: "Тийм" },
];

const jobFigureOptions = [
  { id: "Main", name: "Үндсэн" },
  { id: "Side", name: "Туршилтын" },
  { id: "Contract", name: "Гэрээт" },
];

const leaveTypeOptions = [
  { id: "1", name: "Эрүүл мэндийн шалтгаан" },
  { id: "2", name: "Ар гэрийн гачигдал" },
  { id: "3", name: "Хувийн шалтгаан" },
];

export function EmployeeForm({
  options = emptyOptions,
  employee,
}: EmployeeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<EmployeeInput>({
    name: employee?.firstName ?? "",
    surname: employee?.surname ?? "",
    ovog: employee?.ovog ?? "",
    urgiinOvog: employee?.urgiinOvog ?? "",
    empno: employee?.empno ?? "",
    registerno: employee?.registerno ?? "",
    gender: employee?.gender ?? "",
    birthday: employee?.birthday ?? "",
    email: employee?.email ?? "",
    workphone: employee?.workphone ?? "",
    homephone: employee?.homephone ?? "",
    phone2: employee?.phone2 ?? "",
    post: employee?.post ?? "",
    status: employee?.status ?? "active",
    photoUrl: employee?.photoUrl ?? "",
    depIdent: employee?.depIdent ?? null,
    occupationIdent: employee?.occupationIdent ?? null,
    occupationIdent2: employee?.occupationIdent2 ?? null,
    educationIdent: employee?.educationIdent ?? null,
    graduateIdent: employee?.graduateIdent ?? null,
    wskillIdent: employee?.wskillIdent ?? null,
    branchIdent: employee?.branchIdent ?? null,
    bankIdent: employee?.bankIdent ?? null,
    contractNum: employee?.contractNum ?? "",
    schedule: employee?.schedule ?? null,
    officeIdent: employee?.officeIdent ?? null,
    nationalityIdent: employee?.nationalityIdent ?? null,
    niigmiinGaralIdent: employee?.niigmiinGaralIdent ?? null,
    countryIdent: employee?.countryIdent ?? null,
    votingWorkIdent: employee?.votingWorkIdent ?? null,
    maritalstatusIdent: employee?.maritalstatusIdent ?? null,
    apartcondIdent: employee?.apartcondIdent ?? null,
    carowncondIdent: employee?.carowncondIdent ?? null,
    degreeIdent: employee?.degreeIdent ?? null,
    insurIdent: employee?.insurIdent ?? null,
    firedreasonIdent: employee?.firedreasonIdent ?? null,
    clothessizeIdent: employee?.clothessizeIdent ?? null,
    shoessizeIdent: employee?.shoessizeIdent ?? null,
    income: employee?.income ?? 0,
    locCode: employee?.locCode ?? "",
    foreignEmp: employee?.foreignEmp ?? null,
    disabledEmp: employee?.disabledEmp ?? null,
    takenLeave: employee?.takenLeave ?? null,
    leaveType: employee?.leaveType ?? null,
    limited: employee?.limited ?? null,
    wageTestEmp: employee?.wageTestEmp ?? null,
    salary: employee?.salary ?? "0",
    workingYear: employee?.workingYear ?? 0,
    workyearSector: employee?.workyearSector ?? 0,
    inworkdate: employee?.inworkdate ?? "",
    gDate: employee?.gDate ?? "",
    gEnddate: employee?.gEnddate ?? "",
    managerExp: employee?.managerExp ?? "no",
    contractEmp: employee?.contractEmp ?? "no",
    jobType: employee?.jobType ?? "",
    jobFigure: employee?.jobFigure ?? "Main",
    passport: employee?.passport ?? "",
    ndno: employee?.ndno ?? "",
    emdno: employee?.emdno ?? "",
    ibankNumber: employee?.ibankNumber ?? "",
    bloodType: employee?.bloodType ?? "",
    grade: employee?.grade ?? "",
    gradeLevel: employee?.gradeLevel ?? "",
    gradePerc: employee?.gradePerc ?? "0",
    perc1: employee?.perc1 ?? "0",
    perc2: employee?.perc2 ?? "0",
    salPercent: employee?.salPercent ?? "0",
    salAmount: employee?.salAmount ?? "0",
    gradeAmount: employee?.gradeAmount ?? "0",
    commandNo: employee?.commandNo ?? "",
    commandDescription: employee?.commandDescription ?? "",
    etaxCode: employee?.etaxCode ?? "",
  });

  function set<K extends keyof EmployeeInput>(key: K, value: EmployeeInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function save() {
    if (!form.name?.trim()) {
      toast.error("Ажилтны нэр оруулах шаардлагатай");
      return;
    }
    startTransition(async () => {
      try {
        if (employee) {
          await updateEmployee(employee.id, form);
          toast.success("Ажилтны мэдээлэл шинэчлэгдлээ");
          router.push(`/employees/${employee.id}`);
        } else {
          const id = await createEmployee(form);
          toast.success("Ажилтан бүртгэгдлээ");
          router.push(`/employees/${id}`);
        }
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Алдаа гарлаа");
      }
    });
  }

  return (
    <div className="flex flex-col text-sm">
      <div className="flex flex-wrap items-center gap-2 border-b bg-control-bar px-3 py-2">
        <button
          type="button"
          onClick={save}
          disabled={isPending}
          className="border bg-background px-3 py-1.5 font-medium hover:bg-accent disabled:opacity-50"
        >
          Хадгалах
        </button>
        <button
          type="button"
          onClick={() => router.push("/employees")}
          className="border bg-background px-3 py-1.5 text-muted-foreground hover:bg-accent"
        >
          Хаах
        </button>
        <div className="ml-2 leading-tight">
          <div className="font-semibold">Ажилтан, албан хаагчдын бүртгэл</div>
          <div className="text-xs text-muted-foreground">
            {employee ? employee.name : "Шинэ ажилтан"}
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <div className="border bg-card">
          <div className="border-b bg-muted px-3 py-2 font-semibold">
            Ажилтан, албан хаагчдын бүртгэл
          </div>
          <div className="grid gap-x-4 gap-y-3 p-3 md:grid-cols-2 xl:grid-cols-3">
            <FieldText
              label="Ажилтны нэр"
              value={form.name ?? ""}
              onChange={(value) => set("name", value)}
              required
            />
            <FieldText
              label="Эцэг/эхийн нэр"
              value={form.surname ?? ""}
              onChange={(value) => set("surname", value)}
            />
            <FieldText
              label="Ургийн овог"
              value={form.urgiinOvog ?? ""}
              onChange={(value) => set("urgiinOvog", value)}
            />
            <FieldText
              label="Ажилтны код"
              value={form.empno ?? ""}
              onChange={(value) => set("empno", value)}
            />
            <FieldText
              label="Регистр"
              value={form.registerno ?? ""}
              onChange={(value) => set("registerno", value)}
            />
            <FieldSelect
              label="Хүйс"
              value={form.gender ?? null}
              options={genderOptions}
              onChange={(value) => set("gender", value ?? "")}
            />
            <FieldDate
              label="Төрсөн огноо"
              value={form.birthday ?? ""}
              onChange={(value) => set("birthday", value)}
            />
            <FieldSelect
              label="Салбарын нэр"
              value={form.branchIdent}
              options={options.branches ?? []}
              onChange={(value) => set("branchIdent", value)}
            />
            <FieldSelect
              label="Ажилтны төрөл"
              value={form.jobFigure ?? "Main"}
              options={jobFigureOptions}
              onChange={(value) => set("jobFigure", value ?? "Main")}
            />
          </div>
        </div>

        <Tabs defaultValue="general" className="mt-3">
          <TabsList className="flex h-auto flex-wrap justify-start rounded-none border bg-muted p-0">
            <TabsTrigger value="general">Ерөнхий мэдээлэл</TabsTrigger>
            <TabsTrigger value="payroll">Цалин бодох</TabsTrigger>
            <TabsTrigger value="detail">Дэлгэрэнгүй</TabsTrigger>
            <TabsTrigger value="contact">Холбоо барих</TabsTrigger>
            <TabsTrigger value="education">Боловсрол</TabsTrigger>
            <TabsTrigger value="skill">Ур чадвар, авьяас</TabsTrigger>
            <TabsTrigger value="other">Бусад мэдээлэл</TabsTrigger>
          </TabsList>

          <TabsContent
            value="general"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldSelect
                label="Хэлтэс"
                value={form.depIdent}
                options={options.departments ?? []}
                onChange={(value) => set("depIdent", value)}
              />
              <FieldSelect
                label="Алба / байрлал"
                value={form.officeIdent}
                options={options.offices ?? []}
                onChange={(value) => set("officeIdent", value)}
              />
              <FieldSelect
                label="Албан тушаал"
                value={form.occupationIdent}
                options={options.occupations ?? []}
                onChange={(value) => set("occupationIdent", value)}
              />
              <FieldText
                label="Албан тушаалын нэр"
                value={form.post ?? ""}
                onChange={(value) => set("post", value)}
              />
              <FieldSelect
                label="Даатгалын төрөл"
                value={form.insurIdent}
                options={options.insuranceTypes ?? []}
                onChange={(value) => set("insurIdent", value)}
              />
              <FieldSelect
                label="Ээлж / хуваарь"
                value={form.schedule}
                options={options.shifts ?? []}
                onChange={(value) => set("schedule", value)}
              />
              <FieldDate
                label="Ажилд орсон огноо"
                value={form.inworkdate ?? ""}
                onChange={(value) => set("inworkdate", value)}
              />
              <FieldText
                label="Гэрээний дугаар"
                value={form.contractNum ?? ""}
                onChange={(value) => set("contractNum", value)}
              />
              <FieldDate
                label="Гэрээ байгуулсан"
                value={form.gDate ?? ""}
                onChange={(value) => set("gDate", value)}
              />
              <FieldDate
                label="Гэрээ дуусах"
                value={form.gEnddate ?? ""}
                onChange={(value) => set("gEnddate", value)}
              />
              <FieldNumber
                label="Өмнөх ажилласан жил"
                value={Number(form.workingYear ?? 0)}
                onChange={(value) => set("workingYear", value)}
              />
              <FieldNumber
                label="Салбарт ажилласан жил"
                value={Number(form.workyearSector ?? 0)}
                onChange={(value) => set("workyearSector", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent
            value="payroll"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldText
                label="Үндсэн цалин"
                value={form.salary ?? "0"}
                onChange={(value) => set("salary", value)}
              />
              <FieldSelect
                label="Банк"
                value={form.bankIdent}
                options={options.banks ?? []}
                onChange={(value) => set("bankIdent", value)}
              />
              <FieldText
                label="Дансны дугаар"
                value={form.ibankNumber ?? ""}
                onChange={(value) => set("ibankNumber", value)}
              />
              <FieldSelect
                label="Нийгмийн даатгал"
                value={form.insurIdent}
                options={options.insuranceTypes ?? []}
                onChange={(value) => set("insurIdent", value)}
              />
              <FieldText
                label="Зэрэг нэмэгдэл %"
                value={form.gradePerc ?? "0"}
                onChange={(value) => set("gradePerc", value)}
              />
              <FieldText
                label="Нэмэгдэл 1 %"
                value={form.perc1 ?? "0"}
                onChange={(value) => set("perc1", value)}
              />
              <FieldText
                label="Нэмэгдэл 2 %"
                value={form.perc2 ?? "0"}
                onChange={(value) => set("perc2", value)}
              />
              <FieldText
                label="Цалингийн нэмэгдэл %"
                value={form.salPercent ?? "0"}
                onChange={(value) => set("salPercent", value)}
              />
              <FieldText
                label="Цалингийн нэмэгдэл дүн"
                value={form.salAmount ?? "0"}
                onChange={(value) => set("salAmount", value)}
              />
              <FieldText
                label="Зэрэг нэмэгдэл дүн"
                value={form.gradeAmount ?? "0"}
                onChange={(value) => set("gradeAmount", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent
            value="detail"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldSelect
                label="Гэр бүлийн байдал"
                value={form.maritalstatusIdent}
                options={options.maritalStatuses ?? []}
                onChange={(value) => set("maritalstatusIdent", value)}
              />
              <FieldNumber
                label="Өрхийн нийт орлого"
                value={Number(form.income ?? 0)}
                onChange={(value) => set("income", value)}
              />
              <FieldSelect
                label="Автомашин эзэмшил"
                value={form.carowncondIdent}
                options={options.carownConds ?? []}
                onChange={(value) => set("carowncondIdent", value)}
              />
              <FieldSelect
                label="Орон байрны нөхцөл"
                value={form.apartcondIdent}
                options={options.apartmentConds ?? []}
                onChange={(value) => set("apartcondIdent", value)}
              />
              <FieldText
                label="Цусны бүлэг"
                value={form.bloodType ?? ""}
                onChange={(value) => set("bloodType", value)}
              />
              <FieldSelect
                label="Үндэс угсаа"
                value={form.nationalityIdent}
                options={options.nationalities ?? []}
                onChange={(value) => set("nationalityIdent", value)}
              />
              <FieldSelect
                label="Нийгмийн гарал"
                value={form.niigmiinGaralIdent}
                options={options.socialOrigins ?? []}
                onChange={(value) => set("niigmiinGaralIdent", value)}
              />
              <FieldSelect
                label="Сонгуульт ажил"
                value={form.votingWorkIdent}
                options={options.votingWorks ?? []}
                onChange={(value) => set("votingWorkIdent", value)}
              />
              <FieldSelect
                label="Улс"
                value={form.countryIdent}
                options={options.countries ?? []}
                onChange={(value) => set("countryIdent", value)}
              />
              <FieldSelect
                label="Оршин суугч бус гадаад иргэн"
                value={form.foreignEmp}
                options={yesNoOptions}
                onChange={(value) => set("foreignEmp", value)}
              />
              <FieldSelect
                label="Хөгжлийн бэрхшээлтэй иргэн"
                value={form.disabledEmp}
                options={yesNoOptions}
                onChange={(value) => set("disabledEmp", value)}
              />
              <FieldText
                label="Байршлын код"
                value={form.locCode ?? ""}
                onChange={(value) => set("locCode", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent
            value="contact"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldText
                label="Ажлын утас"
                value={form.workphone ?? ""}
                onChange={(value) => set("workphone", value)}
              />
              <FieldText
                label="Гар утас"
                value={form.phone2 ?? ""}
                onChange={(value) => set("phone2", value)}
              />
              <FieldText
                label="Гэрийн утас"
                value={form.homephone ?? ""}
                onChange={(value) => set("homephone", value)}
              />
              <FieldText
                label="Имэйл хаяг"
                value={form.email ?? ""}
                onChange={(value) => set("email", value)}
              />
              <FieldText
                label="Паспорт"
                value={form.passport ?? ""}
                onChange={(value) => set("passport", value)}
              />
              <FieldText
                label="НД дугаар"
                value={form.ndno ?? ""}
                onChange={(value) => set("ndno", value)}
              />
              <FieldText
                label="ЭМД дугаар"
                value={form.emdno ?? ""}
                onChange={(value) => set("emdno", value)}
              />
              <FieldText
                label="eTax код"
                value={form.etaxCode ?? ""}
                onChange={(value) => set("etaxCode", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent
            value="education"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldSelect
                label="Боловсрол"
                value={form.educationIdent}
                options={options.educations ?? []}
                onChange={(value) => set("educationIdent", value)}
              />
              <FieldSelect
                label="Эрдмийн зэрэг"
                value={form.degreeIdent}
                options={options.degrees ?? []}
                onChange={(value) => set("degreeIdent", value)}
              />
              <FieldSelect
                label="Төгссөн сургууль"
                value={form.graduateIdent}
                options={options.graduates ?? []}
                onChange={(value) => set("graduateIdent", value)}
              />
              <FieldSelect
                label="2 дахь албан тушаал"
                value={form.occupationIdent2}
                options={options.occupations ?? []}
                onChange={(value) => set("occupationIdent2", value)}
              />
              <FieldSelect
                label="Хувцасны хэмжээ"
                value={form.clothessizeIdent}
                options={options.clothesSizes ?? []}
                onChange={(value) => set("clothessizeIdent", value)}
              />
              <FieldSelect
                label="Гутлын хэмжээ"
                value={form.shoessizeIdent}
                options={options.clothesSizes ?? []}
                onChange={(value) => set("shoessizeIdent", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent
            value="skill"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldSelect
                label="Ур чадвар"
                value={form.wskillIdent}
                options={options.workSkills ?? []}
                onChange={(value) => set("wskillIdent", value)}
              />
              <FieldText
                label="Зэрэг"
                value={form.grade ?? ""}
                onChange={(value) => set("grade", value)}
              />
              <FieldText
                label="Зэрэглэл"
                value={form.gradeLevel ?? ""}
                onChange={(value) => set("gradeLevel", value)}
              />
              <FieldText
                label="Ажлын төрөл"
                value={form.jobType ?? ""}
                onChange={(value) => set("jobType", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent
            value="other"
            className="mt-0 border border-t-0 bg-card p-3"
          >
            <Section>
              <FieldSelect
                label="Гэрээт ажилтан"
                value={form.contractEmp ?? "no"}
                options={yesNoTextOptions}
                onChange={(value) => set("contractEmp", value ?? "no")}
              />
              <FieldSelect
                label="Менежер туршлага"
                value={form.managerExp ?? "no"}
                options={yesNoTextOptions}
                onChange={(value) => set("managerExp", value ?? "no")}
              />
              <FieldSelect
                label="Чөлөө авсан"
                value={form.takenLeave}
                options={yesNoOptions}
                onChange={(value) => set("takenLeave", value)}
              />
              <FieldSelect
                label="Чөлөөний хэлбэр"
                value={form.leaveType}
                options={leaveTypeOptions}
                onChange={(value) => set("leaveType", value)}
              />
              <FieldSelect
                label="Цалин туршилт"
                value={form.wageTestEmp}
                options={yesNoOptions}
                onChange={(value) => set("wageTestEmp", value)}
              />
              <FieldSelect
                label="Хязгаарлалттай"
                value={form.limited}
                options={yesNoOptions}
                onChange={(value) => set("limited", value)}
              />
              <FieldSelect
                label="Гарсан шалтгаан"
                value={form.firedreasonIdent}
                options={options.firedReasons ?? []}
                onChange={(value) => set("firedreasonIdent", value)}
              />
              <FieldText
                label="Тушаал №"
                value={form.commandNo ?? ""}
                onChange={(value) => set("commandNo", value)}
              />
              <div className="grid gap-1.5 xl:col-span-3">
                <Label>Тушаалын тайлбар</Label>
                <Textarea
                  value={form.commandDescription ?? ""}
                  onChange={(event) =>
                    set("commandDescription", event.target.value)
                  }
                  rows={3}
                  className="rounded-sm"
                />
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-x-4 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}

function FieldText({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="soft-input"
      />
    </label>
  );
}

function FieldNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="font-medium">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="soft-input"
      />
    </label>
  );
}

function FieldDate({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="font-medium">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="soft-input"
      />
    </label>
  );
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null | undefined;
  options: Option[];
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="font-medium">{label}</Label>
      <Select
        value={value ?? "__none"}
        onValueChange={(next) => onChange(next === "__none" ? null : next)}
      >
        <SelectTrigger className="w-full rounded-sm bg-background">
          <SelectValue placeholder="Сонгох" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none">—</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
