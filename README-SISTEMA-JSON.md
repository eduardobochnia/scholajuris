# Sistema de Carregamento de Dados JSON Estruturado

## Visão Geral

Este sistema foi projetado para carregar e gerenciar grandes volumes de conteúdo jurídico através de arquivos JSON estruturados. Ele suporta diferentes tipos de conteúdo com um sistema de mnemônicos padronizado.

## Estrutura de Pastas

```
public/data/
├── pill/           # Pílulas de conhecimento
├── book/           # Livros jurídicos completos
├── formation/      # Formações completas
├── module/         # Módulos de formação
├── subject/        # Matérias/disciplinas
├── quiz/           # Quizzes e avaliações
├── glossary/       # Termos do glossário
├── case/           # Casos práticos
├── law/            # Textos de lei
└── doctrine/       # Textos doutrinários
```

## Mnemônicos de Identificação

Cada tipo de conteúdo possui um mnemônico único:

- `PILL` - Pílulas de conhecimento
- `BOOK` - Livros jurídicos
- `MODULE` - Módulos de formação
- `FORMATION` - Formações completas
- `SUBJECT` - Matérias/disciplinas
- `QUIZ` - Quizzes/avaliações
- `GLOSSARY` - Termos do glossário
- `CASE` - Casos práticos
- `LAW` - Textos de lei
- `DOCTRINE` - Textos doutrinários

## Estrutura Base dos Arquivos JSON

Todos os arquivos seguem uma estrutura base:

```json
{
  "id": "identificador-unico",
  "mnemonic": "TIPO_CONTEUDO",
  "version": "1.0.0",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "metadata": {
    "title": "Título do conteúdo",
    "description": "Descrição detalhada",
    "tags": ["tag1", "tag2", "tag3"],
    "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED",
    "estimatedTime": 45,
    "author": "Nome do autor",
    "reviewer": "Nome do revisor",
    "status": "DRAFT|REVIEW|PUBLISHED|ARCHIVED"
  }
}
```

## Tipos Específicos de Conteúdo

### Pílulas (PILL)

Conteúdo educacional extenso e detalhado:

```json
{
  "content": {
    "introduction": {
      "overview": "Visão geral do tópico",
      "objectives": ["objetivo1", "objetivo2"],
      "prerequisites": ["prerequisito1"]
    },
    "sections": [
      {
        "id": "secao-1",
        "title": "Título da seção",
        "type": "THEORY|LAW_TEXT|DOCTRINE|JURISPRUDENCE|PRACTICE|CASE_STUDY",
        "content": [], // Rich content format
        "references": ["referência1"],
        "notes": ["nota1"]
      }
    ],
    "conclusion": {
      "summary": "Resumo final",
      "keyPoints": ["ponto1", "ponto2"],
      "nextSteps": ["próximo1"]
    }
  },
  "relationships": {
    "subjectId": "id-da-materia",
    "moduleId": "id-do-modulo",
    "formationId": "id-da-formacao",
    "prerequisites": ["id1", "id2"],
    "dependents": ["id3", "id4"],
    "related": ["id5", "id6"]
  }
}
```

### Livros (BOOK)

Livros jurídicos completos com sinopses detalhadas:

```json
{
  "bibliographic": {
    "isbn": "978-85-309-8756-4",
    "author": "Nome do Autor",
    "publisher": "Editora",
    "publishedYear": 2021,
    "edition": 11,
    "pages": 1248,
    "language": "português",
    "category": "Direito Civil"
  },
  "content": {
    "synopsis": {
      "overview": "Visão geral da obra",
      "mainConcepts": ["conceito1", "conceito2"],
      "practicalImplications": ["implicação1"],
      "criticalAnalysis": "Análise crítica",
      "recommendations": "Recomendações"
    },
    "chapters": [
      {
        "id": "cap-01",
        "number": 1,
        "title": "Título do capítulo",
        "summary": "Resumo do capítulo",
        "keyPoints": ["ponto1", "ponto2"]
      }
    ]
  },
  "analysis": {
    "targetAudience": ["estudantes", "profissionais"],
    "practicalApplications": ["aplicação1"],
    "legislationCovered": ["lei1", "lei2"],
    "jurisprudenceReferences": ["STF - RE 123", "STJ - REsp 456"]
  }
}
```

### Formações (FORMATION)

Cursos completos estruturados:

