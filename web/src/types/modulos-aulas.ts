// Types para o sistema de módulos e aulas

export enum TipoAula {
  VIDEO = "VIDEO",
  EXERCICIO = "EXERCICIO",
  MARKDOWN = "MARKDOWN"
}

export interface Modulo {
  id: string;
  titulo: string;
  descricao?: string;
  ordem: number;
  aulas?: Aula[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Aula {
  id: string;
  titulo: string;
  conteudo?: string;
  tipo: TipoAula;
  ordem: number;
  diaDisponivel: number;
  moduloId: string;
  modulo?: Modulo;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModuloDTO {
  titulo: string;
  descricao?: string;
  ordem?: number; // Opcional - será calculado automaticamente se não fornecido
}

export interface UpdateModuloDTO {
  titulo?: string;
  descricao?: string;
  ordem?: number;
}

export interface CreateAulaDTO {
  titulo: string;
  conteudo?: string;
  tipo?: TipoAula;
  ordem?: number; // Opcional - será calculado automaticamente se não fornecido
  diaDisponivel: number;
  moduloId: string;
}

export interface UpdateAulaDTO {
  titulo?: string;
  conteudo?: string;
  tipo?: TipoAula;
  ordem?: number;
  diaDisponivel?: number;
}

export interface ReorderItem {
  id: string;
  ordem: number;
}

export interface ReorderModulosDTO {
  modulos: ReorderItem[];
}

export interface ReorderAulasDTO {
  aulas: ReorderItem[];
}

// Helper para mapear TipoAula para labels
export const TipoAulaLabels: Record<TipoAula, string> = {
  [TipoAula.VIDEO]: "Vídeo",
  [TipoAula.EXERCICIO]: "Exercício",
  [TipoAula.MARKDOWN]: "Conteúdo"
};

// Helper para mapear TipoAula para ícones
export const TipoAulaIcons: Record<TipoAula, string> = {
  [TipoAula.VIDEO]: "📹",
  [TipoAula.EXERCICIO]: "✏️",
  [TipoAula.MARKDOWN]: "📄"
};
