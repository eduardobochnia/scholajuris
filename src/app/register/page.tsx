import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aurora-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-aurora-primary">
            Schola Juris
          </h1>
          <p className="mt-2 text-aurora-text">
            Crie sua conta para começar sua jornada
          </p>
        </div>
        <RegisterForm />
        <div className="text-center text-sm text-aurora-text">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-aurora-primary hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}