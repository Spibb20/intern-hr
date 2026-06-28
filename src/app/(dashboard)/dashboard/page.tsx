import Link from "next/link";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDashboardStats } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">HR Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Шинэ schema дээр ажиллаж байгаа үндсэн HR бүртгэл.
          </p>
        </div>
        <Button asChild>
          <Link href="/employees/new">
            <UserPlus className="size-4" />
            Ажилтан бүртгэх
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard
          title="Ажилтан"
          value={stats.employeeCount}
          icon={<UsersRound className="size-4" />}
        />
        <StatCard
          title="Хэлтэс"
          value={stats.departmentCount}
          icon={<Building2 className="size-4" />}
        />
        <StatCard
          title="Албан тушаал"
          value={stats.occupationCount}
          icon={<BriefcaseBusiness className="size-4" />}
        />
        <StatCard
          title="Боловсрол"
          value={stats.educationCount}
          icon={<GraduationCap className="size-4" />}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Сүүлд бүртгэгдсэн ажилчид</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/employees">Бүгдийг харах</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Код</TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>Хэлтэс</TableHead>
                <TableHead>Албан тушаал</TableHead>
                <TableHead>Төлөв</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentEmployees.map((employee) => (
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
                  <TableCell>{employee.department?.name ?? "—"}</TableCell>
                  <TableCell>
                    {employee.jobPosition?.name ?? employee.post ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.active ? "default" : "secondary"}>
                      {employee.status || "active"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="rounded-md border p-2 text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
