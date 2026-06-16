import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DepartmentWithCount } from "@/lib/data/queries";

export function DepartmentList({
  departments,
}: {
  departments: DepartmentWithCount[];
}) {
  if (departments.length === 0) {
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        No departments yet.
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-control-bar hover:bg-control-bar">
              <TableHead>Department</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="text-right">Employees</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dep) => (
              <TableRow key={dep.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/departments/${dep.id}`}
                    className="hover:text-brand-teal"
                  >
                    {dep.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {dep.managerName ?? "—"}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {dep.employeeCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
