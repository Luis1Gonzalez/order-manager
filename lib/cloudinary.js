import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryEnabled = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
);

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Sube una imagen desde el servidor: el API secret nunca llega al navegador. */
export async function uploadImage(file) {
  if (!cloudinaryEnabled) throw new Error("Cloudinary no está configurado");
  if (!ALLOWED.includes(file.type)) throw new Error("Formato no permitido (usa JPG, PNG, WEBP o AVIF)");
  if (file.size > MAX_BYTES) throw new Error("La imagen supera los 4 MB");

  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "order-manager", resource_type: "image" }, (err, result) =>
        err ? reject(err) : resolve({ url: result.secure_url, id: result.public_id }),
      )
      .end(buffer);
  });
}

export async function deleteImage(publicId) {
  if (!cloudinaryEnabled || !publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (e) {
    console.error("No se pudo borrar la imagen de Cloudinary", e);
  }
}
