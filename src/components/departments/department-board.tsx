"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteDepartment } from "@/lib/actions";
import type { DepartmentWithCount } from "@/lib/data/queries";

export function DepartmentBoard({
  departments,
}: {
  departments: DepartmentWithCount[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, name: string) {
    startTransition(async () => {
      try {
        await deleteDepartment(id);
        toast.success(`Deleted ${name}`);
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    });
  }

  if (departments.length === 0) {
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        No departments yet.{" "}
        <Link
          href="/departments/new"
          className="text-brand-teal hover:underline"
        >
          Create one
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
      {departments.map((dep) => (
        <div
          key={dep.id}
          className="group relative overflow-hidden rounded-2xl border border-border/100 bg-background/55 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ borderLeft: `3px solid ${dep.color}` }}
        >
          <div className="flex items-start justify-between p-4">
            <Link href={`/departments/${dep.id}`} className="min-w-0">
              <h3 className="text-lg font-semibold text-brand-teal hover:underline">
                {dep.name}
              </h3>
              {dep.managerName && (
                <p className="text-sm text-muted-foreground">
                  {dep.managerName}
                </p>
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Department options"
                className="rounded-lg p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
              >
                <MoreVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/departments/${dep.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isPending}
                  onSelect={(e) => {
                    e.preventDefault();
                    handleDelete(dep.id, dep.name);
                  }}
                >
                  <Trash2 className="size-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="px-4 pb-4">
            <Link
              href={`/employees?department=${dep.id}`}
              className="inline-flex rounded-lg bg-brand-purple/15 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-brand-purple/25"
            >
              {dep.employeeCount} Employees
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
