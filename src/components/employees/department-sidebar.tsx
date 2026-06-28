"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DepartmentWithCount } from "@/lib/data/queries";

export function DepartmentSidebar({
  departments,
}: {
  departments: DepartmentWithCount[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("department");

  function hrefFor(departmentId?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (departmentId) params.set("department", departmentId);
    else params.delete("department");
    return `${pathname}?${params.toString()}`;
  }

  return (
    <aside className="hidden w-60 shrink-0 border-r bg-muted/20 p-3 md:block">
      <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Хэлтэс
      </div>
      <nav className="flex flex-col gap-1 text-sm">
        <Link
          href={hrefFor()}
          className={cn(
            "rounded-md px-3 py-2 hover:bg-accent",
            !current && "bg-accent font-medium"
          )}
        >
          Бүгд
        </Link>
        {departments.map((department) => (
          <Link
            key={department.id}
            href={hrefFor(department.id)}
            className={cn(
              "flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent",
              current === department.id && "bg-accent font-medium"
            )}
          >
            <span className="truncate">{department.name}</span>
            <span className="text-muted-foreground">
              {department.employeeCount}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
