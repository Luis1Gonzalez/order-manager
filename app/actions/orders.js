"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireClient } from "@/lib/session";
import { orderSchema } from "@/lib/validations";
import { fieldErrors } from "@/lib/utils";

/**
 * Crea un pedido para el cliente con sesión iniciada.
 * Recibe el carrito ya armado en el navegador; aquí se valida todo de nuevo.
 */
export async function createOrder(payload) {
  const session = await requireClient();

  const parsed = orderSchema.safeParse(payload);
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { items, comment } = parsed.data;
  const clientId = Number(session.sub);

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client?.active) return { message: "Tu cuenta no está activa. Contáctanos." };

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) }, active: true },
    include: { category: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));

  if (items.some((i) => !byId.has(i.productId))) {
    return { message: "Algún producto ya no está disponible. Revisa tu pedido." };
  }

  const order = await prisma.order.create({
    data: {
      clientId,
      contactName: String(session.contactName),
      comment,
      items: {
        create: items.map((i) => {
          const p = byId.get(i.productId);
          return {
            productId: p.id,
            productName: p.name,
            categoryName: p.category.name,
            quantity: i.quantity,
            unit: i.unit,
          };
        }),
      },
    },
  });

  revalidatePath("/admin");
  redirect(`/pedido/${order.id}?nuevo=1`);
}
