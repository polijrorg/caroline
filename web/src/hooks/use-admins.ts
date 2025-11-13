"use client";

import useSWR from "swr";
import { AdminUser, UpdateUserRoleDTO, AdminUsersResponse } from "@/types/admins";
import * as api from "@/lib/api/admins";

interface UseAdminUsersOptions {
  search?: string;
  page?: number;
  limit?: number;
}

export function useAdminUsers(options?: UseAdminUsersOptions) {
  const { search, page = 1, limit = 50 } = options || {};
  
  const key = search || page !== 1 || limit !== 50
    ? `/api/admins?search=${search || ""}&page=${page}&limit=${limit}`
    : "/api/admins";

  const {
    data,
    error,
    isLoading: loading,
    mutate,
  } = useSWR<AdminUsersResponse>(
    key,
    () => api.getAllUsers({ search, page, limit }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos
    }
  );

  const updateUserRole = async (userId: string, roleData: UpdateUserRoleDTO) => {
    try {
      const updated = await api.updateUserRole(userId, roleData);
      
      // Atualiza o cache otimisticamente
      if (data) {
        mutate(
          {
            users: data.users.map((u: AdminUser) => (u.id === userId ? updated : u)),
            total: data.total,
          },
          false
        );
      }
      
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    users: data?.users || [],
    total: data?.total || 0,
    loading,
    error: error ? (error instanceof Error ? error.message : "Erro desconhecido") : null,
    refresh: () => mutate(),
    updateUserRole,
  };
}
