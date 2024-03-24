import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    // Obtener Orders
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);


// Creando Order
if (req.method === "POST") {
    const orderx = await prisma.order.create({
        data: {
            createdOrder: req.body.arrayRow,
            nameRegistered: req.body.userUsingNow,
            nameUsing: req.body.nameUser,
            comment: req.body.comment,
            creationHour: req.body.creationHour,
            creationDay: req.body.creationDay,
            clientPhone: req.body.phoneUser,
            status: req.body.status,
        },
    });

    res.status(200).json(orderx)
}

if (req.method === "PUT") {
    const {
      id,
      status
    } = req.body;

    try {
      const updatedData = await prisma.order.update({
        where: { id },
        data: {
          status,
        },
      });
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar los datos" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }


}