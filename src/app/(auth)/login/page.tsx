import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md border bg-card p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center border bg-muted text-sm font-semibold">
          HR
        </div>
        <h1 className="text-xl font-semibold text-foreground">
          Хүний нөөцийн програм
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ажилтан, хэлтэс, лавлах мэдээллийн бүртгэл
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Нэвтрэх
        </Link>
      </section>
    </main>
  );
}
