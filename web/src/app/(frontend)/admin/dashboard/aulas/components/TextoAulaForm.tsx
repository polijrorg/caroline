"use client";

import { useState } from "react";
import { Bold, Italic, List, ListOrdered, Image as ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface TextoAulaFormProps {
  conteudo: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TextoAulaForm({ conteudo, onChange, disabled }: TextoAulaFormProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = conteudo.substring(start, end);
    const newText =
      conteudo.substring(0, start) +
      before +
      selectedText +
      after +
      conteudo.substring(end);

    onChange(newText);

    // Restaurar seleção
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="markdown-editor" className="block text-sm font-medium">
            Conteúdo da Aula <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showPreview ? "Editar" : "Visualizar"}
          </button>
        </div>

        {/* Toolbar */}
        {!showPreview && (
          <div className="flex gap-1 p-2 border border-b-0 rounded-t-md bg-gray-50">
            <button
              type="button"
              onClick={() => insertMarkdown("**", "**")}
              disabled={disabled}
              className="p-2 hover:bg-gray-200 rounded"
              title="Negrito"
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("*", "*")}
              disabled={disabled}
              className="p-2 hover:bg-gray-200 rounded"
              title="Itálico"
            >
              <Italic size={16} />
            </button>
            <div className="w-px bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdown("- ")}
              disabled={disabled}
              className="p-2 hover:bg-gray-200 rounded"
              title="Lista"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("1. ")}
              disabled={disabled}
              className="p-2 hover:bg-gray-200 rounded"
              title="Lista numerada"
            >
              <ListOrdered size={16} />
            </button>
            <div className="w-px bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdown("![descrição](", ")")}
              disabled={disabled}
              className="p-2 hover:bg-gray-200 rounded"
              title="Imagem"
            >
              <ImageIcon size={16} />
            </button>
          </div>
        )}

        {/* Editor / Preview */}
        {showPreview ? (
          <div className="border rounded-b-md p-4 min-h-[200px] prose prose-sm max-w-none bg-white">
            {conteudo ? (
              <ReactMarkdown>{conteudo}</ReactMarkdown>
            ) : (
              <p className="text-gray-400">Nada para visualizar ainda...</p>
            )}
          </div>
        ) : (
          <textarea
            id="markdown-editor"
            value={conteudo}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            rows={12}
            placeholder="Digite o conteúdo da aula usando Markdown...

Exemplos:
**Negrito** ou __negrito__
*Itálico* ou _itálico_

# Título 1
## Título 2

- Item de lista
- Outro item

![Descrição da imagem](URL_da_imagem)"
          />
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 Suporta Markdown para formatação de texto</p>
        <p>
          📸 Para adicionar imagens, use: <code className="bg-gray-100 px-1 rounded">![alt](url)</code>
        </p>
      </div>
    </div>
  );
}
