import prisma from "../db";
import { CreateAulaFavoritaInput } from "../../schemas/aulasFavoritas.schema";

export async function getAllFavoritasByUser(userId: string) {
    return await prisma.aulaFavorita.findMany({
        where: { userId },
        include: { aula: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function addAulaFavorita(data: CreateAulaFavoritaInput) {
    const existente = await prisma.aulaFavorita.findUnique({
        where: { userId_aulaId: { userId: data.userId, aulaId: data.aulaId } },
    });

    if (existente) return existente;

    return await prisma.aulaFavorita.create({ data });
}

export async function removeAulaFavorita(userId: string, aulaId: string) {
    return await prisma.aulaFavorita.delete({
        where: { userId_aulaId: { userId, aulaId } },
    });
}

