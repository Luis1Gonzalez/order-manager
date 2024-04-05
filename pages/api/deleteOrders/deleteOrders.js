import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    if (req.method !== 'DELETE') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const twentyFourHoursAgo = Date.now() - (2*60*1000);
      await prisma.order.deleteMany({
        where: {
          closedTime: {
            lt: twentyFourHoursAgo
          }
        }
      });

      return res.status(200).json();
    } catch (error) {
      console.error('Error al eliminar registros:', error);
      return res.status(500).json({ message: 'Error al eliminar registros' });
    }
  }












// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
//     const prisma = new PrismaClient()

//     const { id } = req.query

//     try {
//     await prisma.order.delete({
//         where: {
//             id: parseInt(id)
//         }
//     })
// } catch (error) {
//     console.log(`Error  en api al eliminar registro con id ${id}: ${error.message}`)
//     return res.status(500).json(error)
// }
// }
