"use client";

import useSWR from "swr";
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
import * as api from "@/lib/api/modulos-aulas";

// Hook para gerenciar módulos com SWR
export function useModulos() {
  const {
    data: modulos = [],
    error,
    isLoading: loading,
    mutate,
  } = useSWR<Modulo[]>(
    "/api/modulos",
    api.getAllModulos,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos de cache
    }
  );

  const createModulo = async (data: CreateModuloDTO) => {
    try {
      const newModulo = await api.createModulo(data);
      mutate([...modulos, newModulo].sort((a, b) => a.ordem - b.ordem), false);
      return newModulo;
    } catch (err) {
      throw err;
    }
  };

  const updateModulo = async (id: string, data: UpdateModuloDTO) => {
    try {
      const updated = await api.updateModulo(id, data);
      mutate(
        modulos.map((m) => (m.id === id ? updated : m)).sort((a, b) => a.ordem - b.ordem),
        false
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteModulo = async (id: string) => {
    try {
      await api.deleteModulo(id);
      mutate(modulos.filter((m) => m.id !== id), false);
    } catch (err) {
      throw err;
    }
  };

  const reorderModulos = async (data: ReorderModulosDTO) => {
    try {
      const updated = await api.reorderModulos(data);
      mutate(updated.sort((a, b) => a.ordem - b.ordem), false);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    modulos,
    loading,
    error: error ? (error instanceof Error ? error.message : "Erro desconhecido") : null,
    refresh: () => mutate(),
    createModulo,
    updateModulo,
    deleteModulo,
    reorderModulos,
  };
}

// Hook para gerenciar aulas com SWR
export function useAulas(moduloId?: string) {
  const key = moduloId ? `/api/aulas?moduloId=${moduloId}` : "/api/aulas";
  
  const {
    data: allAulas = [],
    error,
    isLoading: loading,
    mutate,
  } = useSWR<Aula[]>(
    key,
    api.getAllAulas,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 segundos de cache
    }
  );

  // Filtra aulas por moduloId se fornecido
  const aulas = moduloId 
    ? allAulas.filter((a) => a.moduloId === moduloId)
    : allAulas;

  const createAula = async (data: CreateAulaDTO) => {
    try {
      const newAula = await api.createAula(data);
      mutate([...allAulas, newAula].sort((a, b) => a.ordem - b.ordem), false);
      return newAula;
    } catch (err) {
      throw err;
    }
  };

  const updateAula = async (id: string, data: UpdateAulaDTO) => {
    try {
      const updated = await api.updateAula(id, data);
      mutate(
        allAulas.map((a) => (a.id === id ? updated : a)).sort((a, b) => a.ordem - b.ordem),
        false
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteAula = async (id: string) => {
    try {
      await api.deleteAula(id);
      mutate(allAulas.filter((a) => a.id !== id), false);
    } catch (err) {
      throw err;
    }
  };

  const reorderAulas = async (data: ReorderAulasDTO) => {
    try {
      const updated = await api.reorderAulas(data);
      mutate(updated.sort((a, b) => a.ordem - b.ordem), false);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    aulas,
    loading,
    error: error ? (error instanceof Error ? error.message : "Erro desconhecido") : null,
    refresh: () => mutate(),
    createAula,
    updateAula,
    deleteAula,
    reorderAulas,
  };
}

// Hook para aulas disponíveis (usuário comum) com SWR
export function useAvailableAulas() {
  const {
    data: aulas = [],
    error,
    isLoading: loading,
    mutate,
  } = useSWR<Aula[]>(
    "/api/aulas/available",
    api.getAvailableAulas,
    {
      revalidateOnFocus: true, // Revalida ao focar (pode haver novas aulas disponíveis)
      dedupingInterval: 60000, // 1 minuto de cache
    }
  );

  return {
    aulas,
    loading,
    error: error ? (error instanceof Error ? error.message : "Erro desconhecido") : null,
    refresh: () => mutate(),
  };
}
