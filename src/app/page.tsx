import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-16">
            <Image
              src="/images/logo.png"
              alt="Schola Juris Logo"
              width={120}
              height={120}
              className="mx-auto mb-12 drop-shadow-xl filter brightness-110"
              priority
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-10 bg-gradient-to-r from-[#FF2D55] via-[#5856D6] to-[#007AFF] bg-clip-text text-transparent">
            Schola Juris
          </h1>
          
          <p className="text-xl md:text-2xl text-[#1d1d1f]/90 max-w-xl mx-auto mb-16 leading-relaxed font-normal">
            Transforme sua jornada jurídica com nossa plataforma inovadora de aprendizado.
            Conecte-se com especialistas, acesse conteúdo exclusivo e evolua sua carreira.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/register" 
              className="bg-[#0071e3] text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0077ED] transition-colors duration-200"
            >
              Comece Agora
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-[#0071e3] text-[#0071e3] text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0071e3]/10 transition-colors duration-200"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-['Inter'] font-semibold text-center mb-20">
            Recursos Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Microlearning */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#f5f5f7] flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-['Inter'] font-semibold mb-4 text-[#1d1d1f]">Microlearning</h3>
              <p className="text-[#86868b] font-['Inter']">
                Aprenda em pequenos módulos, otimizando seu tempo e retenção de conhecimento.
              </p>
            </div>

            {/* Gamificação */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#f5f5f7] flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-['Inter'] font-semibold mb-4 text-[#1d1d1f]">Gamificação</h3>
              <p className="text-[#86868b] font-['Inter']">
                Transforme seu aprendizado em uma jornada envolvente com recompensas e desafios.
              </p>
            </div>

            {/* Biblioteca Virtual */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#f5f5f7] flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-['Inter'] font-semibold mb-4 text-[#1d1d1f]">Biblioteca Virtual</h3>
              <p className="text-[#86868b] font-['Inter']">
                Acesse uma extensa coleção de materiais jurídicos atualizados e exclusivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-['Inter'] font-semibold mb-6 text-[#1d1d1f]">
              Comece Sua Jornada Hoje
            </h2>
            <p className="text-lg text-[#86868b] mb-10 max-w-xl mx-auto font-['Inter']">
              Junte-se a milhares de profissionais do direito que já transformaram suas carreiras com a Schola Juris.
            </p>
            <Link href="/register" className="btn-primary text-lg font-semibold px-8 py-3">
              Criar Conta Gratuita
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
