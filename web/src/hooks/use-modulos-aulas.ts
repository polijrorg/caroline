"use client";

import { useState, useEffect } from "react";
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

// Hook para gerenciar módulos
export function useModulos() {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadModulos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllModulos();
      setModulos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModulos();
  }, []);

  const createModulo = async (data: CreateModuloDTO) => {
    try {
      const newModulo = await api.createModulo(data);
      setModulos((prev) => [...prev, newModulo].sort((a, b) => a.ordem - b.ordem));
      return newModulo;
    } catch (err) {
      throw err;
    }
  };

  const updateModulo = async (id: string, data: UpdateModuloDTO) => {
    try {
      const updated = await api.updateModulo(id, data);
      setModulos((prev) =>
        prev.map((m) => (m.id === id ? updated : m)).sort((a, b) => a.ordem - b.ordem)
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteModulo = async (id: string) => {
    try {
      await api.deleteModulo(id);
      setModulos((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const reorderModulos = async (data: ReorderModulosDTO) => {
    try {
      const updated = await api.reorderModulos(data);
      setModulos(updated.sort((a, b) => a.ordem - b.ordem));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return {
    modulos,
    loading,
    error,
    refresh: loadModulos,
    createModulo,
    updateModulo,
    deleteModulo,
    reorderModulos,
  };
}

// Hook para gerenciar aulas
export function useAulas(moduloId?: string) {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAulas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllAulas();
      const filtered = moduloId 
        ? data.filter((a) => a.moduloId === moduloId)
        : data;
      setAulas(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAulas();
  }, [moduloId]);

  const createAula = async (data: CreateAulaDTO) => {
    try {
      const newAula = await api.createAula(data);
      setAulas((prev) => [...prev, newAula].sort((a, b) => a.ordem - b.ordem));
      return newAula;
    } catch (err) {
      throw err;
    }
  };

  const updateAula = async (id: string, data: UpdateAulaDTO) => {
    try {
      const updated = await api.updateAula(id, data);
      setAulas((prev) =>
        prev.map((a) => (a.id === id ? updated : a)).sort((a, b) => a.ordem - b.ordem)
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteAula = async (id: string) => {
    try {
      await api.deleteAula(id);
      setAulas((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const reorderAulas = async (data: ReorderAulasDTO) => {
    try {
      const updated = await api.reorderAulas(data);
      const filtered = moduloId
        ? updated.filter((a) => a.moduloId === moduloId)
        : updated;
      setAulas(filtered.sort((a, b) => a.ordem - b.ordem));
      return filtered;
    } catch (err) {
      throw err;
    }
  };

  return {
    aulas,
    loading,
    error,
    refresh: loadAulas,
    createAula,
    updateAula,
    deleteAula,
    reorderAulas,
  };
}

// Hook para aulas disponíveis (usuário comum)
export function useAvailableAulas() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAulas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAvailableAulas();
      setAulas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAulas();
  }, []);

  return {
    aulas,
    loading,
    error,
    refresh: loadAulas,
  };
}
