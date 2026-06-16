"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { UsersRound } from "lucide-react";
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
    <aside className="hidden w-60 shrink-0 border-r border-border px-3 py-4 md:block">
      <div className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wide text-brand-teal">
        <UsersRound className="size-4" />
        Department
      </div>
      <nav className="flex flex-col gap-0.5 text-sm">
        <Link
          href={hrefFor()}
          className={cn(
            "rounded-md px-3 py-2 transition-colors hover:bg-accent",
            !current && "bg-accent font-medium"
          )}
        >
          All
        </Link>
        {departments.map((dep) => (
          <Link
            key={dep.id}
            href={hrefFor(dep.id)}
            className={cn(
              "flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-accent",
              current === dep.id && "bg-accent font-medium"
            )}
          >
            <span>{dep.name}</span>
            <span className="text-muted-foreground">{dep.employeeCount}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
