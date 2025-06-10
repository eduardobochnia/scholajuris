import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole; // Adicionar a propriedade role
    };
  }

  interface User {
    role?: UserRole; // Adicionar a propriedade role ao tipo User do NextAuth
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole; // Adicionar a propriedade role ao token JWT
  }
}