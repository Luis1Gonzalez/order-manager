import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireClient } from "@/lib/session";
import { timeAgo } from "@/lib/utils";
import { OrderBuilder } from "@/components/order/OrderBuilder";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata = { title: "Nuevo pedido" };

export default async function NuevoPedidoPage() {
  const session = await requireClient();

  const [categories, recentOrders] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { products: { where: { active: true }, orderBy: { name: "asc" }, select: { id: true, name: true } } },
    }),
    prisma.order.findMany({
      where: { clientId: Number(session.sub) },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { items: true } } },
    }),
  ]);

  const visible = categories.filter((c) => c.products.length > 0);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Nuevo pedido</h1>
        <p className="mt-1 text-ink-500">Elige los productos, indica la cantidad y confirma.</p>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-ink-500 ring-1 ring-cream-200">
          Ahora mismo no hay productos disponibles. Vuelve a intentarlo más tarde.
        </p>
      ) : (
        <OrderBuilder categories={visible} />
      )}

      {recentOrders.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-3 text-xl font-semibold">Tus últimos pedidos</h2>
          <ul className="divide-y divide-cream-200 overflow-hidden rounded-2xl bg-white ring-1 ring-cream-200">
            {recentOrders.map((o) => (
              <li key={o.id}>
                <Link href={`/pedido/${o.id}`} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-cream-50">
                  <div>
                    <p className="font-medium">Pedido #{o.id}</p>
                    <p className="text-sm text-ink-500">
                      {timeAgo(o.createdAt)} · {o._count.items} productos
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={o.status} />
                    <ChevronRight className="size-4 text-ink-500" aria-hidden />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
