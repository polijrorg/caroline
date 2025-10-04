import { z } from "zod";

export const createAulaFavoritaSchema = z.object({
    userId: z.string().min(1, "O ID do usuário é obrigatório"),
    aulaId: z.string().min(1, "O ID da aula é obrigatório"),
});

export type CreateAulaFavoritaInput = z.infer<typeof createAulaFavoritaSchema>;

