import prisma from "../db";
import { CreateAulaInput, UpdateAulaInput, ReorderAulasInput } from "../../schemas/aulas.schema";

export async function getAllAulas() {
    return await prisma.aula.findMany({
        include: { modulo: true },
        orderBy: [
            { modulo: { ordem: "asc" } },
            { ordem: "asc" }
        ],
    });
}

export async function getAulaById(id: string) {
    return await prisma.aula.findUnique({
        where: { id },
        include: { modulo: true },
    });
}

export async function getAulasByModuloId(moduloId: string) {
    return await prisma.aula.findMany({
        where: { moduloId },
        orderBy: { ordem: "asc" },
    });
}

export async function createAula(data: CreateAulaInput) {
    return await prisma.aula.create({
        data,
        include: { modulo: true },
    });
}

export async function updateAula(id: string, data: UpdateAulaInput) {
    return await prisma.aula.update({
        where: { id },
        data,
        include: { modulo: true },
    });
}

export async function deleteAula(id: string) {
    return await prisma.aula.delete({
        where: { id },
    });
}

export async function reorderAulas(data: ReorderAulasInput) {
    // Atualiza a ordem de múltiplas aulas em uma transação
    const updates = data.aulas.map(({ id, ordem }) =>
        prisma.aula.update({
            where: { id },
            data: { ordem },
        })
    );

    return await prisma.$transaction(updates);
}

export async function getNextOrdemInModulo(moduloId: string) {
    const lastAula = await prisma.aula.findFirst({
        where: { moduloId },
        orderBy: { ordem: "desc" },
        select: { ordem: true },
    });
    
    return lastAula ? lastAula.ordem + 1 : 1;
}

// Função para calcular se uma aula está disponível para um usuário
export async function isAulaAvailable(aulaId: string, userCreatedAt: Date): Promise<boolean> {
    const aula = await prisma.aula.findUnique({
        where: { id: aulaId },
        include: {
            modulo: {
                include: {
                    aulas: {
                        orderBy: { ordem: "asc" },
                    },
                },
            },
        },
    });

    if (!aula) return false;

    const now = new Date();
    const daysSinceRegistration = Math.floor(
        (now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return daysSinceRegistration >= aula.diaDisponivel;
}

// Função para obter todas as aulas disponíveis para um usuário
export async function getAvailableAulasForUser(userCreatedAt: Date) {
    const now = new Date();
    const daysSinceRegistration = Math.floor(
        (now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    return await prisma.aula.findMany({
        where: {
            diaDisponivel: {
                lte: daysSinceRegistration,
            },
        },
        include: { modulo: true },
        orderBy: [
            { modulo: { ordem: "asc" } },
            { ordem: "asc" }
        ],
    });
}
