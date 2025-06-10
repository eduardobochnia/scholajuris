import { getServerSession } from "next-auth";

// Helper function to get server session without importing authOptions
export async function getAuthSession() {
  return await getServerSession();
}