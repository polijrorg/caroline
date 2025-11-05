import prisma from "@/backend/services/db";
import { UpdateUserRoleInput } from "../../schemas/admins.schema";
import { Role } from "@/generated/prisma";

export async function getAllUsersWithRoles() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: [
      { role: "asc" },
      { name: "asc" },
    ],
  });
}

export async function updateUserRole(id: string, role: UpdateUserRoleInput["role"]) {
  // Verifica se o usuário existe
  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });

  if (!existingUser) {
    throw new Error("Usuário não encontrado");
  }

  // Não permite alterar role de SUPER_ADMIN
  if (existingUser.role === "SUPER_ADMIN") {
    throw new Error("Não é possível alterar a role de um SUPER_ADMIN");
  }

  // Atualiza a role
  return await prisma.user.update({
    where: { id },
    data: { role: role as Role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}
