import { LogOut } from "lucide-react";
import { clientLogout } from "@/app/actions/auth";
import { requireClient } from "@/lib/session";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui";

export default async function PedidoLayout({ children }) {
  const session = await requireClient();

  return (
    <>
      <SiteHeader>
        <div className="hidden text-right text-sm leading-tight sm:block">
          <p className="font-medium">{String(session.contactName)}</p>
          <p className="text-xs text-ink-500">Cliente: {String(session.name)}</p>
        </div>
        <form action={clientLogout}>
          <Button variant="ghost" size="sm" type="submit">
            <LogOut className="size-4" aria-hidden /> Salir
          </Button>
        </form>
      </SiteHeader>
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 lg:pb-12">{children}</main>
    </>
  );
}
