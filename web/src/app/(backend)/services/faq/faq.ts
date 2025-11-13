import prisma from "../db";
import { UpdateFaqInput, CreateFaqInput, ReorderFaqsInput } from "../../schemas/faq.schema";

export async function getAllFaqs() {
    return prisma.faq.findMany({
        orderBy: { ordem: "asc" },
    });
}

export async function getFaqById(id: string) {
    return prisma.faq.findUnique({
        where: { id },
    });
}

export async function createFaq(data: CreateFaqInput) {
    return prisma.faq.create({ data });
}

export async function updateFaq(id: string, data: UpdateFaqInput) {
    return prisma.faq.update({
        where: { id },
        data,
    });
}

export async function deleteFaq(id: string) {
    return prisma.faq.delete({
        where: { id },
    });
}

export async function reorderFaqs(data: ReorderFaqsInput) {
    // Atualiza a ordem de múltiplas FAQs em uma transação
    const updates = data.faqs.map(({ id, ordem }) =>
        prisma.faq.update({
            where: { id },
            data: { ordem },
        })
    );

    return await prisma.$transaction(updates);
}

export async function getNextOrdem() {
    const lastFaq = await prisma.faq.findFirst({
        orderBy: { ordem: "desc" },
        select: { ordem: true },
    });
    
    return lastFaq ? lastFaq.ordem + 1 : 1;
}
