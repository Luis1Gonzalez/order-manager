// Punto de entrada de la librería de UI.
// Este archivo no es "use client": lo que define aquí se puede usar en componentes de servidor.
import { cn } from "@/lib/utils";

export { buttonClass } from "./styles";
export { Button, Dialog, Input, Select, SubmitButton, Textarea } from "./client";

/** Etiqueta + control + mensaje de error. */
export function Field({ label, name, error, hint, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-brand-700">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-ink-500">{hint}</p>
      )}
    </div>
  );
}

export function FormMessage({ state }) {
  if (!state?.message || state.ok) return null;
  return (
    <p role="alert" className="rounded-xl bg-brand-50 px-3.5 py-2.5 text-sm text-brand-800 ring-1 ring-brand-200">
      {state.message}
    </p>
  );
}

export function Card({ className, ...props }) {
  return <div className={cn("rounded-2xl bg-white ring-1 ring-cream-200 shadow-sm", className)} {...props} />;
}

export function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cream-300 px-6 py-14 text-center">
      {Icon && <Icon className="mb-3 size-10 text-cream-300" aria-hidden />}
      <p className="font-display text-lg text-ink-700">{title}</p>
      {children && <div className="mt-1 text-sm text-ink-500">{children}</div>}
    </div>
  );
}
