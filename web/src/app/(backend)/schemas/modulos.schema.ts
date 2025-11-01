import { z } from "zod";

export const createModuloSchema = z.object({
    titulo: z.string().min(1, "Título é obrigatório"),
    descricao: z.string().optional(),
});

export const updateModuloSchema = z.object({
    titulo: z.string().optional(),
    descricao: z.string().optional(),
});

export type CreateModuloInput = z.infer<typeof createModuloSchema>;
export type UpdateModuloInput = z.infer<typeof updateModuloSchema>;

