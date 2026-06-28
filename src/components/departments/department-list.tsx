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
  if (departments.length === 0)
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Хэлтэс бүртгэгдээгүй байна.
      </div>
    );
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Хэлтэс</TableHead>
              <TableHead>Дээд хэлтэс</TableHead>
              <TableHead>Ээлж</TableHead>
              <TableHead>Оффис</TableHead>
              <TableHead className="text-right">Ажилтан</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/departments/${department.id}`}
                    className="hover:underline"
                  >
                    {department.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {department.parentName ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {department.scheduleName ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {department.officeName ?? "—"}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {department.employeeCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
