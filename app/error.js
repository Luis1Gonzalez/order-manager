"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60dvh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold">Algo salió mal</h1>
      <p className="mt-2 max-w-sm text-ink-500">
        No pudimos cargar esta página. Si el problema continúa, avísanos.
      </p>
      <Button className="mt-6" onClick={reset}>
        Reintentar
      </Button>
    </main>
  );
}
