import { z } from "zod";
import { normalizePhone } from "./utils";

const phone = z
  .string({ required_error: "Introduce un teléfono" })
  .transform(normalizePhone)
  .refine((v) => v.length >= 7 && v.length <= 15, "Introduce un teléfono válido (7 a 15 dígitos)");

const name = (label) =>
  z
    .string({ required_error: `${label}: obligatorio` })
    .trim()
    .min(2, `${label}: mínimo 2 caracteres`)
    .max(80, `${label}: máximo 80 caracteres`);

const optionalText = (max) =>
  z
    .string()
    .trim()
    .max(max, `Máximo ${max} caracteres`)
    .optional()
    .transform((v) => v || null);

export const clientLoginSchema = z.object({
  phone,
  contactName: name("Nombre"),
});

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Introduce el usuario"),
  password: z.string().min(1, "Introduce la contraseña"),
});

export const clientSchema = z.object({ name: name("Nombre"), phone });

export const categorySchema = z.object({ name: name("Categoría") });

export const productSchema = z.object({
  name: name("Producto"),
  categoryId: z.coerce.number().int().positive("Elige una categoría"),
});

export const orderSchema = z.object({
  comment: optionalText(500),
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int().positive(),
        quantity: z.coerce
          .number({ invalid_type_error: "Cantidad no válida" })
          .positive("La cantidad debe ser mayor que 0")
          .max(1000, "Cantidad demasiado grande"),
        unit: z.enum(["KG", "G", "UNIDAD"]),
      }),
    )
    .min(1, "Añade al menos un producto")
    .max(50, "Demasiados productos en un pedido"),
});

export const postSchema = z.object({
  title: z.string().trim().min(2, "Título: mínimo 2 caracteres").max(120, "Título demasiado largo"),
  description: z.string().trim().min(2, "Añade una descripción").max(1000, "Descripción demasiado larga"),
  details: optionalText(1000),
  price: optionalText(40),
});
