"use client";

import { AdminUser } from "@/types/admins";
import { UserCog } from "lucide-react";

interface AdminsSectionProps {
  admins: AdminUser[];
  updating: string | null;
  onRemoveAdmin: (userId: string) => Promise<void>;
}

export function AdminsSection({ admins, updating, onRemoveAdmin }: AdminsSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <UserCog className="text-blue-600" size={24} />
        Administradores ({admins.length})
      </h2>
      <div className="bg-white border border-gray-200 rounded-lg divide-y">
        {admins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum administrador ainda. Use a página de Usuários para promover usuários.
          </div>
        ) : (
          admins.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => onRemoveAdmin(user.id)}
                  disabled={updating === user.id}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {updating === user.id ? "Removendo..." : "Remover Admin"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
