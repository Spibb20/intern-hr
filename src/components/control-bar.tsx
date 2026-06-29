"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type ViewType = "kanban" | "list";

interface ControlBarProps {
  title: string;
  subtitle?: string;
  newHref?: string;
  total?: number;
  page?: number;
  pageSize?: number;
  views?: ViewType[];
  activeView?: ViewType;
  searchable?: boolean;
  showGear?: boolean;
}

export function ControlBar({
  title,
  subtitle,
  newHref,
  total,
  page = 1,
  pageSize = 20,
  views,
  activeView = "kanban",
  searchable = true,
}: ControlBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) params.set("q", term);
      else params.delete("q");
      params.delete("page");
      startTransition(() => router.replace(`${pathname}?${params.toString()}`));
    }, 350);
    return () => clearTimeout(handle);
  }, [term, pathname, router, searchParams]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    startTransition(() => router.replace(`${pathname}?${params.toString()}`));
  }

  const hasPager = typeof total === "number";
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total ?? 0);
  const canPrev = page > 1;
  const canNext = (total ?? 0) > page * pageSize;

  return (
    <div className="flex flex-wrap items-center gap-3 border-b bg-control-bar px-3 py-2">
      <div className="flex items-center gap-2">
        {newHref && (
          <Link
            href={newHref}
            className="border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
          >
            Шинэ
          </Link>
        )}
        <div className="leading-tight">
          <h1 className="text-sm font-semibold">{title}</h1>
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>

      {searchable && (
        <div className="order-last w-full md:order-0 md:mx-auto md:max-w-xl md:flex-1">
          <div className="flex items-center border bg-background">
            <span className="border-sm border-r rounded-sm bg-muted px-2 py-1.5 text-xs text-muted-foreground">
              Хайх
            </span>
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Нэр, код, регистр, утас, имэйл..."
              className="h-8 w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {hasPager && (
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {start}-{end} / {total}
            </span>
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setParam("page", String(page - 1))}
              className="border bg-background px-2 py-1 text-sm text-muted-foreground hover:bg-accent disabled:opacity-40"
            >
              Өмнөх
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setParam("page", String(page + 1))}
              className="border bg-background px-2 py-1 text-sm text-muted-foreground hover:bg-accent disabled:opacity-40"
            >
              Дараах
            </button>
          </div>
        )}
        {views && views.length > 0 && (
          <div className="flex border bg-background">
            {views.includes("kanban") && (
              <button
                type="button"
                onClick={() => setParam("view", "kanban")}
                className={cn(
                  "px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent",
                  activeView === "kanban" && "bg-accent text-foreground"
                )}
              >
                Карт
              </button>
            )}
            {views.includes("list") && (
              <button
                type="button"
                onClick={() => setParam("view", "list")}
                className={cn(
                  "border-l px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent",
                  activeView === "list" && "bg-accent text-foreground"
                )}
              >
                Жагсаалт
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
