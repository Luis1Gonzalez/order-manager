// Firma y verificación de sesiones. Sin dependencias de Node para poder usarse también en el middleware (Edge).
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "om_admin";
export const CLIENT_COOKIE = "om_client";

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET no está definido o es demasiado corto (mínimo 32 caracteres)");
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload, maxAgeSeconds) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds}s`)
    .sign(getKey());
}

export async function decrypt(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}
