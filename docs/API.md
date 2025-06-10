# Documentação da API

## Autenticação

Todas as requisições à API devem incluir um token JWT no header `Authorization`:

```
Authorization: Bearer <token>
```

## Endpoints

### Usuários

#### POST /api/auth/register
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string"
}
```

#### POST /api/auth/login
Autentica um usuário.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string"
}
```

### Progresso

#### POST /api/user/progress
Registra o progresso do usuário em uma pílula.

**Request Body:**
```json
{
  "pillId": "string",
  "score": number
}
```

**Response:**
```json
{
  "id": "string",
  "userId": "string",
  "pillId": "string",
  "score": number,
  "completedAt": "string"
}
```

#### GET /api/user/progress
Retorna o progresso do usuário.

**Response:**
```json
{
  "progress": [
    {
      "id": "string",
      "pillId": "string",
      "score": number,
      "completedAt": "string"
    }
  ]
}
```

### Conquistas

#### GET /api/user/achievements
Retorna as conquistas do usuário.

**Response:**
```json
{
  "achievements": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "icon": "string",
      "unlockedAt": "string"
    }
  ]
}
```

### Módulos

#### GET /api/modules
Retorna a lista de módulos.

**Response:**
```json
{
  "modules": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "order": number,
      "pills": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "order": number
        }
      ]
    }
  ]
}
```

#### GET /api/modules/:id
Retorna detalhes de um módulo específico.

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "order": number,
  "pills": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "order": number,
      "content": "string",
      "quiz": {
        "questions": [
          {
            "id": "string",
            "text": "string",
            "options": [
              {
                "id": "string",
                "text": "string",
                "isCorrect": boolean
              }
            ]
          }
        ]
      }
    }
  ]
}
```

### Glossário

#### GET /api/glossary
Retorna a lista de termos do glossário.

**Query Parameters:**
- `search`: string (opcional) - Termo de busca
- `letter`: string (opcional) - Filtro por letra inicial

**Response:**
```json
{
  "terms": [
    {
      "id": "string",
      "term": "string",
      "definition": "string",
      "examples": ["string"]
    }
  ]
}
```

## Códigos de Erro

- `400` - Requisição inválida
- `401` - Não autorizado
- `403` - Acesso proibido
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## Rate Limiting

A API implementa rate limiting para prevenir abusos:
- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

## Versão

A versão atual da API é v1. Todas as URLs devem incluir o prefixo `/api/v1/`. 