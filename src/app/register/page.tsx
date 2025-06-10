import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Schola Juris Logo"
            width={80}
            height={80}
            className="mx-auto mb-6 drop-shadow-lg"
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF2D55] via-[#5856D6] to-[#007AFF] bg-clip-text text-transparent">
            Schola Juris
          </h1>
          <p className="text-lg text-[#86868b]">
            Crie sua conta para começar sua jornada
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <RegisterForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#86868b]">
              Já tem uma conta?{" "}
              <Link 
                href="/login" 
                className="text-[#0071e3] hover:text-[#0077ED] font-medium transition-colors duration-200"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}