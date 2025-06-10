# Lista de Tarefas

## Implementação de Páginas
- [x] Landing Page
- [x] Página de Login/Registro
- [x] Página de Listagem de Módulos
- [x] Página de Módulo Específico
- [x] Página de Pílula Específica

## Componentes
- [x] RichContent para renderização de conteúdo rico
- [ ] Componente de Quiz
- [ ] Componente de Progresso
- [ ] Componente de Navegação entre Pílulas

## Funcionalidades
- [x] Autenticação de usuários
- [x] Acesso ao banco de dados com Prisma
- [x] Sistema de progresso do usuário
- [ ] Sistema de quiz
- [ ] Sistema de conquistas

## Banco de Dados
- [x] Modelagem do banco de dados
- [x] Migrações iniciais
- [x] Seeds para dados de teste
- [ ] Índices para otimização

## Testes
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes end-to-end

## Documentação
- [x] Documentação do projeto
- [x] Changelog
- [ ] Documentação da API
- [ ] Guia de contribuição

# Todo

## Implementação
- [x] Construir Páginas e Componentes Frontend
  - [x] Página de Login/Registro
  - [ ] Dashboard do usuário
  - [ ] Página de listagem de Módulos
  - [ ] Página de Módulo específico
  - [ ] Página de Pílula/Lição específica
  - [ ] Outras páginas (perfil, configurações, etc.)
- [x] Implementar Modelos de Conteúdo e APIs
  - [x] Criar API routes em `src/app/api/content/` para buscar Módulos e Pílulas
  - [x] Implementar a lógica de acesso ao banco de dados usando o cliente Prisma para buscar dados de conteúdo 
- [x] Implementar Progresso do Usuário e Gamificação
  - [x] Criar API routes em `src/app/api/user/` para gerenciar dados do usuário, progresso e conquistas
  - [x] Implementar a lógica para registrar o progresso do usuário (`UserProgress`) e conceder conquistas (`UserAchievement`) usando Prisma 

## Componentes do Dashboard
- [x] Criar componente ProgressOverview
  - [x] Implementar barras de progresso
  - [x] Adicionar estatísticas do usuário
  - [x] Listar próximos objetivos
- [ ] Criar componente RecentActivity
- [ ] Criar componente AchievementList 