import { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login | Schola Juris',
  description: 'Faça login para acessar sua conta na Schola Juris',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-aurora-primary to-aurora-secondary dark:from-nox-primary dark:to-nox-secondary">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-aurora-accent dark:text-nox-accent">
            Schola Juris
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Faça login para continuar sua jornada jurídica
          </p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-aurora-accent dark:text-nox-accent hover:underline"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 