# Changelog

## [Não publicado]

### Atualizado
- Atualizado o status das páginas no PROJECT_STEPS.md:
  - Confirmada a implementação da Landing Page
  - Confirmada a implementação da página de Login/Registro
  - Confirmada a implementação do Dashboard do usuário

### Melhorias na Página Inicial
- Reduzido o tamanho do logo e título para melhor equilíbrio visual
- Adicionado efeito de sombra suave e brilho ao logo
- Implementada fonte Inter para melhor legibilidade e modernidade
- Ajustados espaçamentos e margens para melhor respiro visual
- Melhorada a hierarquia tipográfica com tamanhos mais equilibrados
- Adicionado gradiente sutil ao título principal
- Aumentado o tamanho e peso dos botões para melhor destaque
- Refinados os espaçamentos entre seções
- Adicionadas sombras suaves aos ícones dos recursos
- Otimizada a largura máxima dos containers para melhor leitura

### Melhorias na Página de Módulos
- Implementada nova página de listagem de módulos com design moderno
- Adicionada barra de progresso para cada módulo
- Incluído contador de pílulas completadas
- Adicionado indicador de último acesso
- Implementada busca direta no banco de dados via Prisma
- Adicionada integração com progresso do usuário
- Melhorada a responsividade e interatividade dos cards
- Implementado sistema de hover com animações suaves
- Adicionados ícones para melhor experiência visual

### Implementação da Página de Módulo Específico
- Criada página dinâmica `/modulos/[slug]` para exibir detalhes de um módulo específico
- Implementada lista de pílulas com status de progresso
- Adicionado sistema de bloqueio progressivo (pílulas só ficam disponíveis após completar as anteriores)
- Implementada barra de progresso do módulo
- Adicionada navegação breadcrumb
- Implementado design responsivo e interativo
- Integração com o sistema de progresso do usuário
- Adicionados indicadores visuais de status (completo, próximo, bloqueado)

## [Não lançado]

### Alterado
- Redesign completo da interface seguindo o estilo minimalista da Apple
- Atualizado as cores para usar a paleta da Apple (#f5f5f7 para fundo, #1d1d1f para texto)
- Removido gradientes e efeitos de ruído do fundo
- Atualizado a tipografia para usar fontes sans-serif
- Adicionado efeito de degradê no título principal
- Redesenhado os botões para serem mais arredondados e minimalistas
- Atualizado o Navbar para ter um visual mais limpo e transparente
- Removido efeitos de glassmorphism e sombras excessivas
- Simplificado os cards de features com ícones circulares
- Melhorado o contraste e legibilidade dos textos
- Centralizado todos os elementos para um layout mais equilibrado
- Atualizado as cores dos textos secundários para #86868b

### Adicionado
- Novo estilo de botões com bordas arredondadas
- Efeito de hover mais suave nos botões
- Ícones circulares com fundo cinza claro
- Transições mais suaves nas interações
- Melhor organização visual dos elementos

## [Não versionado] - 2024-03-21

### Alterado
- Atualizada a hero section da landing page para seguir o design da Apple WWDC25
- Implementado novo gradiente colorido no título "Schola Juris"
- Ajustado o tamanho e espaçamento do logo
- Atualizado o estilo dos botões para seguir o padrão Apple
- Removidas as seções de features e CTA para focar apenas na hero section
- Ajustadas as fontes para SF Pro Display e SF Pro Text
- Melhorados os espaçamentos e proporções gerais
- Padronizada a tipografia usando font-sans (Inter) em toda a landing page
- Ajustado o peso das fontes para melhor legibilidade
- Removidas referências a fontes específicas do sistema
- Ajustado o peso dos botões para font-medium
- Substituída a fonte SF Pro pela Inter em toda a landing page
- Ajustada a tipografia para melhor legibilidade e aparência moderna

### Adicionado
- Configurada a fonte Inter do Google Fonts
- Adicionada variável CSS para a fonte Inter
- Configurado carregamento otimizado da fonte com display swap

## [Não versionado]

### Adicionado
- Configuração do Tailwind CSS com temas personalizados "Aurora Romana" e "Nox Bibliothecae"
- Variáveis CSS e estilos globais em globals.css
- Componentes base com classes utilitárias (glass-effect, btn-primary, btn-secondary, card)
- Configuração de tipografia com fontes serif, sans e mono
- Animações básicas (fadeIn)
- Implementação das APIs de conteúdo:
  - Rota GET `/api/content/modules` para listar todos os módulos
  - Rota GET `/api/content/modules/[slug]` para buscar um módulo específico
  - Rota GET `/api/content/pills/[slug]` para buscar uma pílula específica
- Configuração do cliente Prisma como singleton em `src/lib/prisma.ts`
- Implementação das APIs de progresso e gamificação:
  - Rota POST `/api/user/progress` para registrar progresso do usuário em pílulas
  - Rota GET `/api/user/progress` para buscar progresso e estatísticas do usuário
  - Rota GET `/api/user/achievements` para listar conquistas disponíveis
  - Sistema de verificação e concessão automática de conquistas
  - Cálculo de estatísticas do usuário (total de pílulas completadas, média de pontuação, etc.)
- Implementação das páginas de autenticação:
  - Página de login (`/auth/login`) com formulário e opções de autenticação social
  - Página de registro (`/auth/register`) com formulário de criação de conta
  - Componentes reutilizáveis para formulários de autenticação
  - Suporte a autenticação com Google e GitHub
  - Redirecionamento automático para dashboard após login
- Implementação da rota de registro de usuários:
  - Rota POST `/api/auth/register` para criar novas contas
  - Validação de dados e verificação de email duplicado
  - Hash seguro de senhas usando bcryptjs
  - Remoção de dados sensíveis da resposta
- Componente ProgressOverview para exibir estatísticas e objetivos do usuário
  - Barra de progresso para pílulas completadas
  - Barra de progresso para média de pontuação
  - Barra de progresso para sequência de estudos
  - Lista de próximos objetivos e conquistas

### Corrigido
- Erros de tipo no componente RichContent
- Erros de tipo na página de pílula específica
- Exportação do tipo ContentType para uso em outros componentes

### Alterado
- Melhorias na estrutura de tipos do projeto
- Refinamento da lógica de acesso ao banco de dados

### Problemas Conhecidos
- Erros de tipo persistentes na página de pílula específica relacionados ao Prisma
  - Problemas com tipos de inclusão (include) do Prisma
  - Necessidade de revisar a estrutura de tipos do Prisma 