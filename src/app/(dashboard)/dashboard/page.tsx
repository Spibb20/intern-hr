import Link from "next/link";
import { UserPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Employees = [
  {
    code: "E-001",
    name: "Emma Granger",
    department: "It",
    position: "Consultant",
    status: "Active",
  },
  {
    code: "E-002",
    name: "Emma Granger",
    department: "It",
    position: "Consultant",
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <section className="flex flex-col justify-between gap-4 sm:flex-row items-center">
        <div>
          <p>HR -----</p>
        </div>
        <Button asChild className="bg-[#714b67] hover:bg-[#5f3f57]">
          <Link href="/employees/new">
            <UserPlus className="mr-2 size-4" />
            Бүртгэх
          </Link>
        </Button>
      </section>
      <section className="grid gap-6 ">
        <Card className="min-w-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Employees</CardTitle>
              <CardDescription>recent</CardDescription>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link href="/employees">Бүгдийг харах</Link>
            </Button>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Код</TableHead>
                  <TableHead>Ажилтны нэр</TableHead>
                  <TableHead>Хэлтэс</TableHead>
                  <TableHead>Албан тушаал</TableHead>
                  <TableHead>Төлөв</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Employees.map((employee) => (
                  <TableRow key={employee.code}>
                    <TableCell className="font-medium">
                      {employee.code}
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "Идэвхтэй"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
