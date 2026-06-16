import { ControlBar, type ViewType } from "@/components/control-bar";
import { DepartmentBoard } from "@/components/departments/department-board";
import { DepartmentList } from "@/components/departments/department-list";
import { getDepartmentsWithCounts } from "@/lib/data/queries";

export default async function DepartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; q?: string }>;
}) {
  const params = await searchParams;
  const view: ViewType = params.view === "list" ? "list" : "kanban";

  let departments = getDepartmentsWithCounts();
  if (params.q) {
    const q = params.q.toLowerCase();
    departments = departments.filter((d) => d.name.toLowerCase().includes(q));
  }

  return (
    <div className="flex flex-col">
      <ControlBar
        title="Departments"
        showGear
        newHref="/departments/new"
        total={departments.length}
        views={["kanban", "list"]}
        activeView={view}
      />
      {view === "list" ? (
        <DepartmentList departments={departments} />
      ) : (
        <DepartmentBoard departments={departments} />
      )}
    </div>
  );
}
