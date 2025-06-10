import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aurora-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-aurora-primary">
            Schola Juris
          </h1>
          <p className="mt-2 text-aurora-text">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>
        <LoginForm />
        <div className="text-center text-sm text-aurora-text">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-aurora-primary hover:underline">
            Registre-se
          </Link>
        </div>
      </div>
    </div>
  );
}