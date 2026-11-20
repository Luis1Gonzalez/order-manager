import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Zona horaria y formato regional de la carnicería.
export const TZ = "Europe/Madrid";
export const LOCALE = "es-ES";

export function formatDateTime(date) {
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: TZ,
  }).format(new Date(date));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(LOCALE, { dateStyle: "long", timeZone: TZ }).format(new Date(date));
}

/** Diferencia (ms) entre la hora de TZ y UTC en un instante dado. Tiene en cuenta el horario de verano. */
function tzOffsetMs(date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/** Medianoche de hoy en la zona horaria de la carnicería, como Date (el servidor puede estar en UTC). */
export function startOfTodayLocal() {
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date()); // AAAA-MM-DD
  const midnightAsUtc = new Date(`${ymd}T00:00:00Z`);
  return new Date(midnightAsUtc.getTime() - tzOffsetMs(midnightAsUtc));
}

export function timeAgo(date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  if (diff < 60) return "hace un momento";
  if (diff < 3600) return rtf.format(-Math.round(diff / 60), "minute");
  if (diff < 86400) return rtf.format(-Math.round(diff / 3600), "hour");
  return rtf.format(-Math.round(diff / 86400), "day");
}

export const UNIT_LABELS = { KG: "kg", G: "g", UNIDAD: "ud." };

export function formatQuantity(quantity, unit) {
  const value = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 3 }).format(Number(quantity));
  return `${value} ${UNIT_LABELS[unit] ?? unit}`;
}

export const STATUS = {
  PENDIENTE: { label: "Pendiente", className: "bg-amber-100 text-amber-900 ring-amber-300" },
  LISTO: { label: "Listo para retirar", className: "bg-sky-100 text-sky-900 ring-sky-300" },
  ENTREGADO: { label: "Entregado", className: "bg-emerald-100 text-emerald-900 ring-emerald-300" },
  CANCELADO: { label: "Cancelado", className: "bg-stone-200 text-stone-700 ring-stone-300" },
};

/** Normaliza un teléfono a solo dígitos para compararlo de forma fiable. */
export function normalizePhone(phone) {
  return String(phone ?? "").replace(/\D/g, "");
}

/** Convierte el error de safeParse de Zod en { campo: "mensaje" }. */
export function fieldErrors(zodError) {
  const out = {};
  for (const issue of zodError.issues) {
    const key = issue.path.join(".") || "_form";
    out[key] ??= issue.message;
  }
  return out;
}
