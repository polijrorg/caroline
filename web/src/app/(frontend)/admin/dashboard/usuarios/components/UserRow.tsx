"use client";

import { AdminUser } from "@/types/admins";
import { RoleBadge } from "./RoleBadge";
import { UserActions } from "./UserActions";

interface UserRowProps {
  user: AdminUser;
  isUpdating: boolean;
  onRoleChange: (userId: string, newRole: "USER" | "ADMIN") => Promise<void>;
}

export function UserRow({ user, isUpdating, onRoleChange }: UserRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{user.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <UserActions
          userId={user.id}
          role={user.role}
          isUpdating={isUpdating}
          onRoleChange={onRoleChange}
        />
      </td>
    </tr>
  );
}
