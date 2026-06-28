"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteDepartment } from "@/lib/actions";
import type { DepartmentWithCount } from "@/lib/data/queries";

export function DepartmentBoard({
  departments,
}: {
  departments: DepartmentWithCount[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function remove(id: string, name: string) {
    startTransition(async () => {
      try {
        await deleteDepartment(id);
        toast.success(`${name} устлаа`);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Алдаа гарлаа");
      }
    });
  }

  if (departments.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Хэлтэс байхгүй байна.{" "}
        <Link href="/departments/new" className="text-foreground underline">
          Шинээр нэмэх
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 p-4 md:grid-cols-2 2xl:grid-cols-3">
      {departments.map((department) => (
        <div
          key={department.id}
          className="group rounded-md border bg-card p-4 transition-colors hover:border-foreground/25"
        >
          <div className="flex items-start justify-between gap-3">
            <Link href={`/departments/${department.id}`} className="min-w-0">
              <h3 className="truncate text-base font-semibold hover:underline">
                {department.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {department.parentName
                  ? `Дээд: ${department.parentName}`
                  : "Дээд хэлтэсгүй"}
              </p>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Department options"
                className="rounded-md p-1 text-muted-foreground hover:bg-accent"
              >
                <MoreVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/departments/${department.id}`}>Засах</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isPending}
                  onSelect={(event) => {
                    event.preventDefault();
                    remove(department.id, department.name);
                  }}
                >
                  <Trash2 className="size-4" /> Устгах
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
            <span>{department.officeName ?? "Оффисгүй"}</span>
            <Link
              href={`/employees?department=${department.id}`}
              className="hover:underline"
            >
              {department.employeeCount} ажилтан
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
