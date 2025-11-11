"use client";

import { TipoAula } from "@/types/modulos-aulas";

interface TipoAulaSelectorProps {
  tipo: TipoAula;
  onTipoChange: (tipo: TipoAula) => void;
  disabled?: boolean;
}

export function TipoAulaSelector({ tipo, onTipoChange, disabled = false }: TipoAulaSelectorProps) {
  const tipos = [
    {
      value: TipoAula.MARKDOWN,
      emoji: "📄",
      label: "Texto",
      description: "Texto + Imagens",
    },
    {
      value: TipoAula.VIDEO,
      emoji: "📹",
      label: "Vídeo",
      description: "URL do vídeo",
    },
    {
      value: TipoAula.EXERCICIO,
      emoji: "✏️",
      label: "Exercício",
      description: "Perguntas",
    },
  ];

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Tipo de Aula <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        {tipos.map((tipoOption) => (
          <button
            key={tipoOption.value}
            type="button"
            onClick={() => onTipoChange(tipoOption.value)}
            disabled={disabled}
            className={`p-4 border-2 rounded-lg transition-all ${
              tipo === tipoOption.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-1">{tipoOption.emoji}</div>
            <div className="font-medium">{tipoOption.label}</div>
            <div className="text-xs text-gray-500">{tipoOption.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
