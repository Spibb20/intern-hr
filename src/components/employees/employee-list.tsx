import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EmployeeWithRelations } from "@/lib/types";

export function EmployeeList({
  employees,
}: {
  employees: EmployeeWithRelations[];
}) {
  if (employees.length === 0) {
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        No employees found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-xl border border-border bg-background/45 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-control-bar/90 hover:bg-control-bar">
              <TableHead>Name</TableHead>
              <TableHead>Job Position</TableHead>
              <TableHead className="hidden md:table-cell">Work Email</TableHead>
              <TableHead className="hidden lg:table-cell">Work Phone</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} className="cursor-pointer">
                <TableCell className="font-medium">
                  <Link
                    href={`/employees/${employee.id}`}
                    className="hover:text-brand-teal"
                  >
                    {employee.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.jobPosition?.name || employee.jobTitle || "—"}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {employee.workEmail || "—"}
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">
                  {employee.workPhone || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.department?.name ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
