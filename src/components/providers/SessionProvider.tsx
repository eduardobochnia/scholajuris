'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider 
      basePath="/api/auth"
      refetchInterval={5 * 60} // Refetch a cada 5 minutos
      refetchOnWindowFocus={true}
    >
      {children}
    </NextAuthSessionProvider>
  );
}