'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-sans font-semibold text-[#1d1d1f]">Schola Juris</span>
          </Link>

          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link href="/modulos" className="nav-link">
                  Módulos
                </Link>
                <Link href="/biblioteca" className="nav-link">
                  Biblioteca
                </Link>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-[#1d1d1f] hover:text-[#0071e3] transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-[#1d1d1f]">{session.user?.name}</p>
                        <p className="text-xs text-[#86868b]">{session.user?.email}</p>
                      </div>
                      
                      <Link
                        href="/configuracoes"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="#modulos" className="nav-link">
                  Módulos
                </Link>
                <Link href="#pilulas" className="nav-link">
                  Pílulas
                </Link>
                <Link href="/auth/login" className="nav-link">
                  Entrar
                </Link>
                <Link href="/auth/register" className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0077ED] transition-colors duration-200">
                  Registrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}