```json
{
  "structure": {
    "level": "BEGINNER|INTERMEDIATE|ADVANCED",
    "duration": "36 meses",
    "totalModules": 12,
    "totalHours": 720,
    "certification": {
      "name": "Nome da certificação",
      "requirements": ["requisito1", "requisito2"],
      "validity": "Validade da certificação"
    }
  },
  "modules": [
    {
      "id": "modulo-01",
      "order": 1,
      "title": "Título do módulo",
      "description": "Descrição do módulo",
      "duration": "3 meses",
      "subjects": ["id-materia-1", "id-materia-2"]
    }
  ],
  "pricing": {
    "currency": "BRL",
    "amount": 8400,
    "installments": {
      "count": 36,
      "amount": 233.33
    }
  }
}
```

## Como Usar o Sistema

### 1. Carregamento Básico

```typescript
import { dataLoader } from '@/lib/dataLoader';

// Carregar todas as pílulas
const pills = await dataLoader.loadPills();

// Carregar todos os livros
const books = await dataLoader.loadBooks();

// Carregar conteúdo por ID
const content = await dataLoader.loadContentById('id-do-conteudo');
```

### 2. Busca Avançada

```typescript
import { contentManager } from '@/lib/contentManager';

// Busca com relevância
const results = await contentManager.searchWithRelevance(
  'personalidade jurídica',
  {
    type: 'PILL',
    difficulty: 'BEGINNER',
    tags: ['direito civil']
  }
);

// Recomendações baseadas em histórico
const recommendations = await contentManager.getRecommendations(
  ['id1', 'id2', 'id3'], // histórico do usuário
  10 // limite de resultados
);
```

### 3. APIs REST

```bash
# Busca de conteúdo
GET /api/content/search?q=personalidade&type=PILL&difficulty=BEGINNER

# Recomendações
POST /api/content/recommendations
{
  "userHistory": ["id1", "id2"],
  "limit": 10
}

# Estatísticas
GET /api/content/stats
```

## Criando Novos Conteúdos

### 1. Escolha o Tipo e Pasta

Determine o tipo de conteúdo e coloque na pasta correspondente em `public/data/`.

### 2. Nomeação de Arquivos

Use kebab-case para nomes de arquivos:
- `direito-civil-personalidade-juridica.json`
- `manual-direito-civil-tartuce.json`
- `formacao-direito-civil-completo.json`

### 3. Estrutura Obrigatória

Sempre inclua:
- `id` único
- `mnemonic` correto
- `version`
- `createdAt` e `updatedAt`
- `metadata` completo

### 4. Conteúdo Rico

Para pílulas, use o formato de conteúdo rico:

```json
{
  "type": "paragraph",
  "text": "Texto do parágrafo"
},
{
  "type": "heading",
  "level": 2,
  "text": "Título da seção"
},
{
  "type": "list",
  "ordered": false,
  "items": ["item1", "item2"]
},
{
  "type": "quote",
  "text": "Citação",
  "author": "Autor da citação"
}
```

## Vantagens do Sistema

1. **Escalabilidade**: Suporta milhares de conteúdos
2. **Flexibilidade**: Diferentes tipos de conteúdo
3. **Performance**: Cache inteligente
4. **Busca Avançada**: Relevância e filtros
5. **Relacionamentos**: Conexões entre conteúdos
6. **Versionamento**: Controle de versões
7. **Metadados Ricos**: Informações detalhadas
8. **Padronização**: Estrutura consistente

## Exemplos de Uso

### Pílula Extensa de Direito Civil

Veja o arquivo `public/data/pill/direito-civil-personalidade-juridica.json` como exemplo de uma pílula completa com:
- Introdução detalhada
- Múltiplas seções (teoria, lei, doutrina, jurisprudência, casos práticos)
- Conclusão e próximos passos
- Relacionamentos com outros conteúdos
- Exercícios de avaliação

### Livro Jurídico Completo

Veja o arquivo `public/data/book/manual-direito-civil-tartuce.json` como exemplo de um livro com:
- Informações bibliográficas completas
- Sinopse detalhada
- Análise crítica
- Capítulos estruturados
- Métricas de avaliação

### Formação Estruturada

Veja o arquivo `public/data/formation/formacao-direito-civil-completo.json` como exemplo de uma formação com:
- Estrutura de 12 módulos
- Certificação profissional
- Preços e parcelamento
- Requisitos técnicos

Este sistema permite criar um ecossistema educacional completo e escalável para o ensino jurídico!