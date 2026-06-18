"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  Check,
  Clock,
  DollarSign,
  History,
  ImagePlus,
  Mail,
  Phone,
  Smartphone,
  Tag as TagIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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
import type { EmployeeWithRelations } from "@/lib/types";

interface Option {
  id: string;
  name: string;
  color?: string;
}

interface FormOptions {
  departments: Option[];
  jobPositions: Option[];
  employeeTypes: Option[];
  workLocations: Option[];
  tags: Option[];
  managers: Option[];
}

interface EmployeeFormProps {
  options?: Partial<FormOptions>;
  employee?: EmployeeWithRelations;
}

const smartButtons = [
  { icon: DollarSign, label: "Цалингийн хүлээлт", value: "" },
  { icon: CalendarClock, label: "Амралт/Чөлөө", value: "" },
  { icon: Clock, label: "Ажилласан цаг/сар", valueKey: "monthlyHours" },
  { icon: History, label: "Түүх", value: "0" },
];

export function EmployeeForm({ options, employee }: EmployeeFormProps) {
  const formOptions: FormOptions = {
    departments: options?.departments ?? [],
    jobPositions: options?.jobPositions ?? [],
    employeeTypes: options?.employeeTypes ?? [],
    workLocations: options?.workLocations ?? [],
    tags: options?.tags ?? [],
    managers: options?.managers ?? [],
  };
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<EmployeeInput>({
    name: employee?.name ?? "",
    workEmail: employee?.workEmail ?? "",
    workPhone: employee?.workPhone ?? "",
    workMobile: employee?.workMobile ?? "",
    avatarUrl: employee?.avatarUrl ?? null,
    tagIds: employee?.tagIds ?? [],
    jobPositionId: employee?.jobPositionId ?? null,
    jobTitle: employee?.jobTitle ?? "",
    departmentId: employee?.departmentId ?? null,
    managerId: employee?.managerId ?? null,
    employeeTypeId: employee?.employeeTypeId ?? null,
    workLocationId: employee?.workLocationId ?? null,
    company: employee?.company ?? "My Company",
    privateEmail: employee?.privateEmail ?? "",
    privatePhone: employee?.privatePhone ?? "",
    privateAddress: employee?.privateAddress ?? "",
    gender: employee?.gender ?? "",
    dateOfBirth: employee?.dateOfBirth ?? "",
    nationality: employee?.nationality ?? "",
    maritalStatus: employee?.maritalStatus ?? "",
    monthlyHours: employee?.monthlyHours ?? 0,
    kanbanState: employee?.kanbanState ?? "normal",
  });

  function set<K extends keyof EmployeeInput>(key: K, value: EmployeeInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleTag(id: string) {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds?.includes(id)
        ? prev.tagIds.filter((t) => t !== id)
        : [...(prev.tagIds ?? []), id],
    }));
  }

  function handleJobPositionChange(value: string | null) {
    const selected = formOptions.jobPositions.find((job) => job.id === value);
    setForm((prev) => ({
      ...prev,
      jobPositionId: value,
      jobTitle: selected?.name ?? (value ? prev.jobTitle : ""),
    }));
  }

  function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("avatarUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Ажилчны нэр шаардлагатай");
      return;
    }
    startTransition(async () => {
      try {
        if (employee) {
          await updateEmployee(employee.id, form);
          toast.success("Employee updated");
          router.push(`/employees/${employee.id}`);
        } else {
          const id = await createEmployee(form);
          toast.success("Employee created");
          router.push(`/employees/${id}`);
        }
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-border/70 bg-control-bar/95 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg bg-accent-foreground px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Check className="size-4" /> Хадгалах
          </button>
          <button
            type="button"
            onClick={() =>
              router.push(employee ? `/employees/${employee.id}` : "/employees")
            }
            className="flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-4" /> Цуцлах
          </button>
          <span className="ml-1 flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-brand-teal">
              Ажилчид
            </span>
            <span className="text-xs text-muted-foreground">
              {employee ? employee.name : "Шинээр элсэх"}
            </span>
          </span>
        </div>

        <div className="ml-auto flex flex-wrap gap-2">
          {smartButtons.map((btn) => {
            const Icon = btn.icon;
            const value =
              btn.valueKey === "monthlyHours"
                ? `${form.monthlyHours ?? 0}h`
                : btn.value;
            return (
              <div
                key={btn.label}
                className="flex items-center gap-2 rounded-xl border border-border bg-background/55 px-3 py-2 shadow-sm"
              >
                <Icon className="size-4 text-brand-teal" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-medium">{btn.label}</span>
                  {value ? (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <button
          type="button"
          className="mb-6 rounded-lg bg-accent-foreground/80 px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          onClick={() =>
            toast.info("User account creation is a placeholder in this demo")
          }
        >
          Хэрэглэгч нээх
        </button>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="shrink-0">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onPickAvatar}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex size-36 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted text-muted-foreground shadow-sm transition-colors hover:bg-accent"
              aria-label="Upload photo"
            >
              {form.avatarUrl ? (
                <img
                  src={form.avatarUrl}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <ImagePlus className="size-10" />
              )}
            </button>
          </div>

          <div className="flex-1">
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Овог нэр оруулна уу."
              className="w-full rounded-xl bg-background/35 px-3 py-2 text-3xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-brand-purple/15"
            />
            <div className="mt-4 flex flex-col gap-2.5">
              <HeaderField icon={Mail}>
                <input
                  value={form.workEmail}
                  onChange={(e) => set("workEmail", e.target.value)}
                  placeholder="имейл@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                />
              </HeaderField>
              <HeaderField icon={Phone}>
                <input
                  value={form.workPhone}
                  onChange={(e) => set("workPhone", e.target.value)}
                  placeholder="Ажлын утас"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                />
              </HeaderField>
              <HeaderField icon={Smartphone}>
                <input
                  value={form.workMobile}
                  onChange={(e) => set("workMobile", e.target.value)}
                  placeholder="Дугаар"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                />
              </HeaderField>
              <HeaderField icon={TagIcon}>
                <div className="flex flex-wrap gap-1.5">
                  {formOptions.tags.map((tag) => {
                    const active = form.tagIds?.includes(tag.id);
                    return (
                      <button
                        type="button"
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs transition-colors",
                          active
                            ? ""
                            : "border border-dashed border-border bg-background/45 text-muted-foreground hover:bg-accent"
                        )}
                        style={
                          active
                            ? {
                                backgroundColor: `${tag.color ?? "#888"}33`,
                                color: tag.color ?? undefined,
                              }
                            : undefined
                        }
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                  {formOptions.tags.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      Үүсгэн байгуулагч, CEO гэх мэт...
                    </span>
                  )}
                </div>
              </HeaderField>
            </div>
          </div>
        </div>

        <Tabs defaultValue="work" className="mt-8">
          <TabsList className="w-full justify-start gap-1 rounded-none border-b border-border bg-transparent p-0">
            {["work", "resume", "personal", "payroll", "settings"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-t-lg border-b-2 border-transparent px-4 py-2 capitalize text-muted-foreground data-[state=active]:border-brand-purple data-[state=active]:bg-brand-purple/10 data-[state=active]:text-brand-purple data-[state=active]:shadow-none"
                >
                  {tab}
                </TabsTrigger>
              )
            )}
          </TabsList>

          <TabsContent value="work" className="pt-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <SectionTitle>Албан тушаалын мэдээлэл</SectionTitle>
                <FieldSelect
                  label="Хэлтэс"
                  value={form.departmentId}
                  options={formOptions.departments}
                  onChange={(v) => set("departmentId", v)}
                />
                <FieldSelect
                  label="Албан Тушаал"
                  value={form.jobPositionId}
                  options={formOptions.jobPositions}
                  onChange={handleJobPositionChange}
                />
                <FieldText
                  label="Үүрэг"
                  value={form.jobTitle ?? ""}
                  placeholder="албан тушаалын тайлбар"
                  onChange={(v) => set("jobTitle", v)}
                />
                <FieldSelect
                  label="Удирдах албан тушаалтан"
                  value={form.managerId}
                  options={formOptions.managers.filter(
                    (m) => m.id !== employee?.id
                  )}
                  onChange={(v) => set("managerId", v)}
                />
                <FieldSelect
                  label="Ажлын байрны байршил"
                  value={form.workLocationId}
                  options={formOptions.workLocations}
                  onChange={(v) => set("workLocationId", v)}
                />
                <FieldText
                  label="Ажил олгогч"
                  value={form.company ?? ""}
                  onChange={(v) => set("company", v)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <SectionTitle>Organization Chart</SectionTitle>
                <p className="text-sm italic text-muted-foreground">
                  Менежер эсвэл холбогдох удирах албан тушаалтан.
                </p>
                <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                  {form.managerId
                    ? `Reports to ${
                        formOptions.managers.find(
                          (m) => m.id === form.managerId
                        )?.name ?? "selected manager"
                      }`
                    : "Холбогдох албан тушаалтан байхгүй байна."}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resume" className="pt-6">
            <SectionTitle>Resume</SectionTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Add experience, education and skills. Detailed resume lines can be
              added once the employee record is saved.
            </p>
          </TabsContent>

          <TabsContent value="personal" className="pt-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <SectionTitle>Private Contact</SectionTitle>
                <FieldText
                  label="Private Email"
                  value={form.privateEmail ?? ""}
                  onChange={(v) => set("privateEmail", v)}
                />
                <FieldText
                  label="Private Phone"
                  value={form.privatePhone ?? ""}
                  onChange={(v) => set("privatePhone", v)}
                />
                <div className="grid grid-cols-[140px_1fr] items-start gap-3">
                  <Label className="pt-2 text-sm font-medium">Address</Label>
                  <Textarea
                    value={form.privateAddress ?? ""}
                    onChange={(e) => set("privateAddress", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <SectionTitle>Citizenship</SectionTitle>
                <FieldSelectStatic
                  label="Gender"
                  value={form.gender ?? ""}
                  onChange={(v) => set("gender", v as EmployeeInput["gender"])}
                  options={[
                    { id: "male", name: "Male" },
                    { id: "female", name: "Female" },
                    { id: "other", name: "Other" },
                  ]}
                />
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <Label className="text-sm font-medium text-foreground/105">
                    Date of Birth
                  </Label>
                  <input
                    type="date"
                    value={form.dateOfBirth ?? ""}
                    onChange={(e) => set("dateOfBirth", e.target.value)}
                    className="soft-input"
                  />
                </div>
                <FieldText
                  label="Nationality"
                  value={form.nationality ?? ""}
                  onChange={(v) => set("nationality", v)}
                />
                <FieldSelectStatic
                  label="Marital Status"
                  value={form.maritalStatus ?? ""}
                  onChange={(v) =>
                    set("maritalStatus", v as EmployeeInput["maritalStatus"])
                  }
                  options={[
                    { id: "single", name: "Single" },
                    { id: "married", name: "Married" },
                    { id: "cohabitant", name: "Legal Cohabitant" },
                    { id: "widower", name: "Widower" },
                    { id: "divorced", name: "Divorced" },
                  ]}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payroll" className="pt-6">
            <div className="grid max-w-md gap-4">
              <SectionTitle>Contract</SectionTitle>
              <FieldSelect
                label="Employee Type"
                value={form.employeeTypeId}
                options={formOptions.employeeTypes}
                onChange={(v) => set("employeeTypeId", v)}
              />
              <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[140px_1fr] sm:gap-3">
                <Label className="text-sm font-medium text-foreground/105">
                  Monthly Hours
                </Label>
                <input
                  type="number"
                  value={form.monthlyHours ?? 0}
                  onChange={(e) => set("monthlyHours", Number(e.target.value))}
                  className="soft-input"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="pt-6">
            <div className="grid max-w-md gap-4">
              <SectionTitle>Status</SectionTitle>
              <FieldSelectStatic
                label="Kanban State"
                value={form.kanbanState ?? "normal"}
                onChange={(v) =>
                  set("kanbanState", v as EmployeeInput["kanbanState"])
                }
                options={[
                  { id: "normal", name: "In Progress (grey)" },
                  { id: "done", name: "Ready (green)" },
                  { id: "blocked", name: "Blocked (red)" },
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function HeaderField({
  icon: Icon,
  children,
}: {
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-border pb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </h2>
  );
}

function FieldText({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[140px_1fr] sm:gap-3">
      <Label className="text-sm font-medium text-foreground/105">{label}</Label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="soft-input"
      />
    </div>
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
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[140px_1fr] sm:gap-3">
      <Label className="text-sm font-medium text-foreground/105">{label}</Label>
      <Select
        value={value ?? "__none"}
        onValueChange={(v) => onChange(v === "__none" ? null : v)}
      >
        <SelectTrigger className="w-full bg-background/70">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none">—</SelectItem>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>
              {o.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function FieldSelectStatic({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[140px_1fr] sm:gap-3">
      <Label className="text-sm font-medium text-foreground/105">{label}</Label>
      <Select
        value={value || "__none"}
        onValueChange={(v) => onChange(v === "__none" || v == null ? "" : v)}
      >
        <SelectTrigger className="w-full bg-background/70">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none">—</SelectItem>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>
              {o.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
