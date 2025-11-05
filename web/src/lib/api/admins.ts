import { AdminUser, UpdateUserRoleDTO } from "@/types/admins";

const BASE_URL = "/api/admins";

export async function getAllUsers(): Promise<AdminUser[]> {
  const response = await fetch(BASE_URL);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar usuários");
  }
  
  return response.json();
}

export async function updateUserRole(
  userId: string,
  data: UpdateUserRoleDTO
): Promise<AdminUser> {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar role do usuário");
  }
  
  return response.json();
}
