import Link from "next/link";
import { ChevronRight, ClipboardList, MessageSquareText } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { cn, startOfTodayLocal, timeAgo } from "@/lib/utils";
import { purgeClosedOrders, setOrderStatus } from "@/app/actions/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { AutoRefresh } from "@/components/admin/AutoRefresh";
import { ActionButton } from "@/components/admin/ActionButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui";

export const metadata = { title: "Pedidos" };

const TABS = {
  activos: { label: "Activos", where: { status: { in: ["PENDIENTE", "LISTO"] } }, order: "asc" },
  entregados: { label: "Entregados", where: { status: "ENTREGADO" }, order: "desc" },
  cancelados: { label: "Cancelados", where: { status: "CANCELADO" }, order: "desc" },
  todos: { label: "Todos", where: {}, order: "desc" },
};

export default async function PedidosPage({ searchParams }) {
  await requireAdmin();
  const { estado } = await searchParams;
  const tabKey = TABS[estado] ? estado : "activos";
  const tab = TABS[tabKey];

  const startOfDay = startOfTodayLocal();

  const [orders, counts, today] = await Promise.all([
    prisma.order.findMany({
      where: tab.where,
      orderBy: { createdAt: tab.order },
      take: 100,
      include: {
        client: { select: { name: true, phone: true } },
        items: { select: { prepared: true } },
      },
    }),
    prisma.order.groupBy({ by: ["status"], _count: true }),
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
  ]);
  const count = (s) => counts.find((c) => c.status === s)?._count ?? 0;

  const stats = [
    { label: "Pendientes", value: count("PENDIENTE"), className: "text-amber-700" },
    { label: "Listos para retirar", value: count("LISTO"), className: "text-sky-700" },
    { label: "Recibidos hoy", value: today, className: "text-ink-900" },
  ];

  return (
    <>
      <PageHeader title="Pedidos" description="Los pedidos activos aparecen del más antiguo al más reciente.">
        <AutoRefresh />
      </PageHeader>

      <dl className="mb-8 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-4 ring-1 ring-cream-200 sm:p-5">
            <dt className="text-xs text-ink-500 sm:text-sm">{s.label}</dt>
            <dd className={cn("mt-1 font-display text-3xl font-semibold sm:text-4xl", s.className)}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Filtrar pedidos" className="flex gap-1 rounded-xl bg-cream-100 p-1">
          {Object.entries(TABS).map(([key, t]) => (
            <Link
              key={key}
              href={key === "activos" ? "/admin" : `/admin?estado=${key}`}
              aria-current={key === tabKey ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                key === tabKey ? "bg-white text-brand-800 shadow-sm" : "text-ink-500 hover:text-ink-900",
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        {(tabKey === "entregados" || tabKey === "cancelados") && (
          <ActionButton
            variant="ghost"
            size="sm"
            action={purgeClosedOrders.bind(null, 30)}
            confirm="¿Borrar definitivamente los pedidos cerrados hace más de 30 días?"
          >
            Limpiar pedidos de hace +30 días
          </ActionButton>
        )}
      </div>

      {orders.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No hay pedidos aquí">
          {tabKey === "activos" ? "Cuando un cliente haga un pedido aparecerá en esta lista." : null}
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => {
            const done = o.items.filter((i) => i.prepared).length;
            return (
              <li
                key={o.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-cream-200 sm:flex-row sm:items-center sm:p-5"
              >
                <Link href={`/admin/pedidos/${o.id}`} className="group flex min-w-0 flex-1 items-center gap-4">
                  <span className="font-display text-2xl font-semibold text-ink-500 group-hover:text-brand-700">#{o.id}</span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {o.contactName}
                      {o.contactName !== o.client.name && (
                        <span className="font-normal text-ink-500"> · {o.client.name}</span>
                      )}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-2 text-sm text-ink-500">
                      <span>{timeAgo(o.createdAt)}</span>
                      <span>·</span>
                      <span>
                        {done}/{o.items.length} preparados
                      </span>
                      {o.comment && (
                        <MessageSquareText className="size-4 text-brand-600" aria-label="Tiene comentario" />
                      )}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto size-5 text-ink-500 sm:hidden" aria-hidden />
                </Link>

                <div className="flex items-center gap-2 sm:justify-end">
                  <StatusBadge status={o.status} />
                  {o.status === "PENDIENTE" && (
                    <ActionButton size="sm" variant="secondary" action={setOrderStatus.bind(null, o.id, "LISTO")}>
                      Marcar listo
                    </ActionButton>
                  )}
                  {o.status === "LISTO" && (
                    <ActionButton size="sm" variant="success" action={setOrderStatus.bind(null, o.id, "ENTREGADO")}>
                      Entregado
                    </ActionButton>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
