import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/ui";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <Image src="/img/logo.png" alt="" width={96} height={96} className="opacity-80" />
      <p className="mt-6 font-display text-7xl font-semibold text-brand-700">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Este corte no lo tenemos</h1>
      <p className="mt-2 max-w-sm text-ink-500">La página que buscas no existe o ya no está disponible.</p>
      <Link href="/" className={buttonClass({ className: "mt-8" })}>
        Volver al inicio
      </Link>
    </main>
  );
}
