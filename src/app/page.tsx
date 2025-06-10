import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Clock,
  Target,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Award,
  TrendingUp,
  Heart,
  MessageCircle
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12">
            <div className="relative inline-block">
              <Image
                src="/images/logo.png"
                alt="Schola Juris Logo"
                width={200}
                height={200}
                className="mx-auto mb-6 drop-shadow-xl filter brightness-110"
                priority
              />
              {/* Reflexo do logo */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-30">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={200}
                  height={200}
                  className="transform scale-y-[-1] blur-sm"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%)'
                  }}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-10 bg-gradient-to-r from-[#0071e3] via-[#007AFF] to-[#34C759] bg-clip-text text-transparent">
            Schola Juris
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg border border-white/20">
            <p className="text-xl md:text-2xl text-[#1d1d1f] max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
              A plataforma de microlearning jurídico mais avançada do Brasil.
            </p>
            
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8 leading-relaxed">
              Transforme sua carreira jurídica com trilhas personalizadas, gamificação inteligente e conteúdo de alta qualidade.
            </p>
            
            <p className="text-base text-[#86868b] max-w-2xl mx-auto mb-8 leading-relaxed">
              Nossa metodologia revolucionária combina neurociência, tecnologia de ponta e expertise jurídica para acelerar seu aprendizado em até 3x. 
              Estude onde quiser, quando quiser, com conteúdo validado por especialistas renomados.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/trilhas" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-[#0071e3] text-white hover:bg-[#0077ED] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Começar Gratuitamente
            </Link>
            <Link 
              href="#demo" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border-2 border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3] hover:text-white transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/30">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[#86868b]">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">+10.000 estudantes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-medium">4.9/5 avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Premiado 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Principais */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Por que escolher a Schola Juris?
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto mb-8">
              Uma plataforma completa que revoluciona o ensino jurídico com tecnologia de ponta.
            </p>
            <p className="text-lg text-[#86868b] max-w-4xl mx-auto leading-relaxed">
              Desenvolvida por especialistas em educação e tecnologia, nossa plataforma utiliza inteligência artificial, 
              gamificação avançada e metodologias comprovadas pela neurociência para criar a experiência de aprendizado 
              mais eficaz do mercado jurídico brasileiro. Cada funcionalidade foi cuidadosamente projetada para maximizar 
              sua retenção de conhecimento e acelerar seu progresso profissional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefício 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f] text-center">Aprendizado Acelerado</h3>
              <p className="text-[#86868b] leading-relaxed text-center">
                Metodologia de microlearning que acelera a absorção de conhecimento em até 3x através de técnicas 
                baseadas em neurociência e repetição espaçada inteligente.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f] text-center">Trilhas Personalizadas</h3>
              <p className="text-[#86868b] leading-relaxed text-center">
                IA que adapta o conteúdo ao seu nível e objetivos profissionais específicos, criando um caminho 
                de aprendizado único e otimizado para seu perfil.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f] text-center">Gamificação Avançada</h3>
              <p className="text-[#86868b] leading-relaxed text-center">
                Sistema de conquistas e rankings baseado em psicologia comportamental que mantém você motivado 
                e engajado durante toda sua jornada de aprendizado.
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f] text-center">Conteúdo Certificado</h3>
              <p className="text-[#86868b] leading-relaxed text-center">
                Material desenvolvido por especialistas renomados e validado por instituições de ensino superior, 
                garantindo qualidade acadêmica e aplicabilidade prática.
              </p>
            </div>

            {/* Benefício 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f] text-center">Multiplataforma</h3>
              <p className="text-[#86868b] leading-relaxed text-center">
                Estude onde quiser: web, mobile, tablet. Sincronização automática em tempo real permite 
                continuidade perfeita entre dispositivos.
              </p>
            </div>

            {/* Benefício 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#40A9FF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f] text-center">Acesso Global</h3>
              <p className="text-[#86868b] leading-relaxed text-center">
                Estude offline, sincronize online. Acesso 24/7 de qualquer lugar do mundo com tecnologia 
                de cache inteligente para máxima disponibilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Planos e Preços
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto mb-8">
              Escolha o plano ideal para acelerar sua carreira jurídica.
            </p>
            <p className="text-lg text-[#86868b] max-w-4xl mx-auto leading-relaxed">
              Nossos planos foram desenvolvidos para atender desde estudantes iniciantes até professores que desejam 
              utilizar nossa plataforma em suas instituições de ensino. Cada plano oferece recursos específicos 
              para maximizar seu aprendizado ou o de seus alunos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Gratuito */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Gratuito</h3>
                <div className="text-4xl font-bold text-[#1d1d1f] mb-2">R$ 0</div>
                <p className="text-[#86868b]">Para sempre</p>
                <p className="text-sm text-[#FF9500] mt-2 font-medium">Com anúncios</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Acesso a trilha básica</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">5 pílulas por semana</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Quizzes básicos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Certificado de conclusão</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Anúncios não intrusivos</span>
                </li>
              </ul>
              
              <Link 
                href="/trilhas"
                className="w-full bg-[#86868b] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#6d6d70] transition-colors duration-200 text-center block"
              >
                Começar Gratuitamente
              </Link>
            </div>

            {/* Plano Premium */}
            <div className="bg-gradient-to-br from-[#0071e3] to-[#007AFF] p-8 rounded-2xl shadow-xl text-white relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FF9500] text-white px-4 py-2 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-2">R$ 5,99</div>
                <p className="text-blue-100">por mês</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Acesso a todas as trilhas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Pílulas ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>IA personalizada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Sem anúncios</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Certificados profissionais</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              
              <Link 
                href="/trilhas"
                className="w-full bg-white text-[#0071e3] py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 text-center block"
              >
                Começar Teste Gratuito
              </Link>
            </div>

            {/* Plano Educacional */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Educacional</h3>
                <div className="text-4xl font-bold text-[#1d1d1f] mb-2">R$ 99,90</div>
                <p className="text-[#86868b]">por sala/mês</p>
                <p className="text-sm text-[#0071e3] mt-2 font-medium">Para professores</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Tudo do plano Premium</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Gestão de turmas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Relatórios de progresso</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Até 50 alunos por sala</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Suporte pedagógico</span>
                </li>
              </ul>
              
              <Link 
                href="/trilhas"
                className="w-full bg-[#1d1d1f] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#2d2d2f] transition-colors duration-200 text-center block"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-[#86868b] mb-4">
              💳 Todos os planos incluem 7 dias de teste gratuito • Cancele a qualquer momento
            </p>
            <p className="text-sm text-[#86868b]">
              🔒 Pagamento seguro • 🎓 Garantia de satisfação de 30 dias
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#0071e3] via-[#007AFF] to-[#34C759] p-12 rounded-3xl text-white shadow-2xl">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Comece Sua Jornada Hoje
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transforme sua carreira jurídica com o método mais avançado e eficaz do Brasil. 
              Junte-se a milhares de profissionais que já revolucionaram seus conhecimentos.
            </p>
            <p className="text-lg text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Nossa plataforma oferece uma experiência de aprendizado única, combinando rigor acadêmico 
              com inovação tecnológica. Seja você um estudante iniciante ou um profissional experiente 
              buscando especialização, temos o caminho ideal para acelerar seu crescimento na carreira jurídica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/formacoes">
                <button className="bg-white text-[#0071e3] hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg">
                  <BookOpen className="w-6 h-6 mr-3 inline" />
                  Explorar Formações
                </button>
              </Link>
              <Link href="/biblioteca">
                <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transition-colors duration-200 backdrop-blur-sm">
                  <Target className="w-6 h-6 mr-3 inline" />
                  Ver Conteúdo Gratuito
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}