import { prisma } from "@/generated/prisma";
import { CreateAulaInput, UpdateAulaInput } from "../../schemas/aulas.schema";

export async function getAllAulas() {
    return await prisma.aula.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getAulaById(id: string) {
    return await prisma.aula.findUnique({
        where: { id },
    });
}

export async function createAula(data: CreateAulaInput) {
    return await prisma.aula.create({
        data,
    });
}

export async function updateAula(id: string, data: UpdateAulaInput) {
    return await prisma.aula.update({
        where: { id },
        data,
    });
}

export async function deleteAula(id: string) {
    return await prisma.aula.delete({
        where: { id },
    });
}
