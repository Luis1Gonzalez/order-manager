import Link from "next/link";
import { FlaskConical } from "lucide-react";

/** Aviso del modo demo con los accesos de prueba. */
export function DemoBanner({ demo }) {
  if (!demo) return null;
  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:gap-4 sm:px-6">
        <p className="flex items-center gap-2 font-semibold">
          <FlaskConical className="size-4 shrink-0" aria-hidden /> Web de demostración
        </p>
        <p className="text-amber-900">
          Pide como cliente con el teléfono <strong className="tabular-nums">{demo.clientPhoneDisplay}</strong> o entra al{" "}
          <Link href="/admin/login" className="font-semibold underline underline-offset-2 hover:text-amber-700">
            panel
          </Link>{" "}
          con <strong>{demo.adminUser}</strong> / <strong>{demo.adminPassword}</strong>. Los datos se restablecen cada noche.
        </p>
      </div>
    </div>
  );
}
