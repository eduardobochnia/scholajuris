import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Modo de desenvolvimento: permite login sem credenciais
          if (process.env.NODE_ENV === "development") {
            return {
              id: "dev-user-1",
              name: "Usuário de Desenvolvimento",
              email: "dev@example.com",
            };
          }

          // Em produção, implementar validação real aqui
          if (credentials?.email && credentials?.password) {
            return {
              id: "1",
              name: "Usuário Teste",
              email: credentials.email,
            };
          }

          return null;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false, // Desabilitar debug para reduzir logs
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };