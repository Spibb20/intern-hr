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
  options: FormOptions;
  employee?: EmployeeWithRelations;
}

const smartButtons = [
  { icon: DollarSign, label: "Salary Adjustment", value: "New" },
  { icon: CalendarClock, label: "Time Off", value: "" },
  { icon: Clock, label: "Monthly Hours", valueKey: "monthlyHours" },
  { icon: History, label: "History", value: "0" },
];

export function EmployeeForm({ options, employee }: EmployeeFormProps) {
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

  function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("avatarUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Employee's name is required");
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
      <div className="flex flex-wrap items-center gap-3 bg-control-bar px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-md bg-brand-purple px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Check className="size-4" /> Save
          </button>
          <button
            type="button"
            onClick={() =>
              router.push(employee ? `/employees/${employee.id}` : "/employees")
            }
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            <X className="size-4" /> Discard
          </button>
          <span className="ml-1 flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-brand-teal">
              Employees
            </span>
            <span className="text-xs text-muted-foreground">
              {employee ? employee.name : "New"}
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
                className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5"
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
          className="mb-6 rounded-md bg-brand-purple px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          onClick={() =>
            toast.info("User account creation is a placeholder in this demo")
          }
        >
          Create User
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
              className="flex size-36 items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent"
              aria-label="Upload photo"
            >
              {form.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
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
              placeholder="Employee's Name (e.g. John Doe, ...)"
              className="w-full bg-transparent text-3xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50"
            />
            <div className="mt-4 flex flex-col gap-2.5">
              <HeaderField icon={Mail}>
                <input
                  value={form.workEmail}
                  onChange={(e) => set("workEmail", e.target.value)}
                  placeholder="e.g. johndoe@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </HeaderField>
              <HeaderField icon={Phone}>
                <input
                  value={form.workPhone}
                  onChange={(e) => set("workPhone", e.target.value)}
                  placeholder="Work Phone"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </HeaderField>
              <HeaderField icon={Smartphone}>
                <input
                  value={form.workMobile}
                  onChange={(e) => set("workMobile", e.target.value)}
                  placeholder="Work Mobile"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </HeaderField>
              <HeaderField icon={TagIcon}>
                <div className="flex flex-wrap gap-1.5">
                  {options.tags.map((tag) => {
                    const active = form.tagIds?.includes(tag.id);
                    return (
                      <button
                        type="button"
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={cn(
                          "rounded px-2 py-0.5 text-xs transition-colors",
                          active
                            ? ""
                            : "border border-dashed border-border text-muted-foreground"
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
                  {options.tags.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      e.g. Founder, Motorized, ...
                    </span>
                  )}
                </div>
              </HeaderField>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="work" className="mt-8">
          <TabsList className="w-full justify-start gap-1 rounded-none border-b border-border bg-transparent p-0">
            {["work", "resume", "personal", "payroll", "settings"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent capitalize data-[state=active]:border-brand-purple data-[state=active]:bg-transparent data-[state=active]:text-brand-purple data-[state=active]:shadow-none"
                >
                  {tab}
                </TabsTrigger>
              )
            )}
          </TabsList>

          {/* WORK */}
          <TabsContent value="work" className="pt-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <SectionTitle>Work</SectionTitle>
                <FieldSelect
                  label="Department"
                  value={form.departmentId}
                  options={options.departments}
                  onChange={(v) => set("departmentId", v)}
                />
                <FieldText
                  label="Job Position"
                  value={form.jobTitle ?? ""}
                  placeholder="e.g. Sales Manager"
                  onChange={(v) => set("jobTitle", v)}
                />
                <FieldSelect
                  label="Manager"
                  value={form.managerId}
                  options={options.managers.filter(
                    (m) => m.id !== employee?.id
                  )}
                  onChange={(v) => set("managerId", v)}
                />
                <FieldSelect
                  label="Work Location"
                  value={form.workLocationId}
                  options={options.workLocations}
                  onChange={(v) => set("workLocationId", v)}
                />
                <FieldText
                  label="Company"
                  value={form.company ?? ""}
                  onChange={(v) => set("company", v)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <SectionTitle>Organization Chart</SectionTitle>
                <p className="text-sm italic text-muted-foreground">
                  Set a manager or reports to show in org chart.
                </p>
                <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                  {form.managerId
                    ? `Reports to ${
                        options.managers.find((m) => m.id === form.managerId)
                          ?.name
                      }`
                    : "No manager set."}
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
                <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                  <Label className="text-sm font-medium">Date of Birth</Label>
                  <input
                    type="date"
                    value={form.dateOfBirth ?? ""}
                    onChange={(e) => set("dateOfBirth", e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring scheme-dark"
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
                options={options.employeeTypes}
                onChange={(v) => set("employeeTypeId", v)}
              />
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label className="text-sm font-medium">Monthly Hours</Label>
                <input
                  type="number"
                  value={form.monthlyHours ?? 0}
                  onChange={(e) => set("monthlyHours", Number(e.target.value))}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
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
    <h2 className="border-b border-border pb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
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
    <div className="grid grid-cols-[140px_1fr] items-center gap-3">
      <Label className="text-sm font-medium">{label}</Label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
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
    <div className="grid grid-cols-[140px_1fr] items-center gap-3">
      <Label className="text-sm font-medium">{label}</Label>
      <Select
        value={value ?? "__none"}
        onValueChange={(v) => onChange(v === "__none" ? null : v)}
      >
        <SelectTrigger className="w-full">
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
    <div className="grid grid-cols-[140px_1fr] items-center gap-3">
      <Label className="text-sm font-medium">{label}</Label>
      <Select
        value={value || "__none"}
        onValueChange={(v) => onChange(v === "__none" || v == null ? "" : v)}
      >
        <SelectTrigger className="w-full">
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
