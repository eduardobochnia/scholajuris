import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-sans font-semibold text-[#1d1d1f]">Schola Juris</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="#modulos" className="nav-link">
              Módulos
            </Link>
            <Link href="#pilulas" className="nav-link">
              Pílulas
            </Link>
            <Link href="/login" className="nav-link">
              Entrar
            </Link>
            <Link href="/register" className="btn-primary">
              Registrar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}