import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { formatDateTime, formatQuantity } from "@/lib/utils";
import { setOrderStatus } from "@/app/actions/admin";
import { ActionButton } from "@/components/admin/ActionButton";
import { PreparedToggle } from "@/components/admin/PreparedToggle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PrintButton } from "@/components/order/PrintButton";
import { Card } from "@/components/ui";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Pedido #${id}` };
}

export default async function PedidoDetallePage({ params }) {
  await requireAdmin();
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) || 0 },
    include: { client: true, items: { orderBy: { id: "asc" } } },
  });
  if (!order) notFound();

  const done = order.items.filter((i) => i.prepared).length;
  const allDone = done === order.items.length;
  const closed = order.status === "ENTREGADO" || order.status === "CANCELADO";

  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="no-print mb-6 inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
        <ArrowLeft className="size-4" aria-hidden /> Volver a pedidos
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold">Pedido #{order.id}</h1>
            <StatusBadge status={order.status} className="text-sm" />
          </div>
          <p className="mt-1 text-ink-500">Recibido el {formatDateTime(order.createdAt)}</p>
        </div>
        <PrintButton label="Imprimir" variant="secondary" className="no-print" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <p className="text-sm text-ink-500">Recoge</p>
          <p className="text-lg font-semibold">{order.contactName}</p>
          <p className="mt-3 text-sm text-ink-500">Cliente registrado</p>
          <p className="font-medium">{order.client.name}</p>
          <a href={`tel:${order.client.phone}`} className="mt-1 inline-flex items-center gap-1.5 text-sm text-brand-700 hover:underline">
            <Phone className="size-3.5" aria-hidden /> {order.client.phone}
          </a>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink-500">Comentario</p>
          <p className={order.comment ? "mt-1" : "mt-1 italic text-ink-500"}>{order.comment || "Sin comentarios"}</p>
          {order.closedAt && (
            <>
              <p className="mt-3 text-sm text-ink-500">Cerrado</p>
              <p className="font-medium">{formatDateTime(order.closedAt)}</p>
            </>
          )}
        </Card>
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
          <h2 className="text-xl font-semibold">Productos</h2>
          <span className="text-sm text-ink-500">
            {done} de {order.items.length} preparados
          </span>
        </div>
        <div className="h-1.5 bg-cream-100" aria-hidden>
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(done / order.items.length) * 100}%` }} />
        </div>
        <ul className="divide-y divide-cream-100">
          {order.items.map((item) => (
            <li key={item.id}>
              <PreparedToggle itemId={item.id} prepared={item.prepared} disabled={closed}>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{item.productName}</span>
                  <span className="block text-xs text-ink-500">{item.categoryName}</span>
                </span>
                <span className="font-display text-xl font-semibold">{formatQuantity(item.quantity, item.unit)}</span>
              </PreparedToggle>
            </li>
          ))}
        </ul>
      </Card>

      <div className="no-print mt-6 flex flex-wrap gap-2">
        {order.status === "PENDIENTE" && (
          <ActionButton action={setOrderStatus.bind(null, order.id, "LISTO")} successMessage="Pedido marcado como listo">
            {allDone ? "Marcar como listo" : "Marcar como listo de todos modos"}
          </ActionButton>
        )}
        {order.status === "LISTO" && (
          <ActionButton variant="success" action={setOrderStatus.bind(null, order.id, "ENTREGADO")} successMessage="Pedido entregado">
            Marcar como entregado
          </ActionButton>
        )}
        {!closed && (
          <ActionButton
            variant="danger"
            action={setOrderStatus.bind(null, order.id, "CANCELADO")}
            confirm={`¿Cancelar el pedido #${order.id}?`}
            successMessage="Pedido cancelado"
          >
            Cancelar pedido
          </ActionButton>
        )}
        {closed && (
          <ActionButton variant="secondary" action={setOrderStatus.bind(null, order.id, "PENDIENTE")} successMessage="Pedido reabierto">
            Reabrir pedido
          </ActionButton>
        )}
      </div>
    </div>
  );
}
