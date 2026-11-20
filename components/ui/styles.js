import { cn } from "@/lib/utils";

// Funciones de estilo puras: se pueden usar tanto en el servidor como en el cliente.

const variants = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 shadow-sm shadow-brand-900/20",
  secondary: "bg-white text-ink-900 ring-1 ring-cream-300 hover:bg-cream-100",
  ghost: "text-ink-700 hover:bg-cream-100",
  danger: "bg-white text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50",
  success: "bg-emerald-700 text-white hover:bg-emerald-800",
};

const sizes = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-9 w-9",
};

export function buttonClass({ variant = "primary", size = "md", className } = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variants[variant],
    sizes[size],
    className,
  );
}

export const fieldClass =
  "w-full rounded-xl border border-cream-300 bg-white px-3.5 text-ink-900 placeholder:text-ink-500/70 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 aria-[invalid=true]:border-brand-500";
