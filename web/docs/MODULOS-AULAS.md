# Sistema de Módulos e Aulas - Documentação

## Visão Geral

Sistema de gerenciamento de aulas sequenciais com liberação progressiva baseada na data de cadastro do usuário.

### Características Principais

- **Módulos Sequenciais**: Módulos organizados em ordem específica
- **Aulas com Tipos**: Vídeo, Exercício ou Markdown
- **Liberação Progressiva**: Aulas são liberadas dia a dia desde o cadastro
- **Intervalo entre Módulos**: 24h após o fim de um módulo para liberar o próximo

## Schema do Banco de Dados

### Modulo
```prisma
model Modulo {
  id        String   
  titulo    String
  descricao String?
  ordem     Int      // Ordem sequencial (único)
  aulas     Aula[]
  createdAt DateTime
  updatedAt DateTime
}
```

### Aula
```prisma
enum TipoAula {
  VIDEO
  EXERCICIO
  MARKDOWN
}

model Aula {
  id             String
  titulo         String
  conteudo       String?
  tipo           TipoAula     // Tipo da aula
  ordem          Int          // Ordem dentro do módulo
  diaDisponivel  Int          // Dia de disponibilização (desde cadastro)
  moduloId       String
  modulo         Modulo
  createdAt      DateTime
  updatedAt      DateTime
}
```

## API Endpoints

### Módulos

#### GET /api/modulos
Lista todos os módulos em ordem sequencial com suas aulas.

**Permissões**: ADMIN, SUPER_ADMIN

**Resposta**:
```json
[
  {
    "id": "...",
    "titulo": "Módulo 1 - Introdução",
    "descricao": "Módulo inicial",
    "ordem": 1,
    "aulas": [...]
  }
]
```

#### POST /api/modulos
Cria um novo módulo.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "titulo": "Novo Módulo",
  "descricao": "Descrição opcional",
  "ordem": 3  // Opcional - se não fornecido, usa próximo disponível
}
```

#### PUT /api/modulos/reorder
Reordena múltiplos módulos de uma vez.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "modulos": [
    { "id": "modulo1_id", "ordem": 1 },
    { "id": "modulo2_id", "ordem": 2 },
    { "id": "modulo3_id", "ordem": 3 }
  ]
}
```

#### GET /api/modulos/[id]
Busca um módulo específico.

#### PUT /api/modulos/[id]
Atualiza um módulo.

**Body**:
```json
{
  "titulo": "Título Atualizado",
  "descricao": "Nova descrição",
  "ordem": 2
}
```

#### DELETE /api/modulos/[id]
Remove um módulo (e suas aulas em cascata).

---

### Aulas

#### GET /api/aulas
Lista todas as aulas ordenadas por módulo e ordem.

**Permissões**: ADMIN, SUPER_ADMIN

#### POST /api/aulas
Cria uma nova aula.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "titulo": "Aula 1 - Introdução",
  "conteudo": "Conteúdo da aula...",
  "tipo": "VIDEO",  // VIDEO, EXERCICIO ou MARKDOWN
  "ordem": 1,       // Opcional - se não fornecido, usa próximo no módulo
  "diaDisponivel": 1,  // Dia em que fica disponível (1 = primeiro dia)
  "moduloId": "id_do_modulo"
}
```

#### GET /api/aulas/available
Lista todas as aulas disponíveis para o usuário autenticado.

**Permissões**: Qualquer usuário autenticado

**Lógica**:
- Calcula dias desde o cadastro do usuário
- Retorna apenas aulas onde `diaDisponivel <= diasDesdeRegistro`

**Resposta**:
```json
[
  {
    "id": "...",
    "titulo": "Aula disponível",
    "tipo": "VIDEO",
    "diaDisponivel": 1,
    "modulo": {
      "titulo": "Módulo 1",
      "ordem": 1
    }
  }
]
```

#### PUT /api/aulas/reorder
Reordena múltiplas aulas.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "aulas": [
    { "id": "aula1_id", "ordem": 1 },
    { "id": "aula2_id", "ordem": 2 }
  ]
}
```

#### GET /api/aulas/[id]
Busca uma aula específica.

#### PUT /api/aulas/[id]
Atualiza uma aula.

**Body**:
```json
{
  "titulo": "Novo título",
  "conteudo": "Novo conteúdo",
  "tipo": "EXERCICIO",
  "ordem": 2,
  "diaDisponivel": 3
}
```

