"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FlaskConical, ShoppingBasket } from "lucide-react";
import { clientLogin } from "@/app/actions/auth";
import { Button, Dialog, Field, FormMessage, Input, SubmitButton } from "@/components/ui";

/** Botón "Haz tu pedido" + diálogo de acceso por teléfono. `demo` llega solo si el modo demo está activo. */
export function OrderCta({ size = "lg", className, label = "Haz tu pedido", demo }) {
  const params = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, action] = useActionState(clientLogin, null);
  const phoneRef = useRef(null);
  const nameRef = useRef(null);

  function fillDemo() {
    phoneRef.current.value = demo.clientPhoneDisplay;
    if (!nameRef.current.value) nameRef.current.value = "Visitante";
  }

  // El middleware redirige a /?login=1 si alguien intenta entrar a /pedido sin sesión.
  useEffect(() => {
    if (params.get("login") === "1") {
      setOpen(true);
      router.replace("/", { scroll: false });
    }
  }, [params, router]);

  return (
    <>
      <Button size={size} className={className} onClick={() => setOpen(true)}>
        <ShoppingBasket className="size-5" aria-hidden />
        {label}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Haz tu pedido"
        description="Entra con el teléfono con el que estás registrado como cliente."
      >
        <form action={action} className="space-y-4">
          {demo && (
            <button
              type="button"
              onClick={fillDemo}
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-left text-sm text-amber-950 ring-1 ring-amber-200 hover:bg-amber-100"
            >
              <FlaskConical className="size-4 shrink-0" aria-hidden />
              <span>
                <strong>Demo:</strong> usar el cliente de prueba ({demo.clientPhoneDisplay})
              </span>
            </button>
          )}
          <Field label="Teléfono registrado" name="phone" error={state?.errors?.phone}>
            <Input
              ref={phoneRef}
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="600 123 456"
              defaultValue={state?.values?.phone}
              aria-invalid={!!state?.errors?.phone}
              required
            />
          </Field>
          <Field
            label="¿Quién hace el pedido?"
            name="contactName"
            error={state?.errors?.contactName}
            hint="Tu nombre, para saber a quién entregar el pedido."
          >
            <Input
              ref={nameRef}
              id="contactName"
              name="contactName"
              autoComplete="name"
              placeholder="Nombre y apellido"
              defaultValue={state?.values?.contactName}
              aria-invalid={!!state?.errors?.contactName}
              required
            />
          </Field>
          <FormMessage state={state} />
          <SubmitButton size="lg" className="w-full" pendingText="Comprobando…">
            Continuar
          </SubmitButton>
        </form>
      </Dialog>
    </>
  );
}
