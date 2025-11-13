"use client";

import { useState } from "react";
import { LibraryBig, Plus, Edit, Trash2 } from "lucide-react";
import AdminHeader from "../components/header/AdminHeader";
import { useModulos } from "@/hooks/use-modulos-aulas";
import { CreateModuloModal } from "./components/CreateModuloModal";

function DashboardPage() {
  const { modulos, loading, error, createModulo, deleteModulo } = useModulos();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const Paragraph = () => (
    <>
      Os módulos contém as aulas, como o de Mindfullness. Eles são organizados sequencialmente.
    </>
  );

  const handleDelete = async (id: string, titulo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o módulo "${titulo}"? Todas as aulas serão removidas.`)) {
      try {
        await deleteModulo(id);
      } catch {
        alert("Erro ao excluir módulo");
      }
    }
  };

  return ( 
    <>
      <AdminHeader
        Icon={LibraryBig}
        Paragraph={Paragraph}
        title="Módulos"
      >
        <button 
          type="button" 
          className="admin-header-button colorTransition"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus /> Adicionar Módulo
        </button>
      </AdminHeader>
      
      <div className="p-6">
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando módulos...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}
        
        {!loading && !error && modulos.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <LibraryBig size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Nenhum módulo criado ainda.</p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Criar Primeiro Módulo
            </button>
          </div>
        )}

        {!loading && !error && modulos.length > 0 && (
          <div className="space-y-4">
            {modulos.map((modulo) => (
              <div 
                key={modulo.id} 
                className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                        {modulo.ordem}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {modulo.titulo}
                      </h3>
                    </div>
                    {modulo.descricao && (
                      <p className="text-gray-600 text-sm ml-11 mb-2">
                        {modulo.descricao}
                      </p>
                    )}
                    <div className="ml-11 flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        {modulo.aulas?.length || 0} aula{modulo.aulas?.length !== 1 ? 's' : ''}
                      </span>
                      <span>•</span>
                      <span>
                        Criado em {new Date(modulo.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Editar módulo"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      onClick={() => handleDelete(modulo.id, modulo.titulo)}
                      title="Excluir módulo"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateModuloModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createModulo}
      />
    </>
  );
}

export default DashboardPage;