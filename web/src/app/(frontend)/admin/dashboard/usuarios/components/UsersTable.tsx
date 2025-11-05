"use client";

import { AdminUser } from "@/types/admins";
import { UserRow } from "./UserRow";

interface UsersTableProps {
  users: AdminUser[];
  searchTerm: string;
  updating: string | null;
  onRoleChange: (userId: string, newRole: "USER" | "ADMIN") => Promise<void>;
}

export function UsersTable({ users, searchTerm, updating, onRoleChange }: UsersTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuário
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                {searchTerm ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                isUpdating={updating === user.id}
                onRoleChange={onRoleChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
