import Link from "next/link";
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
          <h1 className="text-lg font-semibold">Хүний нөөцийн бүртгэл</h1>
          <p className="text-sm text-muted-foreground">
            Ажилтан, хэлтэс, лавлах тохиргоонууд өгөгдлийн сантай шууд
            холбогдсон.
          </p>
        </div>
        <Button asChild>
          <Link href="/employees/new">Ажилтан бүртгэх</Link>
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard title="Ажилтан" value={stats.employeeCount} />
        <StatCard title="Хэлтэс" value={stats.departmentCount} />
        <StatCard title="Албан тушаал" value={stats.occupationCount} />
        <StatCard title="Боловсрол" value={stats.educationCount} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted py-2">
          <CardTitle>Сүүлд бүртгэгдсэн ажилтан</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/employees">Бүгдийг харах</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
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
                      {employee.active ? "Идэвхтэй" : "Идэвхгүй"}
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

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
