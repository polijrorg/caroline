import { Role } from "@/generated/prisma";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
}

export interface UpdateUserRoleDTO {
  role: "USER" | "ADMIN";
}
