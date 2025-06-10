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
          
          <p className="text-xl md:text-2xl text-[#1d1d1f]/90 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            A plataforma de microlearning jurídico mais avançada do Brasil.
          </p>
          
          <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-16 leading-relaxed">
            Transforme sua carreira jurídica com trilhas personalizadas, gamificação inteligente e conteúdo de alta qualidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/trilhas" 
              className="bg-[#0071e3] text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0077ED] transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Começar Gratuitamente
            </Link>
            <Link 
              href="#demo" 
              className="border-2 border-[#0071e3] text-[#0071e3] text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0071e3]/10 transition-all duration-200 flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[#86868b]">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>+10.000 estudantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span>4.9/5 avaliação</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>Premiado 2024</span>
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
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Uma plataforma completa que revoluciona o ensino jurídico com tecnologia de ponta.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefício 1 */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#007AFF] flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Aprendizado Acelerado</h3>
              <p className="text-[#86868b] leading-relaxed">
                Metodologia de microlearning que acelera a absorção de conhecimento em até 3x.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Trilhas Personalizadas</h3>
              <p className="text-[#86868b] leading-relaxed">
                IA que adapta o conteúdo ao seu nível e objetivos profissionais específicos.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FF9500] to-[#FFCC02] flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Gamificação Avançada</h3>
              <p className="text-[#86868b] leading-relaxed">
                Sistema de conquistas e rankings que mantém você motivado e engajado.
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Conteúdo Certificado</h3>
              <p className="text-[#86868b] leading-relaxed">
                Material desenvolvido por especialistas e validado por instituições renomadas.
              </p>
            </div>

            {/* Benefício 5 */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Multiplataforma</h3>
              <p className="text-[#86868b] leading-relaxed">
                Estude onde quiser: web, mobile, tablet. Sincronização automática em tempo real.
              </p>
            </div>

            {/* Benefício 6 */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#40A9FF] flex items-center justify-center">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Acesso Global</h3>
              <p className="text-[#86868b] leading-relaxed">
                Estude offline, sincronize online. Acesso 24/7 de qualquer lugar do mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trilhas Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Trilhas de Aprendizado
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Siga trilhas estruturadas e personalizadas para acelerar seu aprendizado jurídico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Trilha 1 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Fundamentos do Direito</h3>
              <p className="text-[#86868b] mb-6">
                Trilha completa para iniciantes, cobrindo todos os conceitos fundamentais do direito brasileiro.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#0071e3] font-medium">8 semanas • Nível Iniciante</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-[#86868b]">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#86868b]">1.247 estudantes</span>
                <span className="text-sm font-medium text-green-600">Gratuito</span>
              </div>
            </div>

            {/* Trilha 2 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Direito Empresarial</h3>
              <p className="text-[#86868b] mb-6">
                Especialização em direito empresarial com foco em aplicações práticas e casos reais.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#0071e3] font-medium">10 semanas • Nível Intermediário</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-[#86868b]">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#86868b]">892 estudantes</span>
                <span className="text-sm font-medium text-[#0071e3]">R$ 197/mês</span>
              </div>
            </div>

            {/* Trilha 3 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Direito Penal Avançado</h3>
              <p className="text-[#86868b] mb-6">
                Aprofundamento em direito penal com análise de casos complexos e jurisprudência atual.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#0071e3] font-medium">12 semanas • Nível Avançado</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-[#86868b]">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#86868b]">634 estudantes</span>
                <span className="text-sm font-medium text-[#0071e3]">R$ 297/mês</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-[#86868b] mb-8">
              Escolha sua trilha e comece sua jornada de aprendizado estruturado.
            </p>
            <Link 
              href="/trilhas" 
              className="bg-[#0071e3] text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0077ED] transition-colors duration-200 inline-flex items-center"
            >
              Ver Todas as Trilhas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Planos e Preços
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Escolha o plano ideal para acelerar sua carreira jurídica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Gratuito */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Gratuito</h3>
                <div className="text-4xl font-bold text-[#1d1d1f] mb-2">R$ 0</div>
                <p className="text-[#86868b]">Para sempre</p>
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
              </ul>
              
              <Link 
                href="/trilhas"
                className="w-full bg-[#86868b] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#6d6d70] transition-colors duration-200 text-center block"
              >
                Começar Gratuitamente
              </Link>
            </div>

            {/* Plano Pro */}
            <div className="bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl p-8 text-white relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FF9500] text-white px-4 py-2 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">R$ 197</div>
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
                  <span>Mentoria em grupo</span>
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

            {/* Plano Premium */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Premium</h3>
                <div className="text-4xl font-bold text-[#1d1d1f] mb-2">R$ 397</div>
                <p className="text-[#86868b]">por mês</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Tudo do plano Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Mentoria individual</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Acesso antecipado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Networking exclusivo</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-[#1d1d1f]">Consultoria de carreira</span>
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

      {/* Módulos Section */}
      <section id="modulos" className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Módulos de Estudo
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Explore nossos módulos estruturados de Direito, organizados de forma progressiva 
              para maximizar seu aprendizado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Módulo 1 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Introdução ao Direito</h3>
              <p className="text-[#86868b] mb-6">
                Conceitos fundamentais do Direito e sua importância na sociedade moderna.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#0071e3] font-medium">5 pílulas • Nível Iniciante</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#86868b]" />
                  <span className="text-sm text-[#86868b]">2h</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-[#FF2D55] to-[#FF6B6B] h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-sm text-[#86868b]">60% dos estudantes completaram</p>
            </div>

            {/* Módulo 2 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Direito Constitucional</h3>
              <p className="text-[#86868b] mb-6">
                Estudo da Constituição Federal e seus princípios fundamentais.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#0071e3] font-medium">8 pílulas • Nível Intermediário</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#86868b]" />
                  <span className="text-sm text-[#86868b]">4h</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-[#5856D6] to-[#8B7CF6] h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <p className="text-sm text-[#86868b]">45% dos estudantes completaram</p>
            </div>

            {/* Módulo 3 */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#40A9FF] rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1d1d1f]">Direito Civil</h3>
              <p className="text-[#86868b] mb-6">
                Relações jurídicas entre particulares e seus direitos fundamentais.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#0071e3] font-medium">12 pílulas • Nível Avançado</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#86868b]" />
                  <span className="text-sm text-[#86868b]">6h</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-[#007AFF] to-[#40A9FF] h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
              <p className="text-sm text-[#86868b]">30% dos estudantes completaram</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-[#86868b] mb-8">
              Acesse todos os módulos e acompanhe seu progresso em tempo real.
            </p>
            <Link 
              href="/modulos" 
              className="bg-[#0071e3] text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-[#0077ED] transition-colors duration-200 inline-flex items-center"
            >
              Explorar Módulos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              O que nossos estudantes dizem
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Histórias reais de transformação profissional através da Schola Juris.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-[#1d1d1f] mb-6 leading-relaxed">
                "A Schola Juris revolucionou minha forma de estudar. Em 3 meses, consegui a aprovação no concurso que sonhava!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MC</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1f]">Maria Clara</p>
                  <p className="text-sm text-[#86868b]">Aprovada no TJ-SP</p>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-[#1d1d1f] mb-6 leading-relaxed">
                "O método de microlearning é genial! Consigo estudar no metrô e aproveitar cada minuto livre."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">RS</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1f]">Rafael Santos</p>
                  <p className="text-sm text-[#86868b]">Advogado Empresarial</p>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-[#1d1d1f] mb-6 leading-relaxed">
                "A gamificação me mantém motivada todos os dias. Já conquistei 15 badges e não pretendo parar!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AL</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1f]">Ana Luiza</p>
                  <p className="text-sm text-[#86868b]">Estudante de Direito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Números que impressionam
            </h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
              Resultados comprovados de uma plataforma que realmente funciona.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0071e3] mb-2">+10k</div>
              <p className="text-[#86868b]">Estudantes Ativos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#34C759] mb-2">95%</div>
              <p className="text-[#86868b]">Taxa de Satisfação</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FF9500] mb-2">500+</div>
              <p className="text-[#86868b]">Pílulas de Conteúdo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FF2D55] mb-2">3x</div>
              <p className="text-[#86868b]">Mais Rápido</p>
            </div>
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
                <BookOpen className="w-8 h-8 text-[#1d1d1f]" />
              </div>
              <h3 className="text-xl font-['Inter'] font-semibold mb-4 text-[#1d1d1f]">Microlearning</h3>
              <p className="text-[#86868b] font-['Inter']">
                Aprenda em pequenos módulos, otimizando seu tempo e retenção de conhecimento.
              </p>
            </div>

            {/* Gamificação */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#f5f5f7] flex items-center justify-center shadow-sm">
                <Trophy className="w-8 h-8 text-[#1d1d1f]" />
              </div>
              <h3 className="text-xl font-['Inter'] font-semibold mb-4 text-[#1d1d1f]">Gamificação</h3>
              <p className="text-[#86868b] font-['Inter']">
                Transforme seu aprendizado em uma jornada envolvente com recompensas e desafios.
              </p>
            </div>

            {/* Biblioteca Virtual */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#f5f5f7] flex items-center justify-center shadow-sm">
                <Globe className="w-8 h-8 text-[#1d1d1f]" />
              </div>
              <h3 className="text-xl font-['Inter'] font-semibold mb-4 text-[#1d1d1f]">Biblioteca Virtual</h3>
              <p className="text-[#86868b] font-['Inter']">
                Acesse uma extensa coleção de materiais jurídicos atualizados e exclusivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-[#86868b]">
              Tire suas dúvidas sobre a plataforma.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">
                Como funciona o método de microlearning?
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                O microlearning divide o conteúdo em pequenas "pílulas" de conhecimento que podem ser consumidas em 5-15 minutos. Isso facilita a retenção e permite estudar em qualquer momento livre.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">
                Posso cancelar minha assinatura a qualquer momento?
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Seu acesso continuará até o final do período pago.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">
                Os certificados são reconhecidos?
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                Nossos certificados são emitidos em parceria com instituições renomadas e são válidos para comprovação de horas complementares e desenvolvimento profissional.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">
                Funciona offline?
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                Sim! Você pode baixar as pílulas para estudar offline e sincronizar seu progresso quando voltar a ter conexão com a internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-br from-[#0071e3] to-[#007AFF]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforme sua carreira jurídica hoje
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Junte-se a mais de 10.000 profissionais que já revolucionaram seus estudos com a Schola Juris.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/trilhas" 
              className="bg-white text-[#0071e3] text-lg font-medium px-8 py-4 rounded-full hover:bg-gray-50 transition-colors duration-200 inline-flex items-center justify-center"
            >
              Começar Teste Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="#demo" 
              className="border-2 border-white text-white text-lg font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Assistir Demo
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>7 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Sem compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}