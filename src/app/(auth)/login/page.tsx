import Link from "next/link";
import { UsersRound } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md rounded-2xl border border-border/80 bg-card/90 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand-purple text-primary-foreground">
          <UsersRound className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
        <p className="mt-2 text-sm text-muted-foreground">Demo</p>
        <Link
          href="/employees"
          className="mt-6 inline-flex rounded-lg bg-brand-purple px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Open Employees
        </Link>
      </section>
    </main>
  );
}
