# Schola Juris

Plataforma de ensino jurídico gamificada, desenvolvida com Next.js, Prisma e PostgreSQL.

## 🚀 Tecnologias

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- NextAuth.js
- Jest
- Sentry

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/schola-juris.git
cd schola-juris
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Popule o banco de dados com dados iniciais:
```bash
npm run seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes
- `npm run seed` - Popula o banco de dados com dados iniciais
- `npm run backup` - Executa o backup do banco de dados

## 📝 Estrutura do Projeto

```
schola-juris/
├── prisma/           # Configuração do Prisma e migrações
├── public/           # Arquivos estáticos
├── src/
│   ├── app/         # Rotas e páginas (App Router)
│   ├── components/  # Componentes React
│   ├── lib/         # Utilitários e configurações
│   └── styles/      # Estilos globais
├── tests/           # Testes automatizados
└── scripts/         # Scripts utilitários
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔐 Autenticação

O sistema utiliza NextAuth.js para autenticação, suportando:
- Login com email/senha
- Autenticação social (Google, GitHub)
- Proteção de rotas
- Gerenciamento de sessão

## 🎨 Temas e Acessibilidade

- Suporte a tema claro/escuro
- Configurações de acessibilidade:
  - Tamanho da fonte ajustável
  - Modo alto contraste
  - Redução de movimento
  - Suporte a leitores de tela

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a:
- Desktops
- Tablets
- Smartphones

## 🚀 Deploy

O projeto está configurado para deploy na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch main

## 📞 Suporte

Para suporte, envie um email para suporte@scholajuris.com ou abra uma issue no GitHub.
