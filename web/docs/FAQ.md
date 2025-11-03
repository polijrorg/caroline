# Sistema de FAQ - Documentação

## Visão Geral

Sistema completo de perguntas frequentes (FAQ) com ordenação customizada, interface de administração e página pública para usuários.

## Schema do Banco de Dados

```prisma
model Faq {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  pergunta  String
  resposta  String
  ordem     Int      // Ordem de exibição (único)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([ordem])
}
```

## API Endpoints

### GET /api/faq
Lista todas as FAQs ordenadas por `ordem`.

**Permissões**: Público (todos podem acessar)

**Resposta**:
```json
[
  {
    "id": "...",
    "pergunta": "Como funciona o sistema?",
    "resposta": "O sistema funciona...",
    "ordem": 1,
    "createdAt": "2025-11-03T...",
    "updatedAt": "2025-11-03T..."
  }
]
```

### POST /api/faq
Cria uma nova FAQ.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "pergunta": "Como faço para começar?",
  "resposta": "Para começar, você deve...",
  "ordem": 3  // Opcional - calculado automaticamente se não fornecido
}
```

### GET /api/faq/[id]
Busca uma FAQ específica.

**Permissões**: Público

### PUT /api/faq/[id]
Atualiza uma FAQ.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "pergunta": "Pergunta atualizada",
  "resposta": "Resposta atualizada",
  "ordem": 2
}
```

### DELETE /api/faq/[id]
Remove uma FAQ.

**Permissões**: ADMIN, SUPER_ADMIN

### PUT /api/faq/reorder
Reordena múltiplas FAQs de uma vez.

**Permissões**: ADMIN, SUPER_ADMIN

**Body**:
```json
{
  "faqs": [
    { "id": "faq1_id", "ordem": 1 },
    { "id": "faq2_id", "ordem": 2 },
    { "id": "faq3_id", "ordem": 3 }
  ]
}
```

## Páginas

### Admin: `/admin/dashboard/faq`
Interface administrativa para gerenciar FAQs:
- ✅ Listar todas as FAQs
- ✅ Criar nova FAQ
- ✅ Editar FAQ existente
- ✅ Excluir FAQ
- 🚧 Drag-and-drop para reordenar (futuro)

### Usuário: `/faq`
Página pública com accordion para visualizar FAQs:
- Listagem ordenada
- Expandir/colapsar perguntas
- Visual limpo e responsivo
- CTA para contato

## Frontend - Componentes

### Hook: `useFaqs()`
```tsx
import { useFaqs } from "@/hooks/use-faq";

const { faqs, loading, error, createFaq, updateFaq, deleteFaq, reorderFaqs } = useFaqs();
```

### Modais
- `CreateFaqModal` - Criar nova FAQ
- `EditFaqModal` - Editar FAQ existente

### Páginas
- `/admin/dashboard/faq/page.tsx` - Admin
- `/(user-protected)/faq/page.tsx` - Usuário

## Types TypeScript

```typescript
interface Faq {
  id: string;
  pergunta: string;
  resposta: string;
  ordem: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateFaqDTO {
  pergunta: string;
  resposta: string;
  ordem?: number; // Opcional
}

interface UpdateFaqDTO {
  pergunta?: string;
  resposta?: string;
  ordem?: number;
}
```

## Exemplo de Uso

### Criar FAQ via API
```typescript
import { createFaq } from "@/lib/api/faq";

const novaFaq = await createFaq({
  pergunta: "Como funciona?",
  resposta: "Funciona de tal forma...",
  // ordem será calculada automaticamente
});
```

### Usar no Componente
```tsx
"use client";
import { useFaqs } from "@/hooks/use-faq";

function MeuComponente() {
  const { faqs, loading, createFaq } = useFaqs();

  const handleCreate = async () => {
    await createFaq({
      pergunta: "Nova pergunta",
      resposta: "Nova resposta"
    });
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {faqs.map(faq => (
        <div key={faq.id}>
          <h3>{faq.ordem}. {faq.pergunta}</h3>
          <p>{faq.resposta}</p>
        </div>
      ))}
    </div>
  );
}
```

## Funcionalidades Implementadas

- ✅ CRUD completo de FAQs
- ✅ Ordenação customizada
- ✅ Auto-incremento de ordem
- ✅ Endpoint de reordenação em lote
- ✅ Interface admin completa
- ✅ Página pública com accordion
- ✅ Validação Zod
- ✅ Proteção de rotas (admin vs público)
- ✅ Types TypeScript
- ✅ React Hooks
- ✅ Modais de criar/editar

## Próximos Passos

1. 🚧 Implementar drag-and-drop para reordenar
2. 🚧 Busca/filtro de FAQs
3. 🚧 Categorias de FAQs
4. 🚧 Analytics (FAQs mais visualizadas)
5. 🚧 Export/Import de FAQs

## Migração do Banco

Após as mudanças no schema, execute:

```bash
pnpm prisma generate
pnpm prisma db push
```

## Arquivos Criados

- `web/prisma/schema.prisma` (model Faq adicionado)
- `web/src/app/(backend)/schemas/faq.schema.ts` (atualizado)
- `web/src/app/(backend)/services/faq/faq.ts` (atualizado)
- `web/src/app/(backend)/api/faq/route.ts` (atualizado)
- `web/src/app/(backend)/api/faq/[id]/route.ts` (atualizado)
- `web/src/app/(backend)/api/faq/reorder/route.ts` ✨ NOVO
- `web/src/types/faq.ts` ✨ NOVO
- `web/src/lib/api/faq.ts` ✨ NOVO
- `web/src/hooks/use-faq.ts` ✨ NOVO
- `web/src/app/(frontend)/admin/dashboard/faq/components/CreateFaqModal.tsx` ✨ NOVO
- `web/src/app/(frontend)/admin/dashboard/faq/components/EditFaqModal.tsx` ✨ NOVO
- `web/src/app/(frontend)/admin/dashboard/faq/page.tsx` ✨ NOVO
- `web/src/app/(frontend)/(user-protected)/faq/page.tsx` ✨ NOVO
