"use client";

import { useState, useEffect } from "react";
import { Faq, CreateFaqDTO, UpdateFaqDTO, ReorderFaqsDTO } from "@/types/faq";
import * as api from "@/lib/api/faq";

// Hook para gerenciar FAQs
export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllFaqs();
      setFaqs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const createFaq = async (data: CreateFaqDTO) => {
    try {
      const newFaq = await api.createFaq(data);
      setFaqs((prev) => [...prev, newFaq].sort((a, b) => a.ordem - b.ordem));
      return newFaq;
    } catch (err) {
      throw err;
    }
  };

  const updateFaq = async (id: string, data: UpdateFaqDTO) => {
    try {
      const updated = await api.updateFaq(id, data);
      setFaqs((prev) =>
        prev.map((f) => (f.id === id ? updated : f)).sort((a, b) => a.ordem - b.ordem)
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      await api.deleteFaq(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const reorderFaqs = async (data: ReorderFaqsDTO) => {
    try {
      const updated = await api.reorderFaqs(data);
      setFaqs(updated.sort((a, b) => a.ordem - b.ordem));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    faqs,
    loading,
    error,
    refresh: loadFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
    reorderFaqs,
  };
}
