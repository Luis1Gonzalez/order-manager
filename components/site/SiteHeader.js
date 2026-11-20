import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader({ children }) {
  return (
    <header className="sticky top-0 z-30 border-b border-cream-200 bg-cream-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/img/logo.png" alt="" width={40} height={40} className="size-10" priority />
          <span className="font-display text-lg font-semibold leading-tight text-brand-800 sm:text-xl">{site.name}</span>
        </Link>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}
