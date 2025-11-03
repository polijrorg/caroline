"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useFaqs } from "@/hooks/use-faq";

function FaqPage() {
  const { faqs, loading, error } = useFaqs();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleFaq = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Perguntas Frequentes
            </h1>
          </div>
          <p className="text-gray-600">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-4">Carregando perguntas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {!loading && !error && faqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Ainda não há perguntas frequentes disponíveis.
            </p>
          </div>
        )}

        {!loading && !error && faqs.length > 0 && (
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isExpanded = expandedIds.has(faq.id);

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex-shrink-0 mt-0.5">
                        {faq.ordem}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 break-words">
                        {faq.pergunta}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 text-gray-400">
                      {isExpanded ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-4 ml-11 border-t border-gray-100 pt-4">
                      <p className="text-gray-700 whitespace-pre-wrap break-words">
                        {faq.resposta}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {!loading && !error && faqs.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Não encontrou o que procurava?
            </h3>
            <p className="text-gray-600 mb-4">
              Entre em contato conosco e teremos prazer em ajudá-lo!
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Entrar em Contato
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FaqPage;
