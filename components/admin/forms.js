"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Plus, X } from "lucide-react";
import { createCategory, createClient, createPost, createProduct } from "@/app/actions/admin";
import { Field, FormMessage, Input, SubmitButton, Textarea } from "@/components/ui";

/** useActionState + aviso y limpieza del formulario cuando la acción termina bien. */
function useFormAction(action, onSuccess) {
  const ref = useRef(null);
  const [state, formAction] = useActionState(action, null);
  useEffect(() => {
    if (state?.ok) {
      toast.success(state.message);
      ref.current?.reset();
      onSuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return [state, formAction, ref];
}

export function ClientForm() {
  const [state, action, ref] = useFormAction(createClient);
  const v = state?.ok ? {} : state?.values ?? {};
  return (
    <form ref={ref} action={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
      <Field name="name" error={state?.errors?.name}>
        <Input name="name" placeholder="Nombre del cliente" aria-label="Nombre" defaultValue={v.name} key={`n${v.name}`} required />
      </Field>
      <Field name="phone" error={state?.errors?.phone}>
        <Input name="phone" type="tel" inputMode="tel" placeholder="Teléfono" aria-label="Teléfono" defaultValue={v.phone} key={`p${v.phone}`} required />
      </Field>
      <SubmitButton pendingText="Guardando…">
        <Plus className="size-4" aria-hidden /> Añadir cliente
      </SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}

export function CategoryForm() {
  const [state, action, ref] = useFormAction(createCategory);
  return (
    <form ref={ref} action={action} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <Field name="name" error={state?.errors?.name} className="flex-1">
        <Input name="name" placeholder="Nueva categoría (ej. Mariscos)" aria-label="Nombre de la categoría" required />
      </Field>
      <SubmitButton variant="secondary" pendingText="Creando…">
        <Plus className="size-4" aria-hidden /> Crear categoría
      </SubmitButton>
    </form>
  );
}

export function ProductForm({ categoryId }) {
  const [state, action, ref] = useFormAction(createProduct);
  return (
    <form ref={ref} action={action} className="flex items-start gap-2">
      <input type="hidden" name="categoryId" value={categoryId} />
      <Field name="name" error={state?.errors?.name} className="flex-1">
        <Input name="name" placeholder="Añadir producto…" aria-label="Nombre del producto" className="h-9 text-sm" required />
      </Field>
      <SubmitButton size="sm" variant="secondary" className="h-9" aria-label="Añadir producto">
        <Plus className="size-4" aria-hidden />
      </SubmitButton>
    </form>
  );
}

export function PostForm({ imagesEnabled }) {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const [state, action, ref] = useFormAction(createPost, () => setPreview(null));
  const v = state?.ok ? {} : state?.values ?? {};

  function clearImage() {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <form ref={ref} action={action} className="grid gap-4 md:grid-cols-[200px_1fr]">
      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink-700">Imagen</span>
        <label
          className={`relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-cream-300 bg-cream-50 text-center text-sm text-ink-500 transition hover:border-brand-300 ${imagesEnabled ? "" : "pointer-events-none opacity-50"}`}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Vista previa" className="absolute inset-0 size-full object-cover" />
          ) : (
            <>
              <ImagePlus className="mb-1 size-7" aria-hidden />
              {imagesEnabled ? "Elegir foto" : "Imágenes no configuradas"}
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={!imagesEnabled}
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
          />
        </label>
        {preview && (
          <button type="button" onClick={clearImage} className="mt-1.5 inline-flex cursor-pointer items-center gap-1 text-xs text-ink-500 hover:text-brand-700">
            <X className="size-3" aria-hidden /> Quitar imagen
          </button>
        )}
        {state?.errors?.image && <p className="mt-1.5 text-sm text-brand-700">{state.errors.image}</p>}
      </div>

      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
          <Field label="Título" name="title" error={state?.errors?.title}>
            <Input id="title" name="title" defaultValue={v.title} key={`t${v.title}`} required />
          </Field>
          <Field label="Precio" name="price" error={state?.errors?.price}>
            <Input id="price" name="price" placeholder="ej. 9,90 €/kg" defaultValue={v.price} key={`p${v.price}`} />
          </Field>
        </div>
        <Field label="Descripción" name="description" error={state?.errors?.description}>
          <Textarea id="description" name="description" defaultValue={v.description} key={`d${v.description}`} className="min-h-20" required />
        </Field>
        <Field label="Detalles adicionales" name="details" error={state?.errors?.details}>
          <Input id="details" name="details" placeholder="Opcional: condiciones, fechas…" defaultValue={v.details} key={`x${v.details}`} />
        </Field>
        <FormMessage state={state} />
        <div className="flex justify-end">
          <SubmitButton pendingText="Publicando…">Publicar</SubmitButton>
        </div>
      </div>
    </form>
  );
}
