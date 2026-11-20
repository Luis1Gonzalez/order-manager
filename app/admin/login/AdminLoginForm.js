"use client";

import { useActionState } from "react";
import { adminLogin } from "@/app/actions/auth";
import { Field, FormMessage, Input, SubmitButton } from "@/components/ui";

export function AdminLoginForm() {
  const [state, action] = useActionState(adminLogin, null);

  return (
    <form action={action} className="space-y-4">
      <Field label="Usuario" name="username" error={state?.errors?.username}>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          defaultValue={state?.values?.username}
          aria-invalid={!!state?.errors?.username}
          required
          autoFocus
        />
      </Field>
      <Field label="Contraseña" name="password" error={state?.errors?.password}>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!state?.errors?.password}
          required
        />
      </Field>
      <FormMessage state={state} />
      <SubmitButton size="lg" className="w-full" pendingText="Entrando…">
        Entrar
      </SubmitButton>
    </form>
  );
}
