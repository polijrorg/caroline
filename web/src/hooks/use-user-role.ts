"use client";

import { authClient } from "@/lib/auth-client";

export function useUserRole() {
  const { data: session } = authClient.useSession();
  
  // Role is added by customSessionClient at top level
  const role = (session as { role?: "USER" | "ADMIN" | "SUPER_ADMIN" })?.role;
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
