import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Obteniendo los clientes
  const client = await prisma.ourClient.findMany();
  res.status(200).json(client);

  // Creando nuevos clientes
  // if (req.method === "POST") {
  //   const currentClient = await prisma.ourClient.create({
  //     data: {
  //       name: req.body.addNewClientName,
  //       phone: req.body.addNewClientPhone,
  //     },
  //   });
  //   res.status(200).json(currentClient);
  // }

  if (req.method === "POST") {
    const currentClient = await prisma.ourClient.create({
        data: {
            name: req.body.addNewClientName,
            phone: req.body.addNewClientPhone
        },
    });

    res.status(200).json(currentClient)
}


}
