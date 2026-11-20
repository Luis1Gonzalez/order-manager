import "server-only";
import { randomUUID } from "crypto";

// Subida de imágenes a Supabase Storage desde el servidor.
// La clave secreta nunca llega al navegador; las imágenes quedan en un bucket público.

const URL_BASE = process.env.SUPABASE_URL?.replace(/\/$/, "");
const KEY = process.env.SUPABASE_SECRET_KEY;
const BUCKET = "publicaciones";

export const storageEnabled = Boolean(URL_BASE && KEY);

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };

function headers(extra = {}) {
  // Las claves nuevas (sb_secret_...) van solo en "apikey"; las antiguas (JWT) también en Authorization.
  return { apikey: KEY, ...(KEY?.startsWith("eyJ") ? { Authorization: `Bearer ${KEY}` } : {}), ...extra };
}

async function ensureBucket() {
  const res = await fetch(`${URL_BASE}/storage/v1/bucket`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      file_size_limit: MAX_BYTES,
      allowed_mime_types: Object.keys(TYPES),
    }),
  });
  // 409/400 "already exists" también vale
  if (!res.ok && res.status !== 409 && res.status !== 400) {
    throw new Error(`No se pudo crear el bucket de imágenes (${res.status})`);
  }
}

async function put(path, file) {
  return fetch(`${URL_BASE}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: headers({ "Content-Type": file.type, "Cache-Control": "31536000" }),
    body: Buffer.from(await file.arrayBuffer()),
  });
}

/** Sube la imagen y devuelve { url, id } (id = ruta dentro del bucket, para poder borrarla). */
export async function uploadImage(file) {
  if (!storageEnabled) throw new Error("El almacenamiento de imágenes no está configurado");
  const ext = TYPES[file.type];
  if (!ext) throw new Error("Formato no permitido (usa JPG, PNG, WEBP o AVIF)");
  if (file.size > MAX_BYTES) throw new Error("La imagen supera los 4 MB");

  const path = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;
  let res = await put(path, file);
  if (res.status === 404 || res.status === 400) {
    // El bucket aún no existe: se crea la primera vez.
    await ensureBucket();
    res = await put(path, file);
  }
  if (!res.ok) throw new Error(`No se pudo subir la imagen (${res.status})`);

  return { url: `${URL_BASE}/storage/v1/object/public/${BUCKET}/${path}`, id: path };
}

export async function deleteImage(path) {
  if (!storageEnabled || !path) return;
  try {
    await fetch(`${URL_BASE}/storage/v1/object/${BUCKET}`, {
      method: "DELETE",
      headers: headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ prefixes: [path] }),
    });
  } catch (e) {
    console.error("No se pudo borrar la imagen", e);
  }
}
