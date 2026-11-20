import { catalog } from "./catalog.mjs";

// Datos públicos del modo demo (se muestran en la web para que cualquiera pueda probarla).
export const DEMO_CLIENT_PHONE = "600000000";
export const DEMO_ADMIN = { username: "demo", password: "demo1234" };

const clients = [
  { name: "Cliente de prueba", phone: DEMO_CLIENT_PHONE },
  { name: "Restaurante La Brasa", phone: "611111111" },
  { name: "Bar El Rincón", phone: "622222222" },
];

const posts = [
  {
    title: "Costilla de cerdo en oferta",
    description: "Costilla fresca, ideal para la barbacoa del fin de semana.",
    price: "6,90 €/kg",
    details: "Válido hasta el domingo",
  },
  {
    title: "Chuletón de vaca madurado",
    description: "30 días de maduración en cámara. Unidades limitadas cada semana.",
    price: "29,50 €/kg",
  },
  {
    title: "Pack barbacoa familiar",
    description: "Chorizo, morcilla, panceta y chuletillas de cordero para 4 personas.",
    price: "24,00 €",
    details: "Encárgalo con un día de antelación",
  },
];

// Pedidos de ejemplo: [cliente, quien recoge, minutos atrás, estado, comentario, productos]
const orders = [
  [1, "Carlos", 12, "PENDIENTE", "Las chuletillas finas, por favor", [["Chuletillas", 1.5, "KG", false], ["Chorizo", 6, "UNIDAD", false]]],
  [0, "Ana", 35, "PENDIENTE", null, [["Pechuga", 1, "KG", true], ["Carne picada", 500, "G", false], ["Morcilla", 4, "UNIDAD", false]]],
  [2, "Javier", 80, "LISTO", null, [["Secreto ibérico", 2, "KG", true], ["Panceta", 1, "KG", true]]],
  [1, "Carlos", 60 * 26, "ENTREGADO", "Para el menú del día", [["Filete", 3, "KG", true], ["Pollo entero", 2, "UNIDAD", true]]],
];

/**
 * Borra los datos de negocio y vuelve a crear el contenido de demostración.
 * Conserva las cuentas de administrador. Recibe el PrismaClient para poder usarse desde el seed y desde la app.
 */
export async function resetDemoData(prisma) {
  // Vacía las tablas y reinicia los contadores (los pedidos vuelven a empezar en #1). Las cuentas de admin no se tocan.
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "OrderItem", "Order", "Client", "Product", "Category", "Post" RESTART IDENTITY CASCADE',
  );

  const products = {};
  let sortOrder = 0;
  for (const [name, items] of Object.entries(catalog)) {
    const category = await prisma.category.create({
      data: { name, sortOrder: sortOrder++, products: { create: items.map((n) => ({ name: n })) } },
      include: { products: true },
    });
    for (const p of category.products) products[p.name] = { ...p, categoryName: name };
  }

  const createdClients = [];
  for (const c of clients) createdClients.push(await prisma.client.create({ data: c }));

  for (const p of posts) await prisma.post.create({ data: p });

  for (const [clientIdx, contactName, minutesAgo, status, comment, items] of orders) {
    const createdAt = new Date(Date.now() - minutesAgo * 60 * 1000);
    await prisma.order.create({
      data: {
        clientId: createdClients[clientIdx].id,
        contactName,
        comment,
        status,
        createdAt,
        closedAt: status === "ENTREGADO" ? new Date(createdAt.getTime() + 3 * 60 * 60 * 1000) : null,
        items: {
          create: items.map(([name, quantity, unit, prepared]) => ({
            productId: products[name].id,
            productName: name,
            categoryName: products[name].categoryName,
            quantity,
            unit,
            prepared,
          })),
        },
      },
    });
  }
}
