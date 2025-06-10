import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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