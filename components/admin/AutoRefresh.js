"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

/** Refresca los datos del servidor cada `seconds` (solo si la pestaña está visible). */
export function AutoRefresh({ seconds = 30 }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [last, setLast] = useState(() => new Date());

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      startTransition(() => router.refresh());
      setLast(new Date());
    };
    const id = setInterval(refresh, seconds * 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [router, seconds]);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        startTransition(() => router.refresh());
        setLast(new Date());
      }}
      title={`Se actualiza solo cada ${seconds} s`}
    >
      <RefreshCw className={cn("size-4", pending && "animate-spin")} aria-hidden />
      <span suppressHydrationWarning>
        Actualizado {last.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
      </span>
    </Button>
  );
}
