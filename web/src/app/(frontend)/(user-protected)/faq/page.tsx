"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { useFaqs } from "@/hooks/use-faq";
import { useSearch } from "@/contexts/SearchContext";

function FaqPage() {
  const { faqs, loading, error } = useFaqs();
  const { searchTerm } = useSearch();
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

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex gap-8 px-8 pt-8 pb-8">
      {/* Left Section */}
      <div className="w-[380px] flex-shrink-0">
        <h1 className="font-poppins font-semibold text-[28px] leading-tight text-[#1E3A5F] mb-4">
          FAQ (Perguntas Frequentes)
        </h1>
        <p className="font-poppins text-sm leading-relaxed text-gray-700 mb-12 text-justify">
          Aqui você encontrará respostas para as dúvidas mais comuns sobre nossos
          serviços, funcionamento e políticas. Nosso objetivo é facilitar sua experiência,
          garantindo que você tenha todas as informações de que precisa de forma
          clara e rápida.
        </p>

        <div className="mt-24">
          <h2 className="font-poppins font-semibold text-xl text-[#1E3A5F] mb-2">
            Ainda precisa de ajuda?
          </h2>
          <p className="font-poppins text-sm text-gray-700 mb-1">
            Fale conosco{" "}
            <a href="#" className="text-teal-600 underline">
              aqui
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Section - FAQ Cards */}
      <div className="flex-1">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <p className="text-gray-500 mt-4">Carregando perguntas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {!loading && !error && filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl">
            <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              {searchTerm
                ? "Nenhuma pergunta encontrada para sua pesquisa."
                : "Ainda não há perguntas frequentes disponíveis."}
            </p>
          </div>
        )}

        {!loading && !error && filteredFaqs.length > 0 && (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedIds.has(faq.id);

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden bg-[#8DD3C7]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center gap-4 text-left hover:opacity-90 transition-opacity"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full border-2 border-[#1E3A5F] flex items-center justify-center">
                        <HelpCircle size={14} className="text-[#1E3A5F]" />
                      </div>
                    </div>
                    <h3 className="flex-1 font-poppins font-semibold text-base text-[#1E3A5F]">
                      {faq.ordem}. {faq.pergunta}
                    </h3>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-5 pl-16">
                      <p className="font-poppins text-sm text-[#1E3A5F] leading-relaxed text-justify">
                        {faq.resposta}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FaqPage;
