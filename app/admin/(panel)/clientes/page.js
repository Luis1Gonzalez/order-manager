import { Search, Trash2, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { cn, formatDate, normalizePhone } from "@/lib/utils";
import { deleteClient, toggleClientActive } from "@/app/actions/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { ActionButton } from "@/components/admin/ActionButton";
import { ClientForm } from "@/components/admin/forms";
import { Card, EmptyState, Input } from "@/components/ui";

export const metadata = { title: "Clientes" };

export default async function ClientesPage({ searchParams }) {
  await requireAdmin();
  const q = String((await searchParams).q ?? "").trim();
  const digits = normalizePhone(q);

  const clients = await prisma.client.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            ...(digits ? [{ phone: { contains: digits } }] : []),
          ],
        }
      : undefined,
    orderBy: { name: "asc" },
    include: { _count: { select: { orders: true } } },
  });

  return (
    <>
      <PageHeader title="Clientes" description="Solo los clientes registrados y activos pueden hacer pedidos." />

      <Card className="mb-6 p-5">
        <h2 className="mb-3 text-lg font-semibold">Registrar cliente</h2>
        <ClientForm />
      </Card>

      <form className="relative mb-4 max-w-sm" role="search">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-500" aria-hidden />
        <Input name="q" defaultValue={q} placeholder="Buscar por nombre o teléfono" aria-label="Buscar clientes" className="pl-10" />
      </form>

      {clients.length === 0 ? (
        <EmptyState icon={Users} title={q ? "Ningún cliente coincide con la búsqueda" : "Aún no hay clientes registrados"} />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream-100/60 text-left text-ink-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Nombre</th>
                  <th className="px-5 py-3 font-medium">Teléfono</th>
                  <th className="hidden px-5 py-3 font-medium md:table-cell">Alta</th>
                  <th className="px-5 py-3 text-right font-medium">Pedidos</th>
                  <th className="px-5 py-3 text-right font-medium">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {clients.map((c) => (
                  <tr key={c.id} className={cn(!c.active && "text-ink-500")}>
                    <td className="px-5 py-3 font-medium">
                      {c.name}
                      {!c.active && <span className="ml-2 rounded-full bg-stone-200 px-2 py-0.5 text-xs font-normal">Inactivo</span>}
                    </td>
                    <td className="px-5 py-3 tabular-nums">{c.phone}</td>
                    <td className="hidden px-5 py-3 md:table-cell">{formatDate(c.createdAt)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{c._count.orders}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <ActionButton variant="ghost" size="sm" action={toggleClientActive.bind(null, c.id)}>
                          {c.active ? "Desactivar" : "Activar"}
                        </ActionButton>
                        <ActionButton
                          variant="ghost"
                          size="icon"
                          aria-label={`Eliminar a ${c.name}`}
                          action={deleteClient.bind(null, c.id)}
                          confirm={`¿Eliminar a ${c.name}?`}
                        >
                          <Trash2 className="size-4" />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
