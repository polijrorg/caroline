import prisma from "@/backend/services/db";
import { UpdateUserRoleInput } from "../../schemas/admins.schema";
import { Role } from "@/generated/prisma";

interface GetUsersOptions {
  search?: string;
  skip?: number;
  take?: number;
}

export async function getAllUsersWithRoles(options?: GetUsersOptions) {
  const { search, skip = 0, take = 50 } = options || {};
  
  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { name: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
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
      skip,
      take,
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total };
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
