import { prisma } from "@/generated/prisma";
import { CreateModuloInput, UpdateModuloInput } from "../../schemas/modulos.schema";


export async function getAllModulos() {
    return await prisma.modulo.findMany({
        include: { aulas: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getModuloById(id: string) {
    return await prisma.modulo.findUnique({
        where: { id },
        include: { aulas: true },
    });
}

export async function createModulo(data: CreateModuloInput) {
    return await prisma.modulo.create({ data });
}

export async function updateModulo(id: string, data: UpdateModuloInput) {
    return await prisma.modulo.update({
        where: { id },
        data,
    });
}

export async function deleteModulo(id: string) {
    return await prisma.modulo.delete({
        where: { id },
    });
}
