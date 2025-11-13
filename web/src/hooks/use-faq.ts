"use client";

import useSWR from "swr";
import { Faq, CreateFaqDTO, UpdateFaqDTO, ReorderFaqsDTO } from "@/types/faq";
import * as api from "@/lib/api/faq";

// Hook para gerenciar FAQs com SWR para caching
export function useFaqs() {
  const {
    data: faqs = [],
    error,
    isLoading: loading,
    mutate,
  } = useSWR<Faq[]>(
    "/api/faq",
    api.getAllFaqs,
    {
      revalidateOnFocus: false, // FAQs não mudam com frequência
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minuto de cache
    }
  );

  const createFaq = async (data: CreateFaqDTO) => {
    try {
      const newFaq = await api.createFaq(data);
      // Atualiza o cache otimisticamente
      mutate([...faqs, newFaq].sort((a, b) => a.ordem - b.ordem), false);
      return newFaq;
    } catch (err) {
      throw err;
    }
  };

  const updateFaq = async (id: string, data: UpdateFaqDTO) => {
    try {
      const updated = await api.updateFaq(id, data);
      // Atualiza o cache otimisticamente
      mutate(
        faqs.map((f) => (f.id === id ? updated : f)).sort((a, b) => a.ordem - b.ordem),
        false
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      await api.deleteFaq(id);
      // Atualiza o cache otimisticamente
      mutate(faqs.filter((f) => f.id !== id), false);
    } catch (err) {
      throw err;
    }
  };

  const reorderFaqs = async (data: ReorderFaqsDTO) => {
    try {
      const updated = await api.reorderFaqs(data);
      // Atualiza o cache otimisticamente
      mutate(updated.sort((a, b) => a.ordem - b.ordem), false);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    faqs,
    loading,
    error: error ? (error instanceof Error ? error.message : "Erro desconhecido") : null,
    refresh: () => mutate(),
    createFaq,
    updateFaq,
    deleteFaq,
    reorderFaqs,
  };
}
