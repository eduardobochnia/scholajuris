import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Helper function to get server session safely
export async function getAuthSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
}

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  const session = await getAuthSession();
  return !!session?.user;
}

// Helper function to get user ID safely
export async function getCurrentUserId() {
  const session = await getAuthSession();
  return session?.user?.id || null;
}

// Get user by email from database
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

// Verify password using bcrypt
export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Erro ao verificar senha:", error);
    return false;
  }
}

// Hash password using bcrypt
export async function hashPassword(password: string) {
  try {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Erro ao hash da senha:", error);
    throw new Error("Erro ao processar senha");
  }
}