import Link from "next/link";
import { Briefcase, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { EmployeeWithRelations } from "@/lib/types";

function initials(name: string) {
  return (
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "HR"
  );
}

export function EmployeeKanban({
  employees,
}: {
  employees: EmployeeWithRelations[];
}) {
  if (employees.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {employees.map((employee) => (
        <Link
          key={employee.id}
          href={`/employees/${employee.id}`}
          className="group rounded-md border bg-card p-3 transition-colors hover:border-foreground/25"
        >
          <div className="flex gap-3">
            <Avatar className="size-16 rounded-md">
              <AvatarImage
                src={employee.photoUrl ?? undefined}
                alt={employee.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md">
                {initials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-sm font-semibold group-hover:underline">
                  {employee.name}
                </h3>
                <span className="rounded border px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {employee.status || "active"}
                </span>
              </div>
              {(employee.jobPosition?.name || employee.post) && (
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                  <Briefcase className="size-3.5" />
                  {employee.jobPosition?.name || employee.post}
                </p>
              )}
              {employee.email && (
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                  <Mail className="size-3.5" />
                  {employee.email}
                </p>
              )}
              {(employee.workphone || employee.phone2) && (
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                  <Phone className="size-3.5" />
                  {employee.workphone || employee.phone2}
                </p>
              )}
              <p className="mt-2 truncate text-xs text-muted-foreground">
                {employee.department?.name ?? "Хэлтэсгүй"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center text-muted-foreground">
      <p className="text-sm">Одоогоор ажилтан байхгүй.</p>
      <Link href="/employees/new" className="text-sm text-foreground underline">
        Шинэ ажилтан нэмэх
      </Link>
    </div>
  );
}
