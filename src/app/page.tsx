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
              href="#modulos" 
              className="border-2 border-[#0071e3] text-[#0071e3] text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0071e3]/10 transition-colors duration-200"
            >
              Explorar Conteúdo
            </Link>
          </div>
        </div>
      </section>

      {/* Módulos Section */}
      <section id="modulos" className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Módulos de Estudo
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Explore nossos módulos estruturados de Direito Romano, organizados de forma progressiva 
              para maximizar seu aprendizado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Módulo 1 */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Introdução ao Direito</h3>
              <p className="text-[#86868b] mb-4">
                Conceitos fundamentais do Direito e sua importância na sociedade moderna.
              </p>
              <div className="text-sm text-[#0071e3] font-medium">
                5 pílulas • Nível Iniciante
              </div>
            </div>

            {/* Módulo 2 */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Direito Constitucional</h3>
              <p className="text-[#86868b] mb-4">
                Estudo da Constituição Federal e seus princípios fundamentais.
              </p>
              <div className="text-sm text-[#0071e3] font-medium">
                8 pílulas • Nível Intermediário
              </div>
            </div>

            {/* Módulo 3 */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#40A9FF] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Direito Civil</h3>
              <p className="text-[#86868b] mb-4">
                Relações jurídicas entre particulares e seus direitos fundamentais.
              </p>
              <div className="text-sm text-[#0071e3] font-medium">
                12 pílulas • Nível Avançado
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-[#86868b] mb-8">
              Acesse todos os módulos e acompanhe seu progresso com uma conta gratuita.
            </p>
            <Link 
              href="/register" 
              className="bg-[#0071e3] text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0077ED] transition-colors duration-200 inline-block"
            >
              Criar Conta Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Pílulas Section */}
      <section id="pilulas" className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Pílulas de Conhecimento
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Aprenda através de conteúdos curtos e focados, projetados para maximizar 
              a retenção e facilitar o aprendizado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Pílula 1 */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#1d1d1f]">Conceitos Básicos do Direito</h3>
                  <p className="text-[#86868b] text-sm mb-3">
                    Introdução aos fundamentos jurídicos e terminologias essenciais.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-[#0071e3]">
                    <span>📚 Introdução ao Direito</span>
                    <span>⏱️ 15 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pílula 2 */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#1d1d1f]">Princípios Constitucionais</h3>
                  <p className="text-[#86868b] text-sm mb-3">
                    Explore os pilares fundamentais da Constituição Federal.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-[#0071e3]">
                    <span>📚 Direito Constitucional</span>
                    <span>⏱️ 20 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pílula 3 */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#40A9FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#1d1d1f]">Contratos e Obrigações</h3>
                  <p className="text-[#86868b] text-sm mb-3">
                    Fundamentos dos contratos e relações obrigacionais.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-[#0071e3]">
                    <span>📚 Direito Civil</span>
                    <span>⏱️ 25 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pílula 4 */}
            <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#1d1d1f]">Aplicação Prática</h3>
                  <p className="text-[#86868b] text-sm mb-3">
                    Casos práticos e exemplos reais de aplicação jurídica.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-[#0071e3]">
                    <span>📚 Casos Práticos</span>
                    <span>⏱️ 30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-[#86868b] mb-8">
              Mais de 50 pílulas de conhecimento esperando por você. Comece sua jornada hoje!
            </p>
            <Link 
              href="/register" 
              className="bg-[#0071e3] text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0077ED] transition-colors duration-200 inline-block"
            >
              Começar Agora
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