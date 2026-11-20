import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { adminLogout } from "@/app/actions/auth";
import { requireAdmin } from "@/lib/session";
import { AdminNav } from "@/components/admin/AdminNav";
import { Button } from "@/components/ui";

export const metadata = { title: { default: "Panel", template: "%s · Panel" } };

export default async function AdminPanelLayout({ children }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="sticky top-0 z-30 flex flex-col border-b border-cream-200 bg-white lg:h-dvh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-5 lg:py-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src="/img/logo.png" alt="" width={36} height={36} />
            <span className="font-display text-lg font-semibold text-brand-800">Panel</span>
          </Link>
          <form action={adminLogout} className="lg:hidden">
            <Button variant="ghost" size="sm" type="submit" aria-label="Cerrar sesión">
              <LogOut className="size-4" />
            </Button>
          </form>
        </div>

        <AdminNav />

        <div className="mt-auto hidden space-y-1 border-t border-cream-200 p-3 lg:block">
          <Link href="/" target="_blank" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-500 hover:bg-cream-100">
            <ExternalLink className="size-4" aria-hidden /> Ver la web
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-500 hover:bg-cream-100"
            >
              <LogOut className="size-4" aria-hidden /> Salir ({String(session.username)})
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
