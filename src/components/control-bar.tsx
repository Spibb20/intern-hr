"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Loader2,
  Search,
  Settings,
} from "lucide-react";
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
  showGear = false,
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
    }, 300);
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
    <div className="flex flex-wrap items-center gap-3 border-b bg-control-bar px-4 py-3">
      <div className="flex items-center gap-3">
        {newHref && (
          <Link
            href={newHref}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            Шинээр нээх
          </Link>
        )}
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-semibold">{title}</h1>
            {showGear && (
              <Settings className="size-3.5 text-muted-foreground" />
            )}
          </div>
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>

      {searchable && (
        <div className="order-last w-full md:order-0 md:mx-auto md:max-w-xl md:flex-1">
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
            {isPending ? (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="size-4 text-muted-foreground" />
            )}
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Хайх..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
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
              className="rounded-md border bg-background p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setParam("page", String(page + 1))}
              className="rounded-md border bg-background p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
        {views && views.length > 0 && (
          <div className="flex overflow-hidden rounded-md border bg-background">
            {views.includes("kanban") && (
              <button
                type="button"
                onClick={() => setParam("view", "kanban")}
                className={cn(
                  "p-2 text-muted-foreground hover:bg-accent",
                  activeView === "kanban" && "bg-accent text-foreground"
                )}
                aria-label="Kanban view"
              >
                <LayoutGrid className="size-4" />
              </button>
            )}
            {views.includes("list") && (
              <button
                type="button"
                onClick={() => setParam("view", "list")}
                className={cn(
                  "p-2 text-muted-foreground hover:bg-accent",
                  activeView === "list" && "bg-accent text-foreground"
                )}
                aria-label="List view"
              >
                <List className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
