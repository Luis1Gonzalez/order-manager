import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catalog } from "./catalog.mjs";
import { DEMO_ADMIN, resetDemoData } from "./demo-data.mjs";

const prisma = new PrismaClient();

async function upsertAdmin(username, password) {
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });
}

async function main() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD, DEMO_MODE } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
    throw new Error("Define ADMIN_USERNAME y ADMIN_PASSWORD (mínimo 8 caracteres) en .env");
  }
  await upsertAdmin(ADMIN_USERNAME, ADMIN_PASSWORD);

  if (DEMO_MODE === "true") {
    // Cuenta pública de prueba + datos de ejemplo
    await upsertAdmin(DEMO_ADMIN.username, DEMO_ADMIN.password);
    await resetDemoData(prisma);
    console.log(`✔ Modo demo: admin "${ADMIN_USERNAME}", admin de prueba "${DEMO_ADMIN.username}" y datos de ejemplo listos`);
    return;
  }

  // Modo normal: solo añade el catálogo inicial (no borra nada)
  let order = 0;
  for (const [name, products] of Object.entries(catalog)) {
    const category = await prisma.category.upsert({ where: { name }, update: {}, create: { name, sortOrder: order++ } });
    for (const product of products) {
      await prisma.product.upsert({
        where: { categoryId_name: { categoryId: category.id, name: product } },
        update: {},
        create: { name: product, categoryId: category.id },
      });
    }
  }
  console.log(`✔ Admin "${ADMIN_USERNAME}" y catálogo inicial listos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
