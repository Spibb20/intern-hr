"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  MessageSquare,
  Settings2,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const configSections: {
  label: string;
  items: { label: string; href: string }[];
}[] = [
  {
    label: "Employee",
    items: [
      { label: "Departments", href: "/departments" },
      { label: "Employee Types", href: "/configuration/employee-types" },
      { label: "Work Locations", href: "/configuration/work-locations" },
      { label: "Tags", href: "/configuration/tags" },
      { label: "Departure Reasons", href: "/configuration/departure-reasons" },
    ],
  },
  {
    label: "Recruitment",
    items: [{ label: "Job Positions", href: "/configuration/job-positions" }],
  },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium text-navbar-foreground/80 transition-colors hover:bg-white/10",
        active && "bg-white/10 text-navbar-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function AppNavbar() {
  const pathname = usePathname();
  const configActive =
    pathname.startsWith("/configuration") ||
    pathname.startsWith("/departments");

  return (
    <header className="sticky top-0 z-40 flex h-12 items-center gap-1 bg-navbar px-3 text-navbar-foreground">
      <Link href="/employees" className="mr-2 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-md bg-brand-purple text-primary-foreground">
          <UsersRound className="size-4" />
        </span>
        <span className="text-[15px] font-semibold">Employees</span>
      </Link>

      <nav className="flex items-center gap-0.5">
        <NavLink href="/employees" label="Employees" />
        <NavLink href="/departments" label="Departments" />

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium text-navbar-foreground/80 outline-none transition-colors hover:bg-white/10 data-[state=open]:bg-white/15",
              configActive && "text-navbar-foreground"
            )}
          >
            Configuration
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            {configSections.map((section) => (
              <div key={section.label}>
                <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {section.label}
                </DropdownMenuLabel>
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.href}>
                    <Link href={item.href} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-3 text-navbar-foreground/70 sm:flex">
          <MessageSquare className="size-4.5" />
          <Bell className="size-4.5" />
          <Settings2 className="size-4.5" />
        </div>
        <span className="hidden text-sm font-medium sm:inline">infosys</span>
        <Avatar className="size-7 rounded-md">
          <AvatarFallback className="rounded-md bg-brand-teal text-[11px] font-semibold text-background">
            IS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
