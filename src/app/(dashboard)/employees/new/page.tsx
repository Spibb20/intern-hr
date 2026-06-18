import { EmployeeForm } from "@/components/employees/employee-form";
import { getFormOptions } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

export default async function NewEmployeePage() {
  const options = await getFormOptions();
  return <EmployeeForm options={options} />;
}
