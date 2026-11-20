import { PrismaClient } from "@prisma/client";

// Reutiliza una sola instancia en desarrollo para no agotar conexiones con el hot-reload.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
