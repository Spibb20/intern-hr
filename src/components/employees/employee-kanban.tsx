import Link from "next/link";
import { Briefcase, Clock, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { EmployeeWithRelations } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function stateColor(state: EmployeeWithRelations["kanbanState"]) {
  if (state === "done") return "bg-chart-3";
  if (state === "blocked") return "bg-destructive";
  return "bg-muted-foreground/40";
}

export function EmployeeKanban({
  employees,
}: {
  employees: EmployeeWithRelations[];
}) {
  if (employees.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {employees.map((employee) => (
        <Link
          key={employee.id}
          href={`/employees/${employee.id}`}
          className="group flex overflow-hidden rounded-2xl border border-border/100 bg-background/55 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-teal/60 hover:shadow-md"
        >
          <div className="size-28 shrink-0 bg-muted/100">
            <Avatar className="size-28 rounded-none">
              <AvatarImage
                src={employee.avatarUrl ?? undefined}
                alt={employee.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-none bg-secondary text-lg">
                {initials(employee.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1 p-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-[15px] font-semibold text-foreground">
                {employee.name}
              </h3>
              <span
                className={`mt-1 size-2.5 shrink-0 rounded-full ${stateColor(
                  employee.kanbanState
                )}`}
                aria-hidden
              />
            </div>

            {(employee.jobPosition?.name || employee.jobTitle) && (
              <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                <Briefcase className="size-3.5 shrink-0 text-brand-purple" />
                <span className="truncate">
                  {employee.jobPosition?.name || employee.jobTitle}
                </span>
              </p>
            )}
            {employee.workEmail && (
              <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                <Mail className="size-3.5 shrink-0 text-brand-purple" />
                <span className="truncate">{employee.workEmail}</span>
              </p>
            )}
            {employee.workPhone && (
              <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                <Phone className="size-3.5 shrink-0 text-brand-purple" />
                <span className="truncate">{employee.workPhone}</span>
              </p>
            )}

            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-1">
                {employee.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full px-2 py-0.5 text-xs"
                    style={{
                      backgroundColor: `${tag.color}33`,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <Clock className="size-3.5 shrink-0 text-muted-foreground" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-muted-foreground">
      <p className="text-sm">No employees found.</p>
      <Link
        href="/employees/new"
        className="text-sm text-brand-teal hover:underline"
      >
        Create a new employee
      </Link>
    </div>
  );
}
