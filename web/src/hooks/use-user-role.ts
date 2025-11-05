"use client";

import { authClient } from "@/lib/auth-client";

export function useUserRole() {
  const { data: session } = authClient.useSession();
  
  // @ts-expect-error - role is added by customSessionClient
  const role = session?.user?.role as "USER" | "ADMIN" | "SUPER_ADMIN" | undefined;
  const isSuperAdmin = role === "SUPER_ADMIN";
  const isAdmin = role === "ADMIN" || isSuperAdmin;
  const isUser = !!role;

  return {
    role,
    isSuperAdmin,
    isAdmin,
    isUser,
    user: session?.user,
  };
}
