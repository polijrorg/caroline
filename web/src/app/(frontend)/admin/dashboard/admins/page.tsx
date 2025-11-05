"use client";

import { useState } from "react";
import { useAdminUsers } from "@/hooks/use-admins";
import { AdminUser } from "@/types/admins";
import { Shield, UserCog, Users, AlertCircle } from "lucide-react";

function AdminsPage() {
  const { users, loading, error, updateUserRole } = useAdminUsers();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    try {
      setUpdating(userId);
      await updateUserRole(userId, { role: newRole });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar role");
    } finally {
      setUpdating(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "ADMIN":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Shield size={16} className="inline mr-1" />;
      case "ADMIN":
        return <UserCog size={16} className="inline mr-1" />;
      default:
        return <Users size={16} className="inline mr-1" />;
    }
  };

  const groupedUsers = {
    superAdmins: users.filter((u) => u.role === "SUPER_ADMIN"),
    admins: users.filter((u) => u.role === "ADMIN"),
    users: users.filter((u) => u.role === "USER"),
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <div>
              <h3 className="text-red-800 font-semibold">Acesso Negado</h3>
              <p className="text-red-700">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Apenas SUPER_ADMIN pode acessar esta página.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciar Administradores
        </h1>
        <p className="text-gray-600">
          Promova usuários para administradores ou remova suas permissões.
        </p>
      </div>

      {/* Super Admins */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Shield className="text-purple-600" size={24} />
          Super Administradores ({groupedUsers.superAdmins.length})
        </h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-800 mb-4">
            Super Administradores têm controle total sobre a plataforma e não podem ter suas
            permissões alteradas através desta interface.
          </p>
          <div className="space-y-2">
            {groupedUsers.superAdmins.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg border border-purple-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {getRoleIcon(user.role)}
                    SUPER ADMIN
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admins */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserCog className="text-blue-600" size={24} />
          Administradores ({groupedUsers.admins.length})
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg divide-y">
          {groupedUsers.admins.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum administrador ainda. Promova usuários abaixo.
            </div>
          ) : (
            groupedUsers.admins.map((user) => (
              <div key={user.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleRoleChange(user.id, "USER")}
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

      {/* Users */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="text-gray-600" size={24} />
          Usuários ({groupedUsers.users.length})
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg divide-y">
          {groupedUsers.users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum usuário comum cadastrado.
            </div>
          ) : (
            groupedUsers.users.map((user) => (
              <div key={user.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleRoleChange(user.id, "ADMIN")}
                    disabled={updating === user.id}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updating === user.id ? "Promovendo..." : "Promover a Admin"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminsPage;
