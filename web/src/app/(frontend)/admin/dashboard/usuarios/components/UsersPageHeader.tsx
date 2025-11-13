"use client";

import { Users } from "lucide-react";

export function UsersPageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Users className="text-blue-600" size={32} />
        Gerenciar Usuários
      </h1>
      <p className="text-gray-600">
        Busque e gerencie todos os usuários da plataforma.
      </p>
    </div>
  );
}
