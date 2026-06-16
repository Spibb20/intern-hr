import { EmployeeForm } from "@/components/employees/employee-form";
import { getFormOptions } from "@/lib/data/queries";

export default function NewEmployeePage() {
  const options = getFormOptions();
  return <EmployeeForm options={options} />;
}
