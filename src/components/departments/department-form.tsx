"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDepartment, updateDepartment } from "@/lib/actions";
import type { Department, Option } from "@/lib/types";

export function DepartmentForm({
  options,
  department,
}: {
  options: Record<string, Option[]>;
  department?: Department;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(department?.name ?? "");
  const [parentId, setParentId] = useState<string | null>(
    department?.parentId ?? null
  );
  const [schedule, setSchedule] = useState<string | null>(
    department?.scheduleId ?? null
  );
  const [officeIdent, setOfficeIdent] = useState<string | null>(
    department?.officeId ?? null
  );

  function save() {
    if (!name.trim()) {
      toast.error("Хэлтэсийн нэр оруулах шаардлагатай");
      return;
    }
    startTransition(async () => {
      try {
        if (department) {
          await updateDepartment(department.id, {
            name,
            parentId,
            schedule,
            officeIdent,
          });
          toast.success("Хэлтэс шинэчлэгдлээ");
        } else {
          await createDepartment({ name, parentId, schedule, officeIdent });
          toast.success("Хэлтэс нэмэгдлээ");
        }
        router.push("/departments");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Алдаа гарлаа");
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b bg-control-bar px-4 py-3">
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
          onClick={() => router.push("/departments")}
          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
        >
          <X className="size-4" /> Цуцлах
        </button>
        <div className="ml-2 leading-tight">
          <div className="text-sm font-semibold">Хэлтэс</div>
          <div className="text-xs text-muted-foreground">
            {department ? department.name : "Шинэ бүртгэл"}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <div className="rounded-md border bg-card p-4">
          <div className="grid gap-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">Хэлтэсийн нэр</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="soft-input text-lg font-semibold"
              />
            </label>
            <FieldSelect
              label="Дээд хэлтэс"
              value={parentId}
              options={(options.departments ?? []).filter(
                (item) => item.id !== department?.id
              )}
              onChange={setParentId}
            />
            <FieldSelect
              label="Ээлж"
              value={schedule}
              options={options.shifts ?? []}
              onChange={setSchedule}
            />
            <FieldSelect
              label="Оффис"
              value={officeIdent}
              options={options.offices ?? []}
              onChange={setOfficeIdent}
            />
          </div>
        </div>
      </div>
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
  value: string | null;
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
        <SelectTrigger className="bg-background">
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
