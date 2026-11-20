"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui";

/**
 * Ejecuta una Server Action (ya enlazada con .bind) al pulsar.
 * Si la acción devuelve { message } o { error } se muestra como aviso.
 */
export function ActionButton({ action, confirm, children, successMessage, ...props }) {
  const [pending, startTransition] = useTransition();

  function run() {
    if (confirm && !window.confirm(confirm)) return;
    startTransition(async () => {
      try {
        const result = await action();
        if (result?.error) toast.error(result.error);
        else if (result?.message) toast.success(result.message);
        else if (successMessage) toast.success(successMessage);
      } catch (e) {
        // redirect() de Next lanza una excepción especial que no debemos tratar como error
        if (e?.digest?.startsWith?.("NEXT_REDIRECT")) throw e;
        toast.error("Algo salió mal. Inténtalo de nuevo.");
      }
    });
  }

  return (
    <Button onClick={run} disabled={pending} aria-busy={pending} {...props}>
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </Button>
  );
}
