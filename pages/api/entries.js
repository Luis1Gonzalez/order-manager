import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    // Obtener Entries
    const article = await prisma.entry.findMany();
    res.status(200).json(article);


// Creando Series

if (req.method === "POST") {
    const entryx = await prisma.entry.create({
        data: {
            tittle: req.body.addNewEntryTitle,
            description: req.body.addNewEntryDescription,
            price: req.body.addNewEntryPrice,
            photoUrl: req.body.photoUrl
        },
    });

    res.status(200).json(entryx)
}

}
