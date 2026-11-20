import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { demoEnabled, resetDemo } from "@/lib/demo";

// Lo llama cada noche la función programada de Netlify (netlify/functions/reset-demo.mjs).
export async function POST(req) {
  const secret = process.env.DEMO_RESET_SECRET;
  if (!demoEnabled || !secret) return new Response("No disponible", { status: 404 });

  const given = Buffer.from(req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "");
  const expected = Buffer.from(secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return new Response("No autorizado", { status: 401 });
  }

  await resetDemo();
  revalidatePath("/", "layout");
  return Response.json({ ok: true, resetAt: new Date().toISOString() });
}
