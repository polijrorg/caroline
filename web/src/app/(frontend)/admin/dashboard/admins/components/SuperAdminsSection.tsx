"use client";

import { AdminUser } from "@/types/admins";
import { Shield } from "lucide-react";
import { RoleBadge } from "../../usuarios/components/RoleBadge";

interface SuperAdminsSectionProps {
  superAdmins: AdminUser[];
}

export function SuperAdminsSection({ superAdmins }: SuperAdminsSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Shield className="text-purple-600" size={24} />
        Super Administradores ({superAdmins.length})
      </h2>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-800 mb-4">
          Super Administradores têm controle total sobre a plataforma e não podem ter suas
          permissões alteradas através desta interface.
        </p>
        <div className="space-y-2">
          {superAdmins.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg border border-purple-200 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <RoleBadge role={user.role} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
