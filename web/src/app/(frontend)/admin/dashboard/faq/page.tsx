"use client";

import { useState } from "react";
import { HelpCircle, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import AdminHeader from "../components/header/AdminHeader";
import { useFaqs } from "@/hooks/use-faq";
import { CreateFaqModal } from "./components/CreateFaqModal";
import { EditFaqModal } from "./components/EditFaqModal";
import { Faq } from "@/types/faq";

function FaqAdminPage() {
  const { faqs, loading, error, createFaq, updateFaq, deleteFaq } = useFaqs();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);

  const Paragraph = () => (
    <>
      Gerencie as perguntas frequentes (FAQ) que aparecem para os usuários.
    </>
  );

  const handleEdit = (faq: Faq) => {
    setSelectedFaq(faq);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string, pergunta: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a FAQ "${pergunta}"?`)) {
      try {
        await deleteFaq(id);
      } catch (err) {
        alert("Erro ao excluir FAQ");
      }
    }
  };

  return (
    <>
      <AdminHeader Icon={HelpCircle} Paragraph={Paragraph} title="FAQ">
        <button
          type="button"
          className="admin-header-button colorTransition"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus /> Adicionar FAQ
        </button>
      </AdminHeader>

      <div className="p-6">
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando FAQs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {!loading && !error && faqs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Nenhuma FAQ criada ainda.</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Criar Primeira FAQ
            </button>
          </div>
        )}

        {!loading && !error && faqs.length > 0 && (
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start gap-3">
                  <button
                    className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                    title="Arrastar para reordenar"
                  >
                    <GripVertical size={20} />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex-shrink-0">
                        {faq.ordem}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 break-words">
                        {faq.pergunta}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm ml-11 mb-2 whitespace-pre-wrap break-words">
                      {faq.resposta}
                    </p>
                    <div className="ml-11 text-xs text-gray-500">
                      Criado em {new Date(faq.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      onClick={() => handleEdit(faq)}
                      title="Editar FAQ"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      onClick={() => handleDelete(faq.id, faq.pergunta)}
                      title="Excluir FAQ"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && faqs.length > 1 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Dica:</strong> Arraste as FAQs pelo ícone{" "}
              <GripVertical size={16} className="inline" /> para reordenar.
              <br />
              <em className="text-xs">
                (Funcionalidade de drag-and-drop será implementada em breve)
              </em>
            </p>
          </div>
        )}
      </div>

      <CreateFaqModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createFaq}
      />

      <EditFaqModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFaq(null);
        }}
        onSubmit={updateFaq}
        faq={selectedFaq}
      />
    </>
  );
}

export default FaqAdminPage;
