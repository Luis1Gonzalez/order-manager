import { Eye, EyeOff, Tags, Trash2, X } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { cn } from "@/lib/utils";
import { deleteCategory, deleteProduct, toggleProductActive } from "@/app/actions/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { ActionButton } from "@/components/admin/ActionButton";
import { CategoryForm, ProductForm } from "@/components/admin/forms";
import { Card, EmptyState } from "@/components/ui";

export const metadata = { title: "Catálogo" };

export default async function CatalogoPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { products: { orderBy: { name: "asc" } } },
  });

  return (
    <>
      <PageHeader
        title="Catálogo"
        description="Lo que los clientes pueden pedir. Oculta un producto cuando no haya existencias."
      />

      <div className="mb-6 max-w-xl">
        <CategoryForm />
      </div>

      {categories.length === 0 ? (
        <EmptyState icon={Tags} title="Crea tu primera categoría para empezar" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.id} className="flex flex-col">
              <div className="flex items-center justify-between border-b border-cream-200 px-5 py-3">
                <h2 className="text-lg font-semibold">
                  {cat.name} <span className="text-sm font-normal text-ink-500">({cat.products.length})</span>
                </h2>
                <ActionButton
                  variant="ghost"
                  size="icon"
                  aria-label={`Eliminar categoría ${cat.name}`}
                  action={deleteCategory.bind(null, cat.id)}
                  confirm={`¿Eliminar la categoría "${cat.name}" y sus ${cat.products.length} productos? Los pedidos antiguos se conservan.`}
                >
                  <Trash2 className="size-4" />
                </ActionButton>
              </div>

              <ul className="flex-1 divide-y divide-cream-100">
                {cat.products.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2 px-5 py-1.5">
                    <span className={cn("text-sm", !p.active && "text-ink-500 line-through")}>{p.name}</span>
                    <span className="flex">
                      <ActionButton
                        variant="ghost"
                        size="icon"
                        aria-label={p.active ? `Ocultar ${p.name}` : `Mostrar ${p.name}`}
                        title={p.active ? "Ocultar (sin existencias)" : "Volver a mostrar"}
                        action={toggleProductActive.bind(null, p.id)}
                      >
                        {p.active ? <Eye className="size-4" /> : <EyeOff className="size-4 text-ink-500" />}
                      </ActionButton>
                      <ActionButton
                        variant="ghost"
                        size="icon"
                        aria-label={`Eliminar ${p.name}`}
                        action={deleteProduct.bind(null, p.id)}
                        confirm={`¿Eliminar "${p.name}"?`}
                      >
                        <X className="size-4" />
                      </ActionButton>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-cream-200 p-3">
                <ProductForm categoryId={cat.id} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
