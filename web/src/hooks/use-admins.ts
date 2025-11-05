"use client";

import useSWR from "swr";
import { AdminUser, UpdateUserRoleDTO } from "@/types/admins";
import * as api from "@/lib/api/admins";

export function useAdminUsers() {
  const {
    data: users = [],
    error,
    isLoading: loading,
    mutate,
  } = useSWR<AdminUser[]>(
    "/api/admins",
    api.getAllUsers,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos
    }
  );

  const updateUserRole = async (userId: string, data: UpdateUserRoleDTO) => {
    try {
      const updated = await api.updateUserRole(userId, data);
      // Atualiza o cache otimisticamente
      mutate(
        users.map((u) => (u.id === userId ? updated : u)),
        false
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    users,
    loading,
    error: error ? (error instanceof Error ? error.message : "Erro desconhecido") : null,
    refresh: () => mutate(),
    updateUserRole,
  };
}
