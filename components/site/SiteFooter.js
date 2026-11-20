import Link from "next/link";
import { Lock } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream-200 bg-cream-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-ink-500 sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-4">
          <a href={site.developer.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
            Desarrollado por {site.developer.name}
          </a>
          <Link href="/admin" className="inline-flex items-center gap-1 hover:text-brand-700" aria-label="Acceso administración">
            <Lock className="size-3.5" aria-hidden />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
