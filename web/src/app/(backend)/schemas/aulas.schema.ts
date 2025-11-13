import { z } from "zod";

export enum TipoAula {
    VIDEO = "VIDEO",
    EXERCICIO = "EXERCICIO",
    MARKDOWN = "MARKDOWN"
}

export const createAulaSchema = z.object({
    titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    conteudo: z.string().optional(),
    tipo: z.enum(TipoAula).default(TipoAula.MARKDOWN),
    ordem: z.number().int().positive("A ordem deve ser um número positivo"),
    diaDisponivel: z.number().int().min(1, "O dia disponível deve ser pelo menos 1"),
    moduloId: z.string().min(24, "ID de módulo inválido")
});

export const updateAulaSchema = z.object({
    titulo: z.string().min(3).optional(),
    conteudo: z.string().optional(),
    tipo: z.nativeEnum(TipoAula).optional(),
    ordem: z.number().int().positive().optional(),
    diaDisponivel: z.number().int().min(1).optional(),
});

export const reorderAulasSchema = z.object({
    aulas: z.array(z.object({
        id: z.string(),
        ordem: z.number().int().positive(),
    })),
});

export type CreateAulaInput = z.infer<typeof createAulaSchema>;
export type UpdateAulaInput = z.infer<typeof updateAulaSchema>;
export type ReorderAulasInput = z.infer<typeof reorderAulasSchema>;
