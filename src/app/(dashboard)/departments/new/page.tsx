import { DepartmentForm } from "@/components/departments/department-form";
import { getFormOptions } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

export default async function NewDepartmentPage() {
  const options = await getFormOptions();
  return <DepartmentForm managers={options.managers} />;
}
