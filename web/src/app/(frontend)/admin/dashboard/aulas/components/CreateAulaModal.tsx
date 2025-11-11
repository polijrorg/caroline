"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CreateAulaDTO, TipoAula, Modulo } from "@/types/modulos-aulas";
import { AulaFormFields } from "./AulaFormFields";
import { TipoAulaSelector } from "./TipoAulaSelector";
import { AulaContentEditor } from "./AulaContentEditor";

interface CreateAulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAulaDTO) => Promise<void>;
  modulos: Modulo[];
  selectedModuloId?: string;
}

export function CreateAulaModal({
  isOpen,
  onClose,
  onSubmit,
  modulos,
  selectedModuloId,
}: CreateAulaModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipo, setTipo] = useState<TipoAula>(TipoAula.MARKDOWN);
  const [titulo, setTitulo] = useState("");
  const [diaDisponivel, setDiaDisponivel] = useState(1);
  const [moduloId, setModuloId] = useState(selectedModuloId || "");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    if (selectedModuloId) {
      setModuloId(selectedModuloId);
    }
  }, [selectedModuloId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit({ titulo, conteudo, tipo, diaDisponivel, moduloId });
      setTitulo("");
      setConteudo("");
      setTipo(TipoAula.MARKDOWN);
      setDiaDisponivel(1);
      setModuloId(selectedModuloId || "");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar aula");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTitulo("");
      setConteudo("");
      setTipo(TipoAula.MARKDOWN);
      setDiaDisponivel(1);
      setModuloId(selectedModuloId || "");
      setError(null);
      onClose();
    }
  };

  const handleContentChange = (conteudo: string) => {
    setConteudo(conteudo);
  };

  const handleTipoChange = (newTipo: TipoAula) => {
    setTipo(newTipo);
    setConteudo(""); // Limpar conteúdo ao trocar de tipo
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-semibold">Criar Nova Aula</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <AulaFormFields
            titulo={titulo}
            setTitulo={setTitulo}
            moduloId={moduloId}
            setModuloId={setModuloId}
            diaDisponivel={diaDisponivel}
            setDiaDisponivel={setDiaDisponivel}
            modulos={modulos}
            selectedModuloId={selectedModuloId}
            disabled={loading}
          />

          <TipoAulaSelector tipo={tipo} onTipoChange={handleTipoChange} disabled={loading} />

          <AulaContentEditor
            tipo={tipo}
            conteudo={conteudo}
            onChange={handleContentChange}
            disabled={loading}
          />
          </div>
        </form>

        {/* Actions - Fixed at bottom */}
        <div className="flex gap-3 justify-end p-6 pt-4 border-t bg-white rounded-b-lg flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { cancelable: true, bubbles: true });
                form.dispatchEvent(event);
              }
            }}
            disabled={loading || !titulo.trim() || !moduloId || !conteudo?.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Criando..." : "Criar Aula"}
          </button>
        </div>
      </div>
    </div>
  );
}
