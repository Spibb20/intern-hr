import { EmployeeCard } from "./employee-card";

export function EmployeeGrid({ employees }: { employees: any[] }) {
  return (
    <div
      className="
      grid
      grid-cols-3
      gap-4
      p-4
    "
    >
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
