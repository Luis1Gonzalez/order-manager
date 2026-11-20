"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClass, fieldClass } from "./styles";

export const Button = forwardRef(function Button({ variant, size, className, ...props }, ref) {
  return <button ref={ref} className={buttonClass({ variant, size, className })} {...props} />;
});

/** Botón de envío que muestra un spinner mientras el formulario se procesa. */
export function SubmitButton({ children, pendingText, ...props }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-busy={pending} {...props}>
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {pending && pendingText ? pendingText : children}
    </Button>
  );
}

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(fieldClass, "h-11", className)} {...props} />;
});

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(fieldClass, "min-h-24 py-2.5", className)} {...props} />;
});

export const Select = forwardRef(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={cn(fieldClass, "h-11 pr-8", className)} {...props} />;
});

/** Diálogo modal con <dialog> nativo: accesible (foco, Escape) y sin dependencias. */
export function Dialog({ open, onClose, title, description, children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-0 text-ink-900 shadow-2xl backdrop:bg-ink-900/50 backdrop:backdrop-blur-sm",
        className,
      )}
    >
      {open && (
        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar" className="-mr-2 -mt-1">
              <X className="size-5" />
            </Button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
