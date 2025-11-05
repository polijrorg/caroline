import { Role } from "@/generated/prisma";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface UpdateUserRoleDTO {
  role: "USER" | "ADMIN";
}
