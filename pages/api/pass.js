import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const client = await prisma.admin.findMany();
  res.status(200).json(client);
}