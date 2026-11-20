"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createAdminSession, createClientSession, deleteSession } from "@/lib/session";
import { ADMIN_COOKIE, CLIENT_COOKIE } from "@/lib/jwt";
import { adminLoginSchema, clientLoginSchema } from "@/lib/validations";
import { fieldErrors } from "@/lib/utils";

// Hash ficticio para que comprobar un usuario inexistente tarde lo mismo que uno real.
const DUMMY_HASH = "$2b$12$opnrJ2U90UgyCmdvB4Dmx.otmWIL6bvYWC/wplq0rUAHhZvmxm1EK";

export async function clientLogin(_prev, formData) {
  const parsed = clientLoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error), values: Object.fromEntries(formData) };

  const { phone, contactName } = parsed.data;
  const client = await prisma.client.findUnique({ where: { phone } });

  if (!client || !client.active) {
    return {
      message: "Ese teléfono no está registrado. Contáctanos para darte de alta.",
      values: Object.fromEntries(formData),
    };
  }

  await createClientSession(client, contactName);
  redirect("/pedido");
}

export async function clientLogout() {
  await deleteSession(CLIENT_COOKIE);
  redirect("/");
}

export async function adminLogin(_prev, formData) {
  const parsed = adminLoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { username, password } = parsed.data;
  const admin = await prisma.admin.findUnique({ where: { username } });
  const valid = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);

  if (!admin || !valid) {
    // Pequeña pausa para frenar intentos por fuerza bruta.
    await new Promise((r) => setTimeout(r, 600));
    return { message: "Usuario o contraseña incorrectos", values: { username } };
  }

  await createAdminSession(admin);
  redirect("/admin");
}

export async function adminLogout() {
  await deleteSession(ADMIN_COOKIE);
  redirect("/admin/login");
}
