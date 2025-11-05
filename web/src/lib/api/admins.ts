import { AdminUser, UpdateUserRoleDTO, AdminUsersResponse } from "@/types/admins";

const BASE_URL = "/api/admins";

interface GetAllUsersOptions {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getAllUsers(options?: GetAllUsersOptions): Promise<AdminUsersResponse> {
  const params = new URLSearchParams();
  
  if (options?.search) params.append("search", options.search);
  if (options?.page) params.append("page", options.page.toString());
  if (options?.limit) params.append("limit", options.limit.toString());
  
  const url = params.toString() ? `${BASE_URL}?${params}` : BASE_URL;
  const response = await fetch(url);
  
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
