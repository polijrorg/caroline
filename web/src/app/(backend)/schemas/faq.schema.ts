import { z } from "zod";

export const createFaqSchema = z.object({
    pergunta: z.string().min(1, "A pergunta é obrigatória"),
    resposta: z.string().min(1, "A pergunta é obrigatória"),
})

export const updateFaqSchema = z.object({
    pergunta: z.string().optional(),
    resposta: z.string().optional(),
})

export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;
