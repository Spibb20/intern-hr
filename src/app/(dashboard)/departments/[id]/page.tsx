import { notFound } from "next/navigation";
import { DepartmentForm } from "@/components/departments/department-form";
import { getDepartment, getFormOptions } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [department, options] = await Promise.all([
    getDepartment(id),
    getFormOptions(),
  ]);
  if (!department) notFound();
  return <DepartmentForm options={options} department={department} />;
}
