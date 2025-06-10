'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-sans font-semibold text-[#1d1d1f]">Schola Juris</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors duration-200 font-medium">
              Dashboard
            </Link>
            <Link href="/modulos" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors duration-200 font-medium">
              Módulos
            </Link>
            <Link href="/biblioteca" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors duration-200 font-medium">
              Biblioteca
            </Link>
            <Link href="/glossario" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors duration-200 font-medium">
              Glossário
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}