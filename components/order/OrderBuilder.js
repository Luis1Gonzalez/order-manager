"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { createOrder } from "@/app/actions/orders";
import { Button, Card, Textarea } from "@/components/ui";
import { cn, formatQuantity } from "@/lib/utils";

const UNITS = [
  { value: "KG", label: "Kilos", step: 0.25, initial: 1 },
  { value: "G", label: "Gramos", step: 100, initial: 500 },
  { value: "UNIDAD", label: "Unidades", step: 1, initial: 1 },
];
const unitConfig = (u) => UNITS.find((x) => x.value === u);

export function OrderBuilder({ categories }) {
  const [activeCat, setActiveCat] = useState(categories[0]?.id);
  const [selected, setSelected] = useState(null); // producto que se está configurando
  const [unit, setUnit] = useState("KG");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [comment, setComment] = useState("");
  const [pending, startTransition] = useTransition();

  const category = categories.find((c) => c.id === activeCat);
  const productIndex = useMemo(() => {
    const map = new Map();
    for (const c of categories) for (const p of c.products) map.set(p.id, { ...p, categoryName: c.name });
    return map;
  }, [categories]);

  function pickProduct(product) {
    setSelected(product);
    setUnit("KG");
    setQuantity(1);
  }

  function changeUnit(next) {
    setUnit(next);
    setQuantity(unitConfig(next).initial);
  }

  function step(dir) {
    const { step: s } = unitConfig(unit);
    setQuantity((q) => Math.max(s, Math.round((Number(q || 0) + dir * s) * 1000) / 1000));
  }

  function addToCart() {
    const q = Number(quantity);
    if (!q || q <= 0) return toast.error("Indica una cantidad mayor que 0");
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === selected.id && i.unit === unit);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: Math.round((i.quantity + q) * 1000) / 1000 } : i));
      }
      return [...prev, { key: `${selected.id}-${unit}`, productId: selected.id, unit, quantity: q }];
    });
    toast.success(`${selected.name} añadido`, { duration: 1500 });
    setSelected(null);
  }

  function submit() {
    startTransition(async () => {
      const result = await createOrder({
        comment,
        items: cart.map(({ productId, quantity, unit }) => ({ productId, quantity, unit })),
      });
      // Si todo va bien, la acción redirige al ticket; si no, devuelve el error.
      if (result?.message) toast.error(result.message);
      else if (result?.errors) toast.error(Object.values(result.errors)[0]);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* ---------- Catálogo ---------- */}
      <section aria-label="Catálogo">
        <div role="tablist" aria-label="Categorías" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === activeCat}
              onClick={() => {
                setActiveCat(c.id);
                setSelected(null);
              }}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                c.id === activeCat
                  ? "bg-brand-700 text-white ring-brand-700"
                  : "bg-white text-ink-700 ring-cream-300 hover:bg-cream-100",
              )}
            >
              {c.name}
              <span className={cn("ml-1.5 text-xs", c.id === activeCat ? "text-brand-100" : "text-ink-500")}>
                {c.products.length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {category?.products.map((p) => {
            const inCart = cart.some((i) => i.productId === p.id);
            return (
              <button
                key={p.id}
                onClick={() => pickProduct(p)}
                aria-pressed={selected?.id === p.id}
                className={cn(
                  "relative flex min-h-20 cursor-pointer items-center justify-center rounded-2xl bg-white px-3 py-4 text-center font-medium ring-1 transition hover:-translate-y-0.5 hover:shadow-md",
                  selected?.id === p.id ? "ring-2 ring-brand-600" : "ring-cream-200",
                )}
              >
                {p.name}
                {inCart && (
                  <span className="absolute right-2 top-2 size-2.5 rounded-full bg-emerald-500" aria-label="en el pedido" />
                )}
              </button>
            );
          })}
          {category?.products.length === 0 && (
            <p className="col-span-full py-8 text-center text-ink-500">No hay productos disponibles en esta categoría.</p>
          )}
        </div>

        {/* Configurar cantidad */}
        {selected && (
          <Card className="mt-5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold">{selected.name}</h3>
              <span className="text-sm text-ink-500">{category?.name}</span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 text-sm font-medium text-ink-700">Unidad</p>
                <div className="grid grid-cols-3 rounded-xl bg-cream-100 p-1" role="radiogroup" aria-label="Unidad">
                  {UNITS.map((u) => (
                    <button
                      key={u.value}
                      role="radio"
                      aria-checked={unit === u.value}
                      onClick={() => changeUnit(u.value)}
                      className={cn(
                        "cursor-pointer rounded-lg py-2 text-sm font-medium transition",
                        unit === u.value ? "bg-white text-brand-800 shadow-sm" : "text-ink-500 hover:text-ink-900",
                      )}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="qty" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Cantidad
                </label>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => step(-1)} aria-label="Menos">
                    <Minus className="size-4" />
                  </Button>
                  <input
                    id="qty"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step={unitConfig(unit).step}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="h-10 w-full min-w-0 rounded-xl border border-cream-300 bg-white text-center text-lg font-semibold focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                  />
                  <Button variant="secondary" size="icon" onClick={() => step(1)} aria-label="Más">
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Cancelar
              </Button>
              <Button onClick={addToCart}>
                <Plus className="size-4" aria-hidden /> Añadir al pedido
              </Button>
            </div>
          </Card>
        )}
      </section>

      {/* ---------- Carrito ---------- */}
      <aside id="mi-pedido" className="scroll-mt-20 lg:sticky lg:top-20 lg:self-start">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-cream-200 bg-cream-100/60 px-5 py-4">
            <h2 className="text-xl font-semibold">Tu pedido</h2>
            <span className="text-sm text-ink-500">
              {cart.length} {cart.length === 1 ? "producto" : "productos"}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-10 text-center text-ink-500">
              <ShoppingBasket className="mb-2 size-10 text-cream-300" aria-hidden />
              Elige una categoría y toca un producto para añadirlo.
            </div>
          ) : (
            <ul className="divide-y divide-cream-200">
              {cart.map((item) => {
                const p = productIndex.get(item.productId);
                return (
                  <li key={item.key} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p?.name}</p>
                      <p className="text-xs text-ink-500">{p?.categoryName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap font-semibold text-brand-800">
                        {formatQuantity(item.quantity, item.unit)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Quitar ${p?.name}`}
                        onClick={() => setCart((c) => c.filter((x) => x.key !== item.key))}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="space-y-3 border-t border-cream-200 p-5">
            <label htmlFor="comment" className="block text-sm font-medium text-ink-700">
              Comentario <span className="font-normal text-ink-500">(opcional)</span>
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              placeholder="Ej.: la chuleta fina, por favor"
              className="min-h-20"
            />
            <Button size="lg" className="w-full" disabled={cart.length === 0 || pending} onClick={submit}>
              {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
              {pending ? "Enviando pedido…" : "Confirmar pedido"}
            </Button>
          </div>
        </Card>
      </aside>

      {/* Barra inferior en móvil para saltar al carrito */}
      {cart.length > 0 && (
        <a
          href="#mi-pedido"
          className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-2xl bg-ink-900 px-5 py-3.5 text-white shadow-2xl lg:hidden"
        >
          <span className="flex items-center gap-2">
            <ShoppingBasket className="size-5" aria-hidden /> Ver mi pedido
          </span>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-sm">{cart.length}</span>
        </a>
      )}
    </div>
  );
}
