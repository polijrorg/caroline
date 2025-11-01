import { z } from "zod";



export const createAulaSchema = z.object({
    titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    conteudo: z.string().optional(),
    moduloId: z.string().min(24, "ID de módulo inválido")
});

export const updateAulaSchema = z.object({
    titulo: z.string().min(3).optional(),
    conteudo: z.string().optional()
});

export type CreateAulaInput = z.infer<typeof createAulaSchema>;
export type UpdateAulaInput = z.infer<typeof updateAulaSchema>;
