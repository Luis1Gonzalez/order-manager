"use client";

import { useOptimistic, useTransition } from "react";
import { Check } from "lucide-react";
import { toggleItemPrepared } from "@/app/actions/admin";
import { cn } from "@/lib/utils";

/** Fila de producto que se marca/desmarca como preparada (con respuesta inmediata). */
export function PreparedToggle({ itemId, prepared, disabled, children }) {
  const [optimistic, setOptimistic] = useOptimistic(prepared);
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={optimistic}
      disabled={disabled}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!optimistic);
          await toggleItemPrepared(itemId);
        })
      }
      className={cn(
        "flex w-full cursor-pointer items-center gap-4 px-5 py-3.5 text-left transition hover:bg-cream-50 disabled:cursor-default disabled:hover:bg-transparent",
        optimistic && "bg-emerald-50/50",
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-lg ring-2 transition",
          optimistic ? "bg-emerald-600 text-white ring-emerald-600" : "ring-cream-300",
        )}
        aria-hidden
      >
        {optimistic && <Check className="size-4" strokeWidth={3} />}
      </span>
      <span className={cn("flex flex-1 items-center gap-4", optimistic && "text-ink-500 line-through decoration-ink-500/40")}>
        {children}
      </span>
    </button>
  );
}
