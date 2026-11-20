"use client";

import { useActionState, useRef } from "react";
import { FlaskConical } from "lucide-react";
import { adminLogin } from "@/app/actions/auth";
import { Field, FormMessage, Input, SubmitButton } from "@/components/ui";

export function AdminLoginForm({ demo }) {
  const [state, action] = useActionState(adminLogin, null);
  const userRef = useRef(null);
  const passRef = useRef(null);

  return (
    <form action={action} className="space-y-4">
      {demo && (
        <button
          type="button"
          onClick={() => {
            userRef.current.value = demo.adminUser;
            passRef.current.value = demo.adminPassword;
          }}
          className="flex w-full cursor-pointer items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-left text-sm text-amber-950 ring-1 ring-amber-200 hover:bg-amber-100"
        >
          <FlaskConical className="size-4 shrink-0" aria-hidden />
          <span>
            <strong>Demo:</strong> rellenar con {demo.adminUser} / {demo.adminPassword}
          </span>
        </button>
      )}
      <Field label="Usuario" name="username" error={state?.errors?.username}>
        <Input
          ref={userRef}
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
          ref={passRef}
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
