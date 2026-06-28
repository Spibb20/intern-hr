import type { ReactNode } from "react";
import { AppNavbar } from "@/components/app-navbar";

type DashboardLayoutProps = { children: ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="p-3 sm:p-5">
        <div className="mx-auto w-full max-w-[1800px] overflow-hidden rounded-md border bg-card">
          {children}
        </div>
      </main>
    </div>
  );
}
