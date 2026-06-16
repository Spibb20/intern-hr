"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDepartment, updateDepartment } from "@/lib/actions";
import type { Department } from "@/lib/types";

interface Option {
  id: string;
  name: string;
}

const PALETTE = [
  "#22d3ee",
  "#d946a6",
  "#34d399",
  "#f59e0b",
  "#60a5fa",
  "#f87171",
];

export function DepartmentForm({
  managers,
  department,
}: {
  managers: Option[];
  department?: Department;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(department?.name ?? "");
  const [managerId, setManagerId] = useState<string | null>(
    department?.managerId ?? null
  );
  const [color, setColor] = useState(department?.color ?? PALETTE[0]);

  function handleSave() {
    if (!name.trim()) {
      toast.error("Department name is required");
      return;
    }
    startTransition(async () => {
      try {
        if (department) {
          await updateDepartment(department.id, { name, managerId, color });
          toast.success("Department updated");
        } else {
          await createDepartment({ name, managerId, color });
          toast.success("Department created");
        }
        router.push("/departments");
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
      <div className="flex items-center gap-2 bg-control-bar px-4 py-2.5">
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
          onClick={() => router.push("/departments")}
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
        >
          <X className="size-4" /> Discard
        </button>
        <span className="ml-1 flex flex-col leading-tight">
          <span className="text-[13px] font-medium text-brand-teal">
            Departments
          </span>
          <span className="text-xs text-muted-foreground">
            {department ? department.name : "New"}
          </span>
        </span>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
          className="w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground/50"
        />

        <div className="mt-6 flex flex-col gap-5">
          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <Label className="text-sm font-medium">Manager</Label>
            <Select
              value={managerId ?? "__none"}
              onValueChange={(v) => setManagerId(v === "__none" ? null : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none">—</SelectItem>
                {managers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-3">
            <Label className="text-sm font-medium">Color</Label>
            <div className="flex gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "size-6 rounded-full ring-offset-2 ring-offset-background transition",
                    color === c && "ring-2 ring-foreground"
                  )}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
