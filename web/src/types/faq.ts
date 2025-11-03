// Types para o sistema de FAQ

export interface Faq {
  id: string;
  pergunta: string;
  resposta: string;
  ordem: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFaqDTO {
  pergunta: string;
  resposta: string;
  ordem?: number; // Opcional - será calculado automaticamente se não fornecido
}

export interface UpdateFaqDTO {
  pergunta?: string;
  resposta?: string;
  ordem?: number;
}

export interface ReorderItem {
  id: string;
  ordem: number;
}

export interface ReorderFaqsDTO {
  faqs: ReorderItem[];
}
