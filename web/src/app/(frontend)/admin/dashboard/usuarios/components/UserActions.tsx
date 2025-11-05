"use client";

import { Role } from "@/generated/prisma";

interface UserActionsProps {
  userId: string;
  role: Role;
  isUpdating: boolean;
  onRoleChange: (userId: string, newRole: "USER" | "ADMIN") => Promise<void>;
}

export function UserActions({ userId, role, isUpdating, onRoleChange }: UserActionsProps) {
  if (role === "SUPER_ADMIN") {
    return <span className="text-gray-400 cursor-not-allowed">Intocável</span>;
  }

  if (role === "ADMIN") {
    return (
      <button
        onClick={() => onRoleChange(userId, "USER")}
        disabled={isUpdating}
        className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isUpdating ? "Removendo..." : "Remover Admin"}
      </button>
    );
  }

  return (
    <button
      onClick={() => onRoleChange(userId, "ADMIN")}
      disabled={isUpdating}
      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isUpdating ? "Promovendo..." : "Promover a Admin"}
    </button>
  );
}
