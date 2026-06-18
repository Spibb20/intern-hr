import { ControlBar, type ViewType } from "@/components/control-bar";
import { DepartmentSidebar } from "@/components/employees/department-sidebar";
import { EmployeeKanban } from "@/components/employees/employee-kanban";
import { EmployeeList } from "@/components/employees/employee-list";
import { getDepartmentsWithCounts, getEmployees } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{
    view?: string;
    q?: string;
    department?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const view: ViewType = params.view === "list" ? "list" : "kanban";
  const page = Math.max(1, Number(params.page) || 1);

  const [departments, allEmployees] = await Promise.all([
    getDepartmentsWithCounts(),
    getEmployees({
      search: params.q,
      departmentId: params.department,
    }),
  ]);

  const total = allEmployees.length;
  const employees = allEmployees.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="flex flex-col">
      <ControlBar
        title="Employees"
        newHref="/employees/new"
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        views={["kanban", "list"]}
        activeView={view}
      />
      <div className="flex">
        <DepartmentSidebar departments={departments} />
        <div className="min-w-0 flex-1">
          {view === "list" ? (
            <EmployeeList employees={employees} />
          ) : (
            <EmployeeKanban employees={employees} />
          )}
        </div>
      </div>
    </div>
  );
}
