// API Client para FAQ

import { Faq, CreateFaqDTO, UpdateFaqDTO, ReorderFaqsDTO } from "@/types/faq";

const API_BASE = "/api";

// ===== FAQ =====

export async function getAllFaqs(): Promise<Faq[]> {
  const response = await fetch(`${API_BASE}/faq`);
  if (!response.ok) throw new Error("Erro ao buscar FAQs");
  return response.json();
}

export async function getFaqById(id: string): Promise<Faq> {
  const response = await fetch(`${API_BASE}/faq/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar FAQ");
  return response.json();
}

export async function createFaq(data: CreateFaqDTO): Promise<Faq> {
  const response = await fetch(`${API_BASE}/faq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar FAQ");
  }
  return response.json();
}

export async function updateFaq(id: string, data: UpdateFaqDTO): Promise<Faq> {
  const response = await fetch(`${API_BASE}/faq/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar FAQ");
  return response.json();
}

export async function deleteFaq(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/faq/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar FAQ");
}

export async function reorderFaqs(data: ReorderFaqsDTO): Promise<Faq[]> {
  const response = await fetch(`${API_BASE}/faq/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao reordenar FAQs");
  return response.json();
}
