import { notFound } from "next/navigation";
import { EmployeeForm } from "@/components/employees/employee-form";
import { getEmployee, getFormOptions } from "@/lib/data/queries";

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = getEmployee(id);
  if (!employee) notFound();

  const options = getFormOptions();
  return <EmployeeForm options={options} employee={employee} />;
}
