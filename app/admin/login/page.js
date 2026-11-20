import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { site } from "@/lib/site";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = { title: "Acceso administración" };

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[radial-gradient(50rem_30rem_at_50%_-10%,var(--color-brand-100),transparent)] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/img/logo.png" alt="" width={72} height={72} />
          <h1 className="mt-4 text-3xl font-semibold">Administración</h1>
          <p className="mt-1 text-sm text-ink-500">{site.name}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cream-200 sm:p-7">
          <AdminLoginForm />
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-ink-500 hover:text-brand-700">
            ← Volver a la web
          </Link>
        </p>
      </div>
    </main>
  );
}
