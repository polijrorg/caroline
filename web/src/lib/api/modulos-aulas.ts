// API Client para Módulos e Aulas

import { 
  Modulo, 
  Aula, 
  CreateModuloDTO, 
  UpdateModuloDTO, 
  CreateAulaDTO, 
  UpdateAulaDTO,
  ReorderModulosDTO,
  ReorderAulasDTO
} from "@/types/modulos-aulas";

const API_BASE = "/api";

// ===== MÓDULOS =====

export async function getAllModulos(): Promise<Modulo[]> {
  const response = await fetch(`${API_BASE}/modulos`);
  if (!response.ok) throw new Error("Erro ao buscar módulos");
  return response.json();
}

export async function getModuloById(id: string): Promise<Modulo> {
  const response = await fetch(`${API_BASE}/modulos/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar módulo");
  return response.json();
}

export async function createModulo(data: CreateModuloDTO): Promise<Modulo> {
  const response = await fetch(`${API_BASE}/modulos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar módulo");
  }
  return response.json();
}

export async function updateModulo(id: string, data: UpdateModuloDTO): Promise<Modulo> {
  const response = await fetch(`${API_BASE}/modulos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar módulo");
  return response.json();
}

export async function deleteModulo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/modulos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar módulo");
}

export async function reorderModulos(data: ReorderModulosDTO): Promise<Modulo[]> {
  const response = await fetch(`${API_BASE}/modulos/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao reordenar módulos");
  return response.json();
}

// ===== AULAS =====

export async function getAllAulas(): Promise<Aula[]> {
  const response = await fetch(`${API_BASE}/aulas`);
  if (!response.ok) throw new Error("Erro ao buscar aulas");
  return response.json();
}

export async function getAulaById(id: string): Promise<Aula> {
  const response = await fetch(`${API_BASE}/aulas/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar aula");
  return response.json();
}

export async function getAvailableAulas(): Promise<Aula[]> {
  const response = await fetch(`${API_BASE}/aulas/available`);
  if (!response.ok) throw new Error("Erro ao buscar aulas disponíveis");
  return response.json();
}

export async function createAula(data: CreateAulaDTO): Promise<Aula> {
  const response = await fetch(`${API_BASE}/aulas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar aula");
  }
  return response.json();
}

export async function updateAula(id: string, data: UpdateAulaDTO): Promise<Aula> {
  const response = await fetch(`${API_BASE}/aulas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar aula");
  return response.json();
}

export async function deleteAula(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/aulas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar aula");
}

export async function reorderAulas(data: ReorderAulasDTO): Promise<Aula[]> {
  const response = await fetch(`${API_BASE}/aulas/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao reordenar aulas");
  return response.json();
}
