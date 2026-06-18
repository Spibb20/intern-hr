import { notFound } from "next/navigation";
import { EmployeeForm } from "@/components/employees/employee-form";
import { getEmployee, getFormOptions } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [employee, options] = await Promise.all([
    getEmployee(id),
    getFormOptions(),
  ]);

  if (!employee) notFound();

  return <EmployeeForm options={options} employee={employee} />;
}
