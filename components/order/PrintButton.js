"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui";

export function PrintButton({ label = "Imprimir / guardar PDF", ...props }) {
  return (
    <Button onClick={() => window.print()} {...props}>
      <Printer className="size-4" aria-hidden /> {label}
    </Button>
  );
}
