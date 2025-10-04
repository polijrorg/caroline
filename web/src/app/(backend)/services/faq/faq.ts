import { prisma } from "@/generated/prisma";
import { UpdateFaqInput, CreateFaqInput } from "../../schemas/faq.schema";

export async function getAllFaqs() {
    return prisma.faq.findMany({
        orderBy: { createdAt: "desc" },
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
