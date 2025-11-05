"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export function AdminsPageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Shield className="text-purple-600" size={32} />
        Gerenciar Administradores
      </h1>
      <p className="text-gray-600">
        Visualize e gerencie as permissões de administradores.
      </p>
      <div className="mt-4">
        <Link
          href="/admin/dashboard/usuarios"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Buscar usuários para promover
        </Link>
      </div>
    </div>
  );
}
