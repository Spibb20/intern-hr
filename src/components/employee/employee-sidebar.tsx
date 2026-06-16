export function EmployeeSidebar() {
  return (
    <aside className="w-72 border-r">
      <div className="p-4 font-bold">DEPARTMENT</div>

      <div className="space-y-1 p-2">
        <button className="w-full text-left px-3 py-2 rounded">All</button>

        <button className="w-full text-left px-3 py-2 rounded">
          Administration
        </button>

        <button className="w-full text-left px-3 py-2 rounded">
          Research & Development
        </button>
      </div>
    </aside>
  );
}
