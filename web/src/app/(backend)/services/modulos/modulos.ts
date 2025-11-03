import prisma from "../db";
import { CreateModuloInput, UpdateModuloInput, ReorderModulosInput } from "../../schemas/modulos.schema";


export async function getAllModulos() {
    return await prisma.modulo.findMany({
        include: { aulas: { orderBy: { ordem: "asc" } } },
        orderBy: { ordem: "asc" },
    });
}

export async function getModuloById(id: string) {
    return await prisma.modulo.findUnique({
        where: { id },
        include: { aulas: { orderBy: { ordem: "asc" } } },
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

export async function reorderModulos(data: ReorderModulosInput) {
    // Atualiza a ordem de múltiplos módulos em uma transação
    const updates = data.modulos.map(({ id, ordem }) =>
        prisma.modulo.update({
            where: { id },
            data: { ordem },
        })
    );

    return await prisma.$transaction(updates);
}

export async function getNextOrdem() {
    const lastModulo = await prisma.modulo.findFirst({
        orderBy: { ordem: "desc" },
        select: { ordem: true },
    });
    
    return lastModulo ? lastModulo.ordem + 1 : 1;
}
