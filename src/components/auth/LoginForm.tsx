'use client';

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou senha inválidos');
        return;
      }

      if (result?.ok) {
        // Aguardar um pouco para garantir que a sessão foi criada
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar se a sessão foi criada corretamente
        const session = await getSession();
        if (session) {
          window.location.href = '/dashboard';
        } else {
          setError('Erro ao criar sessão. Tente novamente.');
        }
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDevLogin() {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
      });

      if (result?.error) {
        setError('Erro ao fazer login de desenvolvimento');
        return;
      }

      if (result?.ok) {
        // Aguardar um pouco para garantir que a sessão foi criada
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar se a sessão foi criada corretamente
        const session = await getSession();
        if (session) {
          window.location.href = '/dashboard';
        } else {
          setError('Erro ao criar sessão de desenvolvimento. Tente novamente.');
        }
      }
    } catch (error) {
      console.error('Erro no login de desenvolvimento:', error);
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={handleDevLogin}
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-[#34C759] hover:bg-[#30D158] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34C759] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Entrando...' : 'Entrar como Desenvolvedor'}
        </button>
      )}

      {process.env.NODE_ENV === 'development' && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#86868b]">
              Ou faça login com suas credenciais
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#1d1d1f] mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-gray-200 rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all duration-200"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1d1d1f] mb-2"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-gray-200 rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all duration-200"
            placeholder="Sua senha"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-[#0071e3] hover:bg-[#0077ED] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0071e3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}