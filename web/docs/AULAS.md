# Sistema de Aulas - Documentação

## Visão Geral

O sistema de aulas permite a criação e gerenciamento de conteúdo educacional na plataforma. Cada aula pertence a um módulo e possui um sistema de liberação baseado em dias após o cadastro do usuário.

## Tipos de Aula

### 1. 📄 Texto (MARKDOWN)
**Descrição**: Aulas baseadas em texto com suporte para imagens e formatação rica.

**Características**:
- Editor Markdown com toolbar visual
- Suporte para formatação: negrito, itálico, listas, títulos
- Inserção de imagens via URL
- Preview em tempo real
- Ideal para: conteúdo teórico, explicações detalhadas, tutoriais

**Formato do Conteúdo**:
```markdown
# Título Principal

**Texto em negrito** e *texto em itálico*

## Seção

- Item de lista
- Outro item

![Descrição da imagem](https://url-da-imagem.com/image.jpg)
```

### 2. 📹 Vídeo (VIDEO)
**Descrição**: Aulas baseadas em vídeo de plataformas externas.

**Características**:
- Suporte para YouTube, Vimeo e outras plataformas
- Armazena URL do vídeo
- Preview da URL fornecida
- Ideal para: demonstrações práticas, meditações guiadas, palestras

**Formato do Conteúdo**:
```
https://www.youtube.com/watch?v=VIDEO_ID
```

### 3. ✏️ Exercício (EXERCICIO)
**Descrição**: Aulas interativas com perguntas de múltipla escolha.

**Características**:
- Múltiplas perguntas por aula
- 4 opções de resposta (A, B, C, D)
- Marcação de resposta correta
- Formato JSON estruturado
- Ideal para: avaliações, fixação de conteúdo, testes de conhecimento

**Formato do Conteúdo** (JSON):
```json
[
  {
    "pergunta": "Qual é a capital do Brasil?",
    "opcoes": [
      "São Paulo",
      "Rio de Janeiro",
      "Brasília",
      "Salvador"
    ],
    "respostaCorreta": 2
  }
]
```

## Sistema de Liberação por Dias

### Conceito
As aulas são liberadas progressivamente baseado no número de dias desde o cadastro do usuário.

### Como Funciona
- **Dia 1**: Aulas com `diaDisponivel = 1`
- **Dia 2**: Aulas com `diaDisponivel = 2`
- **Dia N**: Aulas com `diaDisponivel = N`

### Exemplo Prático
```
Usuário cadastrado em: 01/01/2024

Dia 1 (01/01): Aulas 1-3 do Módulo 1
Dia 2 (02/01): Aulas 4-5 do Módulo 1
Dia 7 (07/01): Aulas 1-2 do Módulo 2
```

### Estratégias de Liberação

#### Estratégia 1: Linear Progressiva
```
Módulo 1:
  - Aula 1: Dia 1
  - Aula 2: Dia 2
  - Aula 3: Dia 3

Módulo 2:
  - Aula 1: Dia 4
  - Aula 2: Dia 5
```

#### Estratégia 2: Blocos Semanais
```
Semana 1 (Dias 1-7):
  - Módulo 1: Todas as aulas

Semana 2 (Dias 8-14):
  - Módulo 2: Todas as aulas
```

#### Estratégia 3: Mista
```
Módulo Introdução:
  - Aulas 1-3: Dia 1 (conteúdo básico)
  
Módulo Prática:
  - Aula 1: Dia 2
  - Exercício: Dia 3
  - Aula 2: Dia 5
```

## Componentes

### CreateAulaModal
Modal principal para criação de aulas com seleção de tipo e configuração de liberação.

**Props**:
- `isOpen`: boolean - Controla visibilidade
- `onClose`: () => void - Callback ao fechar
- `onSubmit`: (data: CreateAulaDTO) => Promise<void> - Callback ao criar
- `modulos`: Modulo[] - Lista de módulos disponíveis
- `selectedModuloId?`: string - Módulo pré-selecionado

### VideoAulaForm
Formulário específico para aulas de vídeo.

**Features**:
- Input de URL com validação
- Preview da URL fornecida
- Suporte para múltiplas plataformas

### TextoAulaForm
Editor Markdown para aulas de texto.

**Features**:
- Toolbar com formatação visual
- Preview em tempo real
- Atalhos para inserção de markdown
- Suporte para imagens

### ExercicioAulaForm
Criador de exercícios interativo.

