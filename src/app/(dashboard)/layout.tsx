import type { ReactNode } from "react";

import { AppNavbar } from "@/components/app-navbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <AppNavbar />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto w-full max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}

/*import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppNavbar } from "@/components/app-navbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-muted/30">
        <AppNavbar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
} */
