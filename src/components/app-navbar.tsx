"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { configSections } from "@/lib/config-navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm text-navbar-foreground/85 hover:bg-white/10",
        active && "bg-white/15 text-navbar-foreground"
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
    <header className="sticky top-0 z-40 flex min-h-11 items-center border-b bg-navbar px-3 text-navbar-foreground">
      <Link href="/dashboard" className="mr-3 py-2 text-sm font-semibold">
        Хүний нөөц
      </Link>

      <nav className="flex items-center text-sm">
        <NavLink href="/employees" label="Ажилтан" />
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "px-3 py-2 text-sm text-navbar-foreground/85 outline-none hover:bg-white/10",
              configActive && "bg-white/15 text-navbar-foreground"
            )}
          >
            Тохируулга
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-[78vh] w-72 overflow-y-auto rounded-sm"
          >
            <DropdownMenuItem asChild>
              <Link href="/configuration">Тохируулгын нүүр</Link>
            </DropdownMenuItem>
            {configSections.map((section) => (
              <div key={section.label}>
                <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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

      <div className="ml-auto flex items-center gap-2 py-1.5">
        <ThemeToggle />
        <span className="hidden border-l pl-3 text-xs text-navbar-foreground/75 sm:inline">
          Хэрэглэгч
        </span>
      </div>
    </header>
  );
}