**Features**:
- Adicionar/remover exercícios
- 4 opções por pergunta
- Seleção visual de resposta correta
- Preview do JSON gerado

## API Routes

### POST /api/aulas
Cria uma nova aula.

**Body**:
```typescript
{
  titulo: string;
  conteudo?: string;
  tipo: "VIDEO" | "EXERCICIO" | "MARKDOWN";
  diaDisponivel: number;
  moduloId: string;
  ordem?: number; // Opcional - calculado automaticamente
}
```

**Response**: `201 Created`
```typescript
{
  id: string;
  titulo: string;
  conteudo: string | null;
  tipo: TipoAula;
  ordem: number;
  diaDisponivel: number;
  moduloId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### GET /api/aulas
Lista todas as aulas.

**Query Params**:
- `moduloId?: string` - Filtrar por módulo

**Response**: `200 OK`
```typescript
Array<Aula>
```

### GET /api/aulas/available
Lista aulas disponíveis para o usuário baseado no dia de cadastro.

**Response**: `200 OK`
```typescript
Array<Aula>
```

### GET /api/aulas/:id
Busca uma aula específica.

**Response**: `200 OK`
```typescript
Aula
```

### PUT /api/aulas/:id
Atualiza uma aula.

**Body**: Mesmo formato do POST (todos campos opcionais)

**Response**: `200 OK`

### DELETE /api/aulas/:id
Remove uma aula.

**Response**: `204 No Content`

## Schemas de Validação

```typescript
// createAulaSchema
{
  titulo: string (min: 3),
  conteudo: string (opcional),
  tipo: TipoAula (padrão: MARKDOWN),
  ordem: number (positivo),
  diaDisponivel: number (min: 1),
  moduloId: string (min: 24)
}

// updateAulaSchema
{
  titulo?: string (min: 3),
  conteudo?: string,
  tipo?: TipoAula,
  ordem?: number (positivo),
  diaDisponivel?: number (min: 1)
}
```

## Boas Práticas

### 1. Organização de Conteúdo
- ✅ Agrupe aulas relacionadas no mesmo módulo
- ✅ Use ordem sequencial lógica
- ✅ Planeje liberação considerando tempo de absorção

### 2. Dias de Liberação
- ✅ Comece sempre com `diaDisponivel = 1` para conteúdo introdutório
- ✅ Espaçe aulas complexas (2-3 dias entre elas)
- ✅ Agrupe exercícios após conteúdo teórico

### 3. Tipos de Aula
- ✅ Use **Texto** para conceitos e teoria
- ✅ Use **Vídeo** para demonstrações práticas
- ✅ Use **Exercício** para fixação e avaliação

### 4. Conteúdo
- ✅ Mantenha aulas objetivas e focadas
- ✅ Use imagens para ilustrar conceitos
- ✅ Crie exercícios com feedback claro

## Exemplo Completo de Módulo

```javascript
Módulo: "Introdução à Meditação"

Aula 1 - Tipo: MARKDOWN - Dia 1
  Título: "O que é Meditação?"
  Conteúdo: Texto explicativo com imagens

Aula 2 - Tipo: VIDEO - Dia 2
  Título: "Primeira Meditação Guiada"
  Conteúdo: https://youtube.com/watch?v=...

Aula 3 - Tipo: EXERCICIO - Dia 3
  Título: "Quiz: Conceitos Básicos"
  Conteúdo: [{ pergunta: "...", opcoes: [...], respostaCorreta: 0 }]

Aula 4 - Tipo: MARKDOWN - Dia 5
  Título: "Técnicas Avançadas"
  Conteúdo: Texto com técnicas detalhadas
```

## Hooks Disponíveis

### useAulas(moduloId?)
```typescript
const {
  aulas,
  loading,
  error,
  createAula,
  updateAula,
  deleteAula,
  refresh
} = useAulas(moduloId);
```

### useAvailableAulas()
```typescript
const {
  aulas,
  loading,
  error
} = useAvailableAulas();
```

## Fluxo de Trabalho Recomendado

1. **Planejamento**
   - Defina os módulos do curso
   - Liste as aulas de cada módulo
   - Planeje os dias de liberação

2. **Criação**
   - Crie os módulos primeiro
   - Adicione aulas em ordem lógica
   - Configure dias de liberação

3. **Revisão**
   - Teste o fluxo completo
   - Verifique conteúdo e formatação
   - Ajuste dias de liberação se necessário

4. **Publicação**
   - Revise todas as aulas
   - Teste com usuário de teste
   - Monitore engajamento
