"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Settings2, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

const configSections = [
  {
    label: "Үндсэн",
    items: [
      { label: "Албан тушаал", href: "/configuration/occupations" },
      { label: "Боловсрол", href: "/configuration/education" },
      { label: "Төгссөн сургууль", href: "/configuration/graduates" },
      { label: "Ур чадвар", href: "/configuration/work-skills" },
      { label: "Ээлж", href: "/configuration/shifts" },
      { label: "Цагийн хуваарь", href: "/configuration/schedules" },
      { label: "Оффис", href: "/configuration/offices" },
    ],
  },
  {
    label: "Байгууллага",
    items: [
      { label: "Салбар", href: "/configuration/branches" },
      { label: "Банк", href: "/configuration/banks" },
      { label: "Улс", href: "/configuration/countries" },
      { label: "Хот/аймаг", href: "/configuration/cities" },
      { label: "Дүүрэг/сум", href: "/configuration/districts" },
    ],
  },
  {
    label: "Ажилтны лавлах",
    items: [
      { label: "Үндэс угсаа", href: "/configuration/nationalities" },
      { label: "Гэрлэлтийн төлөв", href: "/configuration/marital-status" },
      { label: "Зэрэг", href: "/configuration/degrees" },
      { label: "Даатгал", href: "/configuration/insurance-types" },
      { label: "Гарсан шалтгаан", href: "/configuration/fired-reasons" },
      { label: "Орон сууц", href: "/configuration/apartment-conditions" },
      { label: "Машин эзэмшил", href: "/configuration/car-ownership" },
      { label: "Хувцас/гутал", href: "/configuration/clothes-sizes" },
    ],
  },
  {
    label: "Нэмэлт",
    items: [
      { label: "Боловсролын төрөл", href: "/configuration/education-types" },
      {
        label: "Мэргэжлийн сургалт",
        href: "/configuration/special-education-types",
      },
      { label: "Гадаад хэл", href: "/configuration/foreign-languages" },
      { label: "Жолооны ангилал", href: "/configuration/driver-types" },
      { label: "Авьяас", href: "/configuration/talents" },
      { label: "Нийгмийн гарал", href: "/configuration/social-origin" },
      { label: "Сонгуулийн ажил", href: "/configuration/voting-work" },
    ],
  },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium text-navbar-foreground/85 hover:bg-white/10",
        active && "bg-white/12 text-navbar-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function AppNavbar() {
  const pathname = usePathname();
  const configActive = pathname.startsWith("/configuration");

  return (
    <header className="sticky top-0 z-40 flex min-h-12 flex-wrap items-center gap-1 border-b bg-navbar px-3 text-navbar-foreground">
      <Link href="/dashboard" className="mr-2 flex items-center gap-2 py-2">
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <UsersRound className="size-4" />
        </span>
        <span className="text-sm font-semibold">HR</span>
      </Link>

      <nav className="flex flex-wrap items-center gap-0.5">
        <NavLink href="/dashboard" label="Dashboard" />
        <NavLink href="/employees" label="Ажилчид" />
        <NavLink href="/departments" label="Хэлтэс" />
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium text-navbar-foreground/85 outline-none hover:bg-white/10",
              configActive && "bg-white/12 text-navbar-foreground"
            )}
          >
            Configuration
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-[75vh] w-72 overflow-y-auto"
          >
            {configSections.map((section) => (
              <div key={section.label}>
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  {section.label}
                </DropdownMenuLabel>
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className="ml-auto flex items-center gap-2 py-2">
        <ThemeToggle />
        <Settings2 className="hidden size-4 text-navbar-foreground/70 sm:block" />
        <Database className="hidden size-4 text-navbar-foreground/70 sm:block" />
        <Avatar className="size-7 rounded-md">
          <AvatarFallback className="rounded-md text-xs">HR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
