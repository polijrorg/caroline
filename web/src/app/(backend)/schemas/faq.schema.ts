import { z } from "zod";

export const createFaqSchema = z.object({
    pergunta: z.string().min(1, "A pergunta é obrigatória"),
    resposta: z.string().min(1, "A resposta é obrigatória"),
    ordem: z.number().int().positive("A ordem deve ser um número positivo"),
});

export const updateFaqSchema = z.object({
    pergunta: z.string().optional(),
    resposta: z.string().optional(),
    ordem: z.number().int().positive().optional(),
});

export const reorderFaqsSchema = z.object({
    faqs: z.array(z.object({
        id: z.string(),
        ordem: z.number().int().positive(),
    })),
});

export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;
export type ReorderFaqsInput = z.infer<typeof reorderFaqsSchema>;
