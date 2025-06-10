import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
          if (process.env.NODE_ENV === "development" && !credentials?.email && !credentials?.password) {
            return {
              id: "dev-user-1",
              name: "Usuário de Desenvolvimento",
              email: "dev@example.com",
            };
          }

          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }: any) {
      try {
        if (token && session?.user) {
          session.user.id = token.sub;
        }
        return session;
      } catch (error) {
        console.error("Erro no callback de sessão:", error);
        return session;
      }
    },
    async jwt({ token, user }: any) {
      try {
        if (user) {
          token.sub = user.id;
        }
        return token;
      } catch (error) {
        console.error("Erro no callback JWT:", error);
        return token;
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code: any, metadata: any) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code: any) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code: any, metadata: any) {
      if (process.env.NODE_ENV === "development") {
        console.log("NextAuth Debug:", code, metadata);
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };