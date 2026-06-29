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
  if (employees.length === 0)
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Ажилтан олдсонгүй.
      </div>
    );

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-sm border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Код</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>Албан тушаал</TableHead>
              <TableHead className="hidden md:table-cell">Имэйл</TableHead>
              <TableHead className="hidden lg:table-cell">Утас</TableHead>
              <TableHead>Хэлтэс</TableHead>
              <TableHead>Төлөв</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="text-muted-foreground">
                  {employee.empno || employee.employeeId}
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/employees/${employee.id}`}
                    className="hover:underline"
                  >
                    {employee.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.jobPosition?.name || employee.post || "—"}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {employee.email || "—"}
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">
                  {employee.workphone || employee.phone2 || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.department?.name ?? "—"}
                </TableCell>
                <TableCell>
                  <span className="rounded-sm border px-2 py-1 text-xs text-muted-foreground">
                    {employee.status === "inactive"
                      ? "Идэвхгүй"
                      : employee.status === "fired"
                      ? "Гарсан"
                      : "Идэвхтэй"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
