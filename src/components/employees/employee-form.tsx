"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
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
    schedule: employee?.schedule ?? null,
    officeIdent: employee?.officeIdent ?? null,
    nationalityIdent: employee?.nationalityIdent ?? null,
    countryIdent: employee?.countryIdent ?? null,
    maritalstatusIdent: employee?.maritalstatusIdent ?? null,
    apartcondIdent: employee?.apartcondIdent ?? null,
    carowncondIdent: employee?.carowncondIdent ?? null,
    degreeIdent: employee?.degreeIdent ?? null,
    insurIdent: employee?.insurIdent ?? null,
    firedreasonIdent: employee?.firedreasonIdent ?? null,
    clothessizeIdent: employee?.clothessizeIdent ?? null,
    shoessizeIdent: employee?.shoessizeIdent ?? null,
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
      toast.error("Нэр оруулах шаардлагатай");
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
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b bg-control-bar px-4 py-3">
        <button
          type="button"
          onClick={save}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          <Check className="size-4" /> Хадгалах
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(employee ? `/employees/${employee.id}` : "/employees")
          }
          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
        >
          <X className="size-4" /> Цуцлах
        </button>
        <div className="ml-2 leading-tight">
          <div className="text-sm font-semibold">Ажилтан</div>
          <div className="text-xs text-muted-foreground">
            {employee ? employee.name : "Шинэ бүртгэл"}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-5">
        <div className="grid gap-5 md:grid-cols-[160px_1fr]">
          <div className="flex flex-col gap-2">
            <div className="flex size-32 items-center justify-center overflow-hidden rounded-md border bg-muted text-3xl font-semibold text-muted-foreground">
              {form.photoUrl ? (
                <span
                  aria-hidden
                  className="size-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${String(form.photoUrl)})` }}
                />
              ) : (
                initials(form.surname, form.name)
              )}
            </div>
            <FieldText
              label="Зураг URL"
              value={form.photoUrl ?? ""}
              onChange={(value) => set("photoUrl", value)}
            />
          </div>

          <div>
            <div className="grid gap-3 md:grid-cols-2">
              <FieldText
                label="Овог"
                value={form.surname ?? ""}
                onChange={(value) => set("surname", value)}
              />
              <FieldText
                label="Нэр"
                value={form.name ?? ""}
                onChange={(value) => set("name", value)}
                required
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
                label="Төлөв"
                value={form.status ?? "active"}
                options={[
                  { id: "active", name: "active" },
                  { id: "inactive", name: "inactive" },
                  { id: "fired", name: "fired" },
                ]}
                onChange={(value) => set("status", value ?? "active")}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="work" className="mt-6">
          <TabsList className="flex h-auto flex-wrap justify-start rounded-md border bg-muted/35 p-1">
            <TabsTrigger value="work">Ажил</TabsTrigger>
            <TabsTrigger value="personal">Хувийн</TabsTrigger>
            <TabsTrigger value="payroll">Цалин</TabsTrigger>
            <TabsTrigger value="documents">Баримт</TabsTrigger>
            <TabsTrigger value="system">Систем</TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-5">
            <Section title="Ажлын мэдээлэл">
              <FieldSelect
                label="Хэлтэс"
                value={form.depIdent}
                options={options.departments ?? []}
                onChange={(value) => set("depIdent", value)}
              />
              <FieldSelect
                label="Албан тушаал"
                value={form.occupationIdent}
                options={options.occupations ?? []}
                onChange={(value) => set("occupationIdent", value)}
              />
              <FieldText
                label="Албан нэр"
                value={form.post ?? ""}
                onChange={(value) => set("post", value)}
              />
              <FieldSelect
                label="2 дахь албан тушаал"
                value={form.occupationIdent2}
                options={options.occupations ?? []}
                onChange={(value) => set("occupationIdent2", value)}
              />
              <FieldSelect
                label="Салбар"
                value={form.branchIdent}
                options={options.branches ?? []}
                onChange={(value) => set("branchIdent", value)}
              />
              <FieldSelect
                label="Оффис"
                value={form.officeIdent}
                options={options.offices ?? []}
                onChange={(value) => set("officeIdent", value)}
              />
              <FieldSelect
                label="Ээлж"
                value={form.schedule}
                options={options.shifts ?? []}
                onChange={(value) => set("schedule", value)}
              />
              <FieldSelect
                label="Ур чадвар"
                value={form.wskillIdent}
                options={options.workSkills ?? []}
                onChange={(value) => set("wskillIdent", value)}
              />
              <FieldText
                label="Ажлын төрөл"
                value={form.jobType ?? ""}
                onChange={(value) => set("jobType", value)}
              />
              <FieldText
                label="Job figure"
                value={form.jobFigure ?? ""}
                onChange={(value) => set("jobFigure", value)}
              />
              <FieldDate
                label="Ажилд орсон"
                value={form.inworkdate ?? ""}
                onChange={(value) => set("inworkdate", value)}
              />
              <FieldDate
                label="Эхлэх огноо"
                value={form.gDate ?? ""}
                onChange={(value) => set("gDate", value)}
              />
              <FieldDate
                label="Дуусах огноо"
                value={form.gEnddate ?? ""}
                onChange={(value) => set("gEnddate", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent value="personal" className="mt-5">
            <Section title="Хувийн мэдээлэл">
              <FieldText
                label="Имэйл"
                value={form.email ?? ""}
                onChange={(value) => set("email", value)}
              />
              <FieldText
                label="Ажлын утас"
                value={form.workphone ?? ""}
                onChange={(value) => set("workphone", value)}
              />
              <FieldText
                label="Гэрийн утас"
                value={form.homephone ?? ""}
                onChange={(value) => set("homephone", value)}
              />
              <FieldText
                label="Нэмэлт утас"
                value={form.phone2 ?? ""}
                onChange={(value) => set("phone2", value)}
              />
              <FieldSelect
                label="Хүйс"
                value={form.gender ?? null}
                options={[
                  { id: "M", name: "Эрэгтэй" },
                  { id: "F", name: "Эмэгтэй" },
                ]}
                onChange={(value) => set("gender", value ?? "")}
              />
              <FieldDate
                label="Төрсөн огноо"
                value={form.birthday ?? ""}
                onChange={(value) => set("birthday", value)}
              />
              <FieldSelect
                label="Үндэс угсаа"
                value={form.nationalityIdent}
                options={options.nationalities ?? []}
                onChange={(value) => set("nationalityIdent", value)}
              />
              <FieldSelect
                label="Улс"
                value={form.countryIdent}
                options={options.countries ?? []}
                onChange={(value) => set("countryIdent", value)}
              />
              <FieldSelect
                label="Гэрлэлтийн төлөв"
                value={form.maritalstatusIdent}
                options={options.maritalStatuses ?? []}
                onChange={(value) => set("maritalstatusIdent", value)}
              />
              <FieldSelect
                label="Орон сууц"
                value={form.apartcondIdent}
                options={options.apartmentConds ?? []}
                onChange={(value) => set("apartcondIdent", value)}
              />
              <FieldSelect
                label="Машин эзэмшил"
                value={form.carowncondIdent}
                options={options.carownConds ?? []}
                onChange={(value) => set("carowncondIdent", value)}
              />
              <FieldText
                label="Цусны бүлэг"
                value={form.bloodType ?? ""}
                onChange={(value) => set("bloodType", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent value="payroll" className="mt-5">
            <Section title="Цалин болон банк">
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
                label="IBAN/данс"
                value={form.ibankNumber ?? ""}
                onChange={(value) => set("ibankNumber", value)}
              />
              <FieldSelect
                label="Даатгал"
                value={form.insurIdent}
                options={options.insuranceTypes ?? []}
                onChange={(value) => set("insurIdent", value)}
              />
              <FieldNumber
                label="Ажилласан жил"
                value={form.workingYear ?? 0}
                onChange={(value) => set("workingYear", value)}
              />
              <FieldNumber
                label="Салбарын жил"
                value={form.workyearSector ?? 0}
                onChange={(value) => set("workyearSector", value)}
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
                label="Зэрэг %"
                value={form.gradePerc ?? "0"}
                onChange={(value) => set("gradePerc", value)}
              />
              <FieldText
                label="Нэмэгдэл %"
                value={form.salPercent ?? "0"}
                onChange={(value) => set("salPercent", value)}
              />
              <FieldText
                label="Нэмэгдэл дүн"
                value={form.salAmount ?? "0"}
                onChange={(value) => set("salAmount", value)}
              />
              <FieldText
                label="Grade amount"
                value={form.gradeAmount ?? "0"}
                onChange={(value) => set("gradeAmount", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent value="documents" className="mt-5">
            <Section title="Боловсрол, бичиг баримт">
              <FieldSelect
                label="Боловсрол"
                value={form.educationIdent}
                options={options.educations ?? []}
                onChange={(value) => set("educationIdent", value)}
              />
              <FieldSelect
                label="Төгссөн"
                value={form.graduateIdent}
                options={options.graduates ?? []}
                onChange={(value) => set("graduateIdent", value)}
              />
              <FieldSelect
                label="Зэрэг"
                value={form.degreeIdent}
                options={options.degrees ?? []}
                onChange={(value) => set("degreeIdent", value)}
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
              <FieldSelect
                label="Хувцас"
                value={form.clothessizeIdent}
                options={options.clothesSizes ?? []}
                onChange={(value) => set("clothessizeIdent", value)}
              />
              <FieldSelect
                label="Гутал"
                value={form.shoessizeIdent}
                options={options.clothesSizes ?? []}
                onChange={(value) => set("shoessizeIdent", value)}
              />
              <FieldText
                label="eTax код"
                value={form.etaxCode ?? ""}
                onChange={(value) => set("etaxCode", value)}
              />
            </Section>
          </TabsContent>

          <TabsContent value="system" className="mt-5">
            <Section title="Системийн талбарууд">
              <FieldSelect
                label="Гэрээт ажилтан"
                value={form.contractEmp ?? "no"}
                options={[
                  { id: "no", name: "no" },
                  { id: "yes", name: "yes" },
                ]}
                onChange={(value) => set("contractEmp", value ?? "no")}
              />
              <FieldSelect
                label="Менежер туршлага"
                value={form.managerExp ?? "no"}
                options={[
                  { id: "no", name: "no" },
                  { id: "yes", name: "yes" },
                ]}
                onChange={(value) => set("managerExp", value ?? "no")}
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
              <div className="grid gap-2 sm:col-span-2">
                <Label>Тушаалын тайлбар</Label>
                <Textarea
                  value={form.commandDescription ?? ""}
                  onChange={(event) =>
                    set("commandDescription", event.target.value)
                  }
                  rows={3}
                />
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function initials(surname?: string, name?: string) {
  return (
    [surname, name]
      .filter(Boolean)
      .map((part) => part?.[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "HR"
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
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
    <label className="grid gap-1.5 text-sm">
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
    <label className="grid gap-1.5 text-sm">
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
    <label className="grid gap-1.5 text-sm">
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
    <div className="grid gap-1.5 text-sm">
      <Label className="font-medium">{label}</Label>
      <Select
        value={value ?? "__none"}
        onValueChange={(next) => onChange(next === "__none" ? null : next)}
      >
        <SelectTrigger className="w-full bg-background">
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
