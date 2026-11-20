import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { site } from "@/lib/site";
import { requireClient } from "@/lib/session";
import { formatDateTime, formatQuantity } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { buttonClass } from "@/components/ui";
import { PrintButton } from "@/components/order/PrintButton";

export const metadata = { title: "Ticket de pedido" };

export default async function TicketPage({ params, searchParams }) {
  const session = await requireClient();
  const { id } = await params;
  const { nuevo } = await searchParams;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) || 0 },
    include: { items: { orderBy: { id: "asc" } }, client: true },
  });

  // Un cliente solo puede ver sus propios pedidos.
  if (!order || order.clientId !== Number(session.sub)) notFound();

  return (
    <div className="mx-auto max-w-lg">
      {nuevo && (
        <div className="no-print mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
          <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">¡Pedido enviado!</p>
            <p className="text-sm">Guarda este ticket. Para cancelarlo o cambiarlo, contáctanos.</p>
          </div>
        </div>
      )}

      <article className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-cream-200">
        <header className="flex items-center gap-4 border-b border-dashed border-cream-300 bg-cream-100/60 p-6">
          <Image src="/img/logo.png" alt="" width={56} height={56} />
          <div className="flex-1">
            <p className="font-display text-lg font-semibold text-brand-800">{site.name}</p>
            <p className="text-xs text-ink-500">{site.address}</p>
          </div>
        </header>

        <div className="space-y-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-500">Pedido</p>
              <p className="font-display text-4xl font-semibold">#{order.id}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-ink-500">Fecha</dt>
              <dd className="font-medium">{formatDateTime(order.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Recoge</dt>
              <dd className="font-medium">{order.contactName}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-ink-500">Cliente</dt>
              <dd className="font-medium">{order.client.name}</dd>
            </div>
          </dl>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-left text-ink-500">
                <th className="pb-2 font-medium">Producto</th>
                <th className="pb-2 text-right font-medium">Cantidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2.5">
                    {item.productName}
                    <span className="block text-xs text-ink-500">{item.categoryName}</span>
                  </td>
                  <td className="py-2.5 text-right font-semibold">{formatQuantity(item.quantity, item.unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {order.comment && (
            <div className="rounded-xl bg-cream-100 p-3 text-sm">
              <p className="text-ink-500">Comentario</p>
              <p className="mt-0.5">{order.comment}</p>
            </div>
          )}
        </div>
      </article>

      <div className="no-print mt-6 flex flex-wrap justify-between gap-3">
        <Link href="/pedido" className={buttonClass({ variant: "secondary" })}>
          <ArrowLeft className="size-4" aria-hidden /> Hacer otro pedido
        </Link>
        <PrintButton />
      </div>
    </div>
  );
}