#### DELETE /api/aulas/[id]
Remove uma aula.

---

## Tipos TypeScript

### TipoAula
```typescript
enum TipoAula {
    VIDEO = "VIDEO",
    EXERCICIO = "EXERCICIO",
    MARKDOWN = "MARKDOWN"
}
```

### CreateModuloInput
```typescript
{
  titulo: string;
  descricao?: string;
  ordem: number;  // Positivo
}
```

### CreateAulaInput
```typescript
{
  titulo: string;  // Min 3 caracteres
  conteudo?: string;
  tipo?: TipoAula;  // Default: MARKDOWN
  ordem: number;    // Positivo
  diaDisponivel: number;  // Min 1
  moduloId: string;  // 24 caracteres
}
```

---

## Exemplo de Fluxo de Trabalho

### 1. Criar Módulos
```javascript
// Módulo 1
POST /api/modulos
{
  "titulo": "Módulo 1 - Fundamentos",
  "descricao": "Conceitos básicos"
  // ordem será 1 automaticamente
}

// Módulo 2
POST /api/modulos
{
  "titulo": "Módulo 2 - Intermediário",
  // ordem será 2 automaticamente
}
```

### 2. Criar Aulas no Módulo 1
```javascript
// Aula 1 - Dia 1
POST /api/aulas
{
  "titulo": "Bem-vindo",
  "tipo": "VIDEO",
  "diaDisponivel": 1,
  "moduloId": "modulo1_id"
  // ordem será 1 automaticamente
}

// Aula 2 - Dia 2
POST /api/aulas
{
  "titulo": "Exercício Prático",
  "tipo": "EXERCICIO",
  "diaDisponivel": 2,
  "moduloId": "modulo1_id"
  // ordem será 2 automaticamente
}
```

### 3. Usuário Acessa Aulas Disponíveis
```javascript
// Dia 1 após cadastro
GET /api/aulas/available
// Retorna: Aula 1 (diaDisponivel: 1)

// Dia 2 após cadastro
GET /api/aulas/available
// Retorna: Aula 1 e Aula 2 (diaDisponivel: 1 e 2)
```

### 4. Reordenar Módulos
```javascript
PUT /api/modulos/reorder
{
  "modulos": [
    { "id": "modulo2_id", "ordem": 1 },
    { "id": "modulo1_id", "ordem": 2 }
  ]
}
```

---

## Funções de Serviço Úteis

### Módulos
- `getAllModulos()` - Lista todos com aulas ordenadas
- `getNextOrdem()` - Retorna próxima ordem disponível
- `reorderModulos(data)` - Reordena em transação

### Aulas
- `getAllAulas()` - Lista todas ordenadas por módulo/ordem
- `getAulasByModuloId(moduloId)` - Aulas de um módulo específico
- `getNextOrdemInModulo(moduloId)` - Próxima ordem no módulo
- `isAulaAvailable(aulaId, userCreatedAt)` - Verifica se está disponível
- `getAvailableAulasForUser(userCreatedAt)` - Lista aulas disponíveis

---

## Considerações de Design

### Liberação de Aulas
- O campo `diaDisponivel` é calculado desde a data de `createdAt` do usuário
- Exemplo: `diaDisponivel: 5` = disponível 5 dias após cadastro

### Intervalo entre Módulos
- Implementar lógica adicional para 24h de intervalo entre módulos
- Sugestão: última aula de um módulo + 1 dia = primeira aula do próximo

### Ordenação
- Módulos têm `ordem` única global
- Aulas têm `ordem` única dentro de cada módulo
- Sistema de drag-and-drop pode usar endpoint `/reorder`

---

## Próximos Passos

1. ✅ Schema do banco definido
2. ✅ Schemas de validação criados
3. ✅ Serviços de backend implementados
4. ✅ APIs REST configuradas
5. ⏳ Componentes de admin para criar/editar
6. ⏳ Interface de drag-and-drop para reordenar
7. ⏳ Lógica de intervalo 24h entre módulos
8. ⏳ Dashboard do aluno com aulas disponíveis

---

## Migração do Banco

Após as mudanças no schema, execute:

```bash
pnpm prisma generate
pnpm prisma db push  # ou prisma migrate dev
```
