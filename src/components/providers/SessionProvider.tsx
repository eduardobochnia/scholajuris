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
      refetchInterval={0} // Desabilitar refetch automático
      refetchOnWindowFocus={false} // Desabilitar refetch no foco
      refetchWhenOffline={false} // Desabilitar refetch quando offline
    >
      {children}
    </NextAuthSessionProvider>
  );
}