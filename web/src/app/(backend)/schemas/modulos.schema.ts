import { z } from "zod";

export const createModuloSchema = z.object({
    titulo: z.string().min(1, "Título é obrigatório"),
    descricao: z.string().optional(),
    ordem: z.number().int().positive("A ordem deve ser um número positivo"),
});

export const updateModuloSchema = z.object({
    titulo: z.string().optional(),
    descricao: z.string().optional(),
    ordem: z.number().int().positive().optional(),
});

export const reorderModulosSchema = z.object({
    modulos: z.array(z.object({
        id: z.string(),
        ordem: z.number().int().positive(),
    })),
});

export type CreateModuloInput = z.infer<typeof createModuloSchema>;
export type UpdateModuloInput = z.infer<typeof updateModuloSchema>;
export type ReorderModulosInput = z.infer<typeof reorderModulosSchema>;

