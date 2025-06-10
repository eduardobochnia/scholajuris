import { PrismaClient } from "@prisma/client";
// Importar biblioteca para hash de senha (ex: bcrypt)

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Adicionar função para verificar senha (usando bcrypt em produção)
export async function verifyPassword(password: string, hashedPassword: string) {
  // return await bcrypt.compare(password, hashedPassword);
  return password === hashedPassword; // Placeholder simples
}

// Adicionar outras funções utilitárias de autenticação aqui