"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Exercicio {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
}

interface ExercicioAulaFormProps {
  conteudo: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ExercicioAulaForm({ conteudo, onChange, disabled }: ExercicioAulaFormProps) {
  // Parse conteúdo JSON ou inicializa array vazio
  const parseExercicios = (): Exercicio[] => {
    try {
      return conteudo ? JSON.parse(conteudo) : [];
    } catch {
      return [];
    }
  };

  const [exercicios, setExercicios] = useState<Exercicio[]>(parseExercicios);

  const updateExercicios = (novosExercicios: Exercicio[]) => {
    setExercicios(novosExercicios);
    onChange(JSON.stringify(novosExercicios));
  };

  const adicionarExercicio = () => {
    updateExercicios([
      ...exercicios,
      {
        pergunta: "",
        opcoes: ["", "", "", ""],
        respostaCorreta: 0,
      },
    ]);
  };

  const removerExercicio = (index: number) => {
    updateExercicios(exercicios.filter((_, i) => i !== index));
  };

  const atualizarExercicio = (
    index: number,
    campo: keyof Exercicio,
    valor: string | number
  ) => {
    const novosExercicios = [...exercicios];
    novosExercicios[index] = { ...novosExercicios[index], [campo]: valor };
    updateExercicios(novosExercicios);
  };

  const atualizarOpcao = (exercicioIndex: number, opcaoIndex: number, valor: string) => {
    const novosExercicios = [...exercicios];
    const novasOpcoes = [...novosExercicios[exercicioIndex].opcoes];
    novasOpcoes[opcaoIndex] = valor;
    novosExercicios[exercicioIndex] = {
      ...novosExercicios[exercicioIndex],
      opcoes: novasOpcoes,
    };
    updateExercicios(novosExercicios);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Exercícios</h3>
          <p className="text-xs text-gray-500">
            Crie perguntas de múltipla escolha para testar o conhecimento
          </p>
        </div>
        <button
          type="button"
          onClick={adicionarExercicio}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50"
        >
          <Plus size={16} />
          Adicionar Exercício
        </button>
      </div>

      {exercicios.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <div className="text-4xl mb-2">✏️</div>
          <p className="text-gray-500">Nenhum exercício criado ainda</p>
          <button
            type="button"
            onClick={adicionarExercicio}
            disabled={disabled}
            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Criar primeiro exercício
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {exercicios.map((exercicio, exercicioIndex) => (
            <div key={exercicioIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">Exercício {exercicioIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => removerExercicio(exercicioIndex)}
                  disabled={disabled}
                  className="text-red-600 hover:text-red-700"
                  title="Remover exercício"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Pergunta */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pergunta <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={exercicio.pergunta}
                  onChange={(e) =>
                    atualizarExercicio(exercicioIndex, "pergunta", e.target.value)
                  }
                  disabled={disabled}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Digite a pergunta do exercício"
                  required
                />
              </div>

              {/* Opções */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Opções de Resposta <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {exercicio.opcoes.map((opcao, opcaoIndex) => (
                    <div key={opcaoIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`resposta-${exercicioIndex}`}
                        checked={exercicio.respostaCorreta === opcaoIndex}
                        onChange={() =>
                          atualizarExercicio(exercicioIndex, "respostaCorreta", opcaoIndex)
                        }
                        disabled={disabled}
                        className="w-4 h-4"
                        title="Marcar como resposta correta"
                      />
                      <span className="text-sm font-medium w-6">
                        {String.fromCharCode(65 + opcaoIndex)}.
                      </span>
                      <input
                        type="text"
                        value={opcao}
                        onChange={(e) =>
                          atualizarOpcao(exercicioIndex, opcaoIndex, e.target.value)
                        }
                        disabled={disabled}
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Opção ${String.fromCharCode(65 + opcaoIndex)}`}
                        required
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Selecione o radio button da resposta correta
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {exercicios.length > 0 && (
        <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-3">
          <p className="font-medium text-blue-900 mb-1">📊 Resumo:</p>
          <p>
            {exercicios.length} exercício{exercicios.length !== 1 ? "s" : ""} criado
            {exercicios.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
