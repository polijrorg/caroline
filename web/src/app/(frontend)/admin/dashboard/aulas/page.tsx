"use client";

import { useState } from "react";
import { List, Plus, Edit, Trash2, Calendar, ArrowUpDown } from "lucide-react";
import AdminHeader from "../components/header/AdminHeader";
import { useModulos, useAulas } from "@/hooks/use-modulos-aulas";
import { CreateAulaModal } from "./components/CreateAulaModal";
import { ReorderAulasModal } from "./components/ReorderAulasModal";
import { TipoAulaLabels, TipoAulaIcons } from "@/types/modulos-aulas";

function AulasPage() {
  const { modulos, loading: loadingModulos } = useModulos();
  const { aulas, loading: loadingAulas, error, createAula, deleteAula, reorderAulas } = useAulas();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [selectedModuloId, setSelectedModuloId] = useState<string>("");
  const [selectedDia, setSelectedDia] = useState<number>(1);

  const Paragraph = () => (
    <>
      As aulas são o conteúdo principal da plataforma. Cada aula pertence a um módulo e pode
      ser de três tipos: Texto (com imagens), Vídeo ou Exercício.
    </>
  );

  const handleDelete = async (id: string, titulo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a aula "${titulo}"?`)) {
      try {
        await deleteAula(id);
      } catch (err) {
        alert("Erro ao excluir aula");
      }
    }
  };

  const handleCreateClick = (moduloId?: string) => {
    if (moduloId) {
      setSelectedModuloId(moduloId);
    } else {
      setSelectedModuloId("");
    }
    setIsCreateModalOpen(true);
  };

  const getAulasPorModulo = (moduloId: string) => {
    return aulas.filter((aula) => aula.moduloId === moduloId);
  };

  const getAulasPorDia = (moduloId: string, dia: number) => {
    return aulas.filter((aula) => aula.moduloId === moduloId && aula.diaDisponivel === dia);
  };

  const getDiasComAulas = (moduloId: string) => {
    const aulasDoModulo = getAulasPorModulo(moduloId);
    const dias = [...new Set(aulasDoModulo.map((aula) => aula.diaDisponivel))];
    return dias.sort((a, b) => a - b);
  };

  const handleReorderClick = (moduloId: string, dia: number) => {
    setSelectedModuloId(moduloId);
    setSelectedDia(dia);
    setIsReorderModalOpen(true);
  };

  const loading = loadingModulos || loadingAulas;

  return (
    <>
      <AdminHeader Icon={List} Paragraph={Paragraph} title="Aulas">
        <button
          type="button"
          className="admin-header-button colorTransition"
          onClick={() => handleCreateClick()}
          disabled={modulos.length === 0}
        >
          <Plus /> Adicionar Aula
        </button>
      </AdminHeader>

      <div className="p-6">
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando aulas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {!loading && !error && modulos.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <List size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Nenhum módulo criado ainda.</p>
            <p className="text-sm text-gray-400">
              Crie um módulo primeiro para depois adicionar aulas.
            </p>
          </div>
        )}

        {!loading && !error && modulos.length > 0 && (
          <div className="space-y-6">
            {modulos.map((modulo) => {
              const aulasDoModulo = getAulasPorModulo(modulo.id);

              return (
                <div key={modulo.id} className="border rounded-lg bg-white">
                  {/* Header do Módulo */}
                  <div className="bg-blue-50 border-b p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                          {modulo.ordem}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {modulo.titulo}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {aulasDoModulo.length} aula{aulasDoModulo.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCreateClick(modulo.id)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                      >
                        <Plus size={16} />
                        Adicionar Aula
                      </button>
                    </div>
                  </div>

                  {/* Lista de Aulas - Agrupadas por Dia */}
                  <div className="divide-y">
                    {aulasDoModulo.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <List size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-sm">Nenhuma aula neste módulo ainda</p>
                      </div>
                    ) : (
                      getDiasComAulas(modulo.id).map((dia) => {
                        const aulasDoDia = getAulasPorDia(modulo.id, dia);
                        
                        return (
                          <div key={dia} className="p-4">
                            {/* Header do Dia */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <h4 className="text-sm font-semibold text-gray-700">
                                  Dia {dia}
                                </h4>
                                <span className="text-xs text-gray-500">
                                  ({aulasDoDia.length} aula{aulasDoDia.length !== 1 ? "s" : ""})
                                </span>
                              </div>
                              {aulasDoDia.length > 1 && (
                                <button
                                  onClick={() => handleReorderClick(modulo.id, dia)}
                                  className="text-xs px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1"
                                  title="Reordenar aulas deste dia"
                                >
                                  <ArrowUpDown size={14} />
                                  Reordenar
                                </button>
                              )}
                            </div>

                            {/* Aulas do Dia */}
                            <div className="space-y-2">
                              {aulasDoDia
                                .sort((a, b) => a.ordem - b.ordem)
                                .map((aula) => (
                                  <div
                                    key={aula.id}
                                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl">{TipoAulaIcons[aula.tipo]}</span>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                              #{aula.ordem}
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <h5 className="font-medium text-gray-900">
                                              {aula.titulo}
                                            </h5>
                                          </div>
                                          <span className="text-xs px-2 py-0.5 bg-white rounded text-gray-600 inline-block mt-1">
                                            {TipoAulaLabels[aula.tipo]}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                      <button
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="Editar aula"
                                      >
                                        <Edit size={16} />
                                      </button>
                                      <button
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        onClick={() => handleDelete(aula.id, aula.titulo)}
                                        title="Excluir aula"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CreateAulaModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedModuloId("");
        }}
        onSubmit={async (data) => {
          await createAula(data);
        }}
        modulos={modulos}
        selectedModuloId={selectedModuloId}
      />

      <ReorderAulasModal
        isOpen={isReorderModalOpen}
        onClose={() => {
          setIsReorderModalOpen(false);
          setSelectedModuloId("");
          setSelectedDia(1);
        }}
        onSubmit={async (data) => {
          await reorderAulas({ aulas: data });
        }}
        aulas={getAulasPorDia(selectedModuloId, selectedDia)}
        diaDisponivel={selectedDia}
      />
    </>
  );
}

export default AulasPage;
