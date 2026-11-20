"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { categorySchema, clientSchema, postSchema, productSchema } from "@/lib/validations";
import { fieldErrors } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/lib/storage";
import { DEMO_CLIENT_PHONE, demoEnabled, resetDemo } from "@/lib/demo";

const isUniqueError = (e) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";

// En modo demo, el cliente de prueba no se puede borrar ni desactivar (si no, nadie más podría probar la web).
const DEMO_PROTECTED = "Es el cliente de prueba de la demo: no se puede borrar ni desactivar.";
const isDemoClient = (client) => demoEnabled && client?.phone === DEMO_CLIENT_PHONE;

// ======================= Demo =======================

export async function resetDemoAction() {
  await requireAdmin();
  if (!demoEnabled) return { error: "El modo demo no está activo" };
  await resetDemo();
  revalidatePath("/", "layout");
  return { message: "Datos de la demo restablecidos" };
}

// ======================= Pedidos =======================

const CLOSED = ["ENTREGADO", "CANCELADO"];

export async function setOrderStatus(orderId, status) {
  await requireAdmin();
  if (!["PENDIENTE", "LISTO", "ENTREGADO", "CANCELADO"].includes(status)) return;

  await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status, closedAt: CLOSED.includes(status) ? new Date() : null },
  });
  revalidatePath("/admin", "layout");
}

export async function toggleItemPrepared(itemId) {
  await requireAdmin();
  const item = await prisma.orderItem.findUnique({ where: { id: Number(itemId) } });
  if (!item) return;
  await prisma.orderItem.update({ where: { id: item.id }, data: { prepared: !item.prepared } });
  revalidatePath(`/admin/pedidos/${item.orderId}`);
}

/** Borra pedidos cerrados hace más de `days` días. */
export async function purgeClosedOrders(days = 30) {
  await requireAdmin();
  const limit = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);
  const { count } = await prisma.order.deleteMany({
    where: { status: { in: CLOSED }, closedAt: { lt: limit } },
  });
  revalidatePath("/admin", "layout");
  return { message: count ? `Se eliminaron ${count} pedidos antiguos` : "No había pedidos antiguos que borrar" };
}

// ======================= Clientes =======================

export async function createClient(_prev, formData) {
  await requireAdmin();
  const parsed = clientSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values: Object.fromEntries(formData) };

  try {
    await prisma.client.create({ data: parsed.data });
  } catch (e) {
    if (isUniqueError(e)) {
      return { errors: { phone: "Ya existe un cliente con ese teléfono" }, values: Object.fromEntries(formData) };
    }
    throw e;
  }
  revalidatePath("/admin/clientes");
  return { ok: true, message: `Cliente "${parsed.data.name}" registrado` };
}

export async function toggleClientActive(id) {
  await requireAdmin();
  const client = await prisma.client.findUnique({ where: { id: Number(id) } });
  if (!client) return;
  if (isDemoClient(client)) return { error: DEMO_PROTECTED };
  await prisma.client.update({ where: { id: client.id }, data: { active: !client.active } });
  revalidatePath("/admin/clientes");
}

export async function deleteClient(id) {
  await requireAdmin();
  const client = await prisma.client.findUnique({ where: { id: Number(id) } });
  if (!client) return;
  if (isDemoClient(client)) return { error: DEMO_PROTECTED };
  const orders = await prisma.order.count({ where: { clientId: Number(id) } });
  if (orders > 0) {
    return { error: "Tiene pedidos registrados: desactívalo en lugar de borrarlo." };
  }
  await prisma.client.delete({ where: { id: Number(id) } });
  revalidatePath("/admin/clientes");
  return { message: "Cliente eliminado" };
}

// ======================= Catálogo =======================

export async function createCategory(_prev, formData) {
  await requireAdmin();
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const last = await prisma.category.aggregate({ _max: { sortOrder: true } });
  try {
    await prisma.category.create({
      data: { name: parsed.data.name, sortOrder: (last._max.sortOrder ?? -1) + 1 },
    });
  } catch (e) {
    if (isUniqueError(e)) return { errors: { name: "Esa categoría ya existe" } };
    throw e;
  }
  revalidatePath("/admin/catalogo");
  revalidatePath("/pedido");
  return { ok: true, message: "Categoría creada" };
}

export async function deleteCategory(id) {
  await requireAdmin();
  await prisma.category.delete({ where: { id: Number(id) } });
  revalidatePath("/admin/catalogo");
  revalidatePath("/pedido");
}

export async function createProduct(_prev, formData) {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  try {
    await prisma.product.create({ data: parsed.data });
  } catch (e) {
    if (isUniqueError(e)) return { errors: { name: "Ese producto ya existe en la categoría" } };
    throw e;
  }
  revalidatePath("/admin/catalogo");
  revalidatePath("/pedido");
  return { ok: true, message: "Producto añadido" };
}

export async function toggleProductActive(id) {
  await requireAdmin();
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) return;
  await prisma.product.update({ where: { id: product.id }, data: { active: !product.active } });
  revalidatePath("/admin/catalogo");
  revalidatePath("/pedido");
}

export async function deleteProduct(id) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: Number(id) } });
  revalidatePath("/admin/catalogo");
  revalidatePath("/pedido");
}

// ======================= Publicaciones =======================

export async function createPost(_prev, formData) {
  await requireAdmin();
  const fields = Object.fromEntries(formData);
  const parsed = postSchema.safeParse(fields);
  if (!parsed.success) {
    return { errors: fieldErrors(parsed.error), values: { ...fields, image: undefined } };
  }

  let image = null;
  const file = formData.get("image");
  if (file && typeof file === "object" && file.size > 0) {
    try {
      image = await uploadImage(file);
    } catch (e) {
      return { errors: { image: e.message }, values: { ...fields, image: undefined } };
    }
  }

  await prisma.post.create({
    data: { ...parsed.data, imageUrl: image?.url ?? null, imageId: image?.id ?? null },
  });
  revalidatePath("/");
  revalidatePath("/admin/publicaciones");
  return { ok: true, message: "Publicación creada" };
}

export async function togglePostPublished(id) {
  await requireAdmin();
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) return;
  await prisma.post.update({ where: { id: post.id }, data: { published: !post.published } });
  revalidatePath("/");
  revalidatePath("/admin/publicaciones");
}

export async function deletePost(id) {
  await requireAdmin();
  const post = await prisma.post.delete({ where: { id: Number(id) } });
  await deleteImage(post.imageId);
  revalidatePath("/");
  revalidatePath("/admin/publicaciones");
}
