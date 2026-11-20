import "server-only";
import { prisma } from "./db";
import { clearImages } from "./storage";
import { DEMO_ADMIN, DEMO_CLIENT_PHONE, resetDemoData } from "@/prisma/demo-data.mjs";

/** Modo demo: se activa con DEMO_MODE="true" (pensado para el despliegue de portafolio). */
export const demoEnabled = process.env.DEMO_MODE === "true";

/** Datos que se muestran públicamente en la web cuando el modo demo está activo. */
export const demoInfo = demoEnabled
  ? {
      clientPhone: DEMO_CLIENT_PHONE,
      clientPhoneDisplay: DEMO_CLIENT_PHONE.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"),
      adminUser: DEMO_ADMIN.username,
      adminPassword: DEMO_ADMIN.password,
    }
  : null;

export { DEMO_CLIENT_PHONE };

export async function resetDemo() {
  await resetDemoData(prisma);
  await clearImages(); // las fotos que subieron los visitantes
}
