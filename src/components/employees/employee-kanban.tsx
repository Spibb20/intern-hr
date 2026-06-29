import Link from "next/link";
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

function statusLabel(status: string) {
  if (status === "inactive") return "Идэвхгүй";
  if (status === "fired") return "Гарсан";
  return "Идэвхтэй";
}

export function EmployeeKanban({
  employees,
}: {
  employees: EmployeeWithRelations[];
}) {
  if (employees.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {employees.map((employee) => (
        <Link
          key={employee.id}
          href={`/employees/${employee.id}`}
          className="group border bg-card p-3 transition-colors hover:border-foreground/30"
        >
          <div className="flex gap-3">
            <Avatar className="size-14 rounded-sm">
              <AvatarImage
                src={employee.photoUrl ?? undefined}
                alt={employee.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-sm bg-muted text-sm">
                {initials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-sm font-semibold group-hover:underline">
                  {employee.name}
                </h3>
                <span className="border px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {statusLabel(employee.status)}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {employee.jobPosition?.name ||
                  employee.post ||
                  "Албан тушаалгүй"}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {employee.department?.name ?? "Хэлтэсгүй"}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {[employee.email, employee.workphone || employee.phone2]
                  .filter(Boolean)
                  .join(" · ") || "Холбоо барих мэдээлэлгүй"}
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
      <p className="text-sm">Одоогоор ажилтан бүртгэгдээгүй байна.</p>
      <Link href="/employees/new" className="text-sm text-foreground underline">
        Шинэ ажилтан нэмэх
      </Link>
    </div>
  );
}
