import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Catálogo inicial (el que antes estaba fijo en el código). Se puede editar desde el panel.
const catalog = {
  Cerdo: ["Chuleta", "Manitas", "Morros"],
  Pollo: ["Pechuga", "Alitas", "Muslos"],
  Ternera: ["Bistec", "Chuletón", "Entraña"],
  Cordero: ["Medallones", "Paletilla", "Costillas"],
  Embutidos: ["Chorizos", "Longanizas", "Morcillas", "Madeja"],
};

async function main() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
    throw new Error("Define ADMIN_USERNAME y ADMIN_PASSWORD (mínimo 8 caracteres) en .env");
  }

  await prisma.admin.upsert({
    where: { username: ADMIN_USERNAME },
    update: { passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12) },
    create: { username: ADMIN_USERNAME, passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12) },
  });

  let order = 0;
  for (const [name, products] of Object.entries(catalog)) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, sortOrder: order++ },
    });
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
