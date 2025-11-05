import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"], {
    message: "Role deve ser USER ou ADMIN",
  }),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
