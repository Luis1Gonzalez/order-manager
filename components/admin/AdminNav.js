"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Newspaper, Tags, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Pedidos", icon: ClipboardList, match: (p) => p === "/admin" || p.startsWith("/admin/pedidos") },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/catalogo", label: "Catálogo", icon: Tags },
  { href: "/admin/publicaciones", label: "Publicaciones", icon: Newspaper },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Panel" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
      {links.map(({ href, label, icon: Icon, match }) => {
        const active = match ? match(pathname) : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition",
              active ? "bg-brand-50 text-brand-800" : "text-ink-700 hover:bg-cream-100",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
