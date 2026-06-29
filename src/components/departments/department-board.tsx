"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteDepartment } from "@/lib/actions";
import type { DepartmentWithCount } from "@/lib/data/queries";

export function DepartmentBoard({
  departments,
}: {
  departments: DepartmentWithCount[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function remove(id: string, name: string) {
    startTransition(async () => {
      try {
        await deleteDepartment(id);
        toast.success(`${name} устлаа`);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Алдаа гарлаа");
      }
    });
  }

  if (departments.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Хэлтэс бүртгэгдээгүй байна.{" "}
        <Link href="/departments/new" className="text-foreground underline">
          Шинээр нэмэх
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 p-3 md:grid-cols-2 2xl:grid-cols-3">
      {departments.map((department) => (
        <div
          key={department.id}
          className="group border bg-card p-3 transition-colors hover:border-foreground/25"
        >
          <div className="flex items-start justify-between gap-3">
            <Link href={`/departments/${department.id}`} className="min-w-0">
              <h3 className="truncate text-base font-semibold hover:underline">
                {department.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {department.parentName
                  ? `Дээд хэлтэс: ${department.parentName}`
                  : "Дээд хэлтэсгүй"}
              </p>
            </Link>
            <div className="flex gap-1 text-xs">
              <Link
                href={`/departments/${department.id}`}
                className="border px-2 py-1 hover:bg-accent"
              >
                Засах
              </Link>
              <button
                type="button"
                disabled={isPending}
                onClick={() => remove(department.id, department.name)}
                className="border px-2 py-1 text-destructive hover:bg-accent disabled:opacity-50"
              >
                Устгах
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
            <span>{department.officeName ?? "Алба/байршилгүй"}</span>
            <Link
              href={`/employees?department=${department.id}`}
              className="hover:underline"
            >
              {department.employeeCount} ажилтан
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
