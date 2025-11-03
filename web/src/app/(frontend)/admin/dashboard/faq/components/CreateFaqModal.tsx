"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CreateFaqDTO } from "@/types/faq";

interface CreateFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFaqDTO) => Promise<any>;
}

export function CreateFaqModal({ isOpen, onClose, onSubmit }: CreateFaqModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateFaqDTO>({
    pergunta: "",
    resposta: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      setFormData({ pergunta: "", resposta: "" });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar FAQ");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ pergunta: "", resposta: "" });
      setError(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Criar Nova FAQ</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="pergunta" className="block text-sm font-medium mb-1">
                Pergunta <span className="text-red-500">*</span>
              </label>
              <input
                id="pergunta"
                type="text"
                value={formData.pergunta}
                onChange={(e) =>
                  setFormData({ ...formData, pergunta: e.target.value })
                }
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Como funciona o sistema de aulas?"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="resposta" className="block text-sm font-medium mb-1">
                Resposta <span className="text-red-500">*</span>
              </label>
              <textarea
                id="resposta"
                value={formData.resposta}
                onChange={(e) =>
                  setFormData({ ...formData, resposta: e.target.value })
                }
                required
                rows={6}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a resposta completa..."
                disabled={loading}
              />
            </div>

            <div className="text-sm text-gray-500">
              💡 A ordem da FAQ será calculada automaticamente
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end p-4 border-t bg-gray-50">
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
              disabled={loading || !formData.pergunta.trim() || !formData.resposta.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando..." : "Criar FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
