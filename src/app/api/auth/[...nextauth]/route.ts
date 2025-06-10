import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, verifyPassword } from "@/lib/auth";

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
          if (process.env.NODE_ENV === "development" && (!credentials?.email && !credentials?.password)) {
            return {
              id: "dev-user-1",
              name: "Usuário de Desenvolvimento",
              email: "dev@example.com",
            };
          }

          // Login normal com credenciais
          if (credentials?.email && credentials?.password) {
            const user = await getUserByEmail(credentials.email);
            
            if (user && user.password && await verifyPassword(credentials.password, user.password)) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
              };
            }
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
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };