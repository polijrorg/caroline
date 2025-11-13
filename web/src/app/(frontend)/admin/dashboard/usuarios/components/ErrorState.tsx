"use client";

import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-600" size={24} />
          <div>
            <h3 className="text-red-800 font-semibold">Acesso Negado</h3>
            <p className="text-red-700">{message}</p>
            <p className="text-red-600 text-sm mt-2">
              Apenas SUPER_ADMIN pode acessar esta página.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
