"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CreateModuloDTO, Modulo } from "@/types/modulos-aulas";

interface CreateModuloModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateModuloDTO) => Promise<Modulo>;
}

export function CreateModuloModal({ isOpen, onClose, onSubmit }: CreateModuloModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateModuloDTO>({
    titulo: "",
    descricao: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      setFormData({ titulo: "", descricao: "" });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar módulo");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ titulo: "", descricao: "" });
      setError(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Criar Novo Módulo</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="titulo" className="block text-sm font-medium mb-1">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="titulo"
              type="text"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Módulo 1 - Introdução"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium mb-1">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição opcional do módulo"
              disabled={loading}
            />
          </div>

          <div className="text-sm text-gray-500">
            💡 A ordem do módulo será calculada automaticamente
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !formData.titulo.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando..." : "Criar Módulo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
