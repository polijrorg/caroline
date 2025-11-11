"use client";

import { Modulo } from "@/types/modulos-aulas";

interface AulaFormFieldsProps {
  titulo: string;
  setTitulo: (value: string) => void;
  moduloId: string;
  setModuloId: (value: string) => void;
  diaDisponivel: number;
  setDiaDisponivel: (value: number) => void;
  modulos: Modulo[];
  selectedModuloId?: string;
  disabled?: boolean;
}

export function AulaFormFields({
  titulo,
  setTitulo,
  moduloId,
  setModuloId,
  diaDisponivel,
  setDiaDisponivel,
  modulos,
  selectedModuloId,
  disabled = false,
}: AulaFormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Módulo Selection */}
      <div>
        <label htmlFor="moduloId" className="block text-sm font-medium mb-1">
          Módulo <span className="text-red-500">*</span>
        </label>
        <select
          id="moduloId"
          value={moduloId}
          onChange={(e) => setModuloId(e.target.value)}
          required
          disabled={disabled || !!selectedModuloId}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">Selecione um módulo</option>
          {modulos.map((modulo) => (
            <option key={modulo.id} value={modulo.id}>
              {modulo.ordem}. {modulo.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Título */}
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium mb-1">
          Título da Aula <span className="text-red-500">*</span>
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Introdução à Meditação"
          disabled={disabled}
        />
      </div>

      {/* Dia Disponível */}
      <div>
        <label htmlFor="diaDisponivel" className="block text-sm font-medium mb-1">
          Dia de Liberação <span className="text-red-500">*</span>
        </label>
        <input
          id="diaDisponivel"
          type="number"
          min="1"
          value={diaDisponivel}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setDiaDisponivel(isNaN(value) ? 1 : value);
          }}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
        />
        <p className="text-xs text-gray-500 mt-1">
          Dias após o cadastro do usuário (1 = primeiro dia, 2 = segundo dia, etc.)
        </p>
      </div>
    </div>
  );
}
