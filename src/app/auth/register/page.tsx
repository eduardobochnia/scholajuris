import { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Registro | Schola Juris',
  description: 'Crie sua conta na Schola Juris',
};

export default async function RegisterPage() {
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
            Crie sua conta para começar sua jornada jurídica
          </p>
        </div>

        <RegisterForm />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-aurora-accent dark:text-nox-accent hover:underline"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 