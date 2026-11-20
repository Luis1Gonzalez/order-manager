import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, CLIENT_COOKIE, decrypt, encrypt } from "./jwt";

async function setCookie(name, payload, maxAge) {
  const token = await encrypt(payload, maxAge);
  const store = await cookies();
  store.set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

// ---------- Admin ----------
export async function createAdminSession(admin) {
  await setCookie(ADMIN_COOKIE, { sub: String(admin.id), username: admin.username, role: "admin" }, 60 * 60 * 8);
}

export async function getAdminSession() {
  const store = await cookies();
  const session = await decrypt(store.get(ADMIN_COOKIE)?.value);
  return session?.role === "admin" ? session : null;
}

/** Llamar al inicio de cada Server Action y página de admin (el middleware no basta por sí solo). */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

// ---------- Cliente ----------
export async function createClientSession(client, contactName) {
  await setCookie(
    CLIENT_COOKIE,
    { sub: String(client.id), name: client.name, contactName, role: "client" },
    60 * 60 * 12,
  );
}

export async function getClientSession() {
  const store = await cookies();
  const session = await decrypt(store.get(CLIENT_COOKIE)?.value);
  return session?.role === "client" ? session : null;
}

export async function requireClient() {
  const session = await getClientSession();
  if (!session) redirect("/?login=1");
  return session;
}

export async function deleteSession(name) {
  const store = await cookies();
  store.delete(name);
}
