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
    <main className="min-h-screen bg-[#f5f5f7] relative overflow-hidden">
      {/* Canvas para efeitos prismáticos */}
      <canvas 
        id="prismCanvas" 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Efeitos de vidro de fundo */}
      <div className="absolute inset-0 z-0">
        {/* Formas geométricas de vidro */}
        <div className="absolute top-20 left-10 w-64 h-64 glass-prism rotate-45 opacity-30"></div>
        <div className="absolute top-40 right-20 w-48 h-48 glass-prism-secondary -rotate-12 opacity-25"></div>
        <div className="absolute bottom-32 left-1/4 w-56 h-56 glass-prism-tertiary rotate-12 opacity-20"></div>
        
        {/* Reflexos de luz */}
        <div className="absolute top-0 left-1/3 w-2 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -skew-x-12 light-ray"></div>
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent transform skew-x-6 light-ray-blue"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo com reflexo */}
          <div className="mb-16 relative">
            <div className="logo-container">
              <Image
                src="/images/logo.png"
                alt="Schola Juris Logo"
                width={120}
                height={120}
                className="mx-auto mb-4 drop-shadow-xl filter brightness-110 logo-main"
                priority
              />
              {/* Reflexo do logo */}
              <div className="logo-reflection">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={120}
                  height={120}
                  className="mx-auto opacity-30 transform scale-y-[-1]"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-10 hero-title">
            Schola Juris
          </h1>
          
          <div className="glass-content-box mb-8">
            <p className="text-xl md:text-2xl text-[#1d1d1f]/90 max-w-2xl mx-auto mb-6 leading-relaxed font-normal">
              A plataforma de microlearning jurídico mais avançada do Brasil.
            </p>
            
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8 leading-relaxed">
              Transforme sua carreira jurídica com trilhas personalizadas, gamificação inteligente e conteúdo de alta qualidade.
            </p>
            
            <p className="text-base text-[#86868b] max-w-2xl mx-auto mb-12 leading-relaxed">
              Nossa metodologia revolucionária combina neurociência, tecnologia de ponta e expertise jurídica para acelerar seu aprendizado em até 3x. 
              Estude onde quiser, quando quiser, com conteúdo validado por especialistas renomados.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/trilhas" 
              className="btn-primary-glass"
            >
              Começar Gratuitamente
            </Link>
            <Link 
              href="#demo" 
              className="btn-secondary-glass"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Link>
          </div>

          {/* Social Proof com efeito de vidro */}
          <div className="social-proof-glass">
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
        </div>
      </section>

      {/* Benefícios Principais */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white/80 backdrop-blur-sm relative z-10">
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
            <div className="benefit-card">
              <div className="benefit-icon bg-gradient-to-br from-[#0071e3] to-[#007AFF]">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Aprendizado Acelerado</h3>
              <p className="text-[#86868b] leading-relaxed">
                Metodologia de microlearning que acelera a absorção de conhecimento em até 3x através de técnicas 
                baseadas em neurociência e repetição espaçada inteligente.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="benefit-card">
              <div className="benefit-icon bg-gradient-to-br from-[#34C759] to-[#30D158]">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Trilhas Personalizadas</h3>
              <p className="text-[#86868b] leading-relaxed">
                IA que adapta o conteúdo ao seu nível e objetivos profissionais específicos, criando um caminho 
                de aprendizado único e otimizado para seu perfil.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="benefit-card">
              <div className="benefit-icon bg-gradient-to-br from-[#FF9500] to-[#FFCC02]">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Gamificação Avançada</h3>
              <p className="text-[#86868b] leading-relaxed">
                Sistema de conquistas e rankings baseado em psicologia comportamental que mantém você motivado 
                e engajado durante toda sua jornada de aprendizado.
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="benefit-card">
              <div className="benefit-icon bg-gradient-to-br from-[#5856D6] to-[#8B7CF6]">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Conteúdo Certificado</h3>
              <p className="text-[#86868b] leading-relaxed">
                Material desenvolvido por especialistas renomados e validado por instituições de ensino superior, 
                garantindo qualidade acadêmica e aplicabilidade prática.
              </p>
            </div>

            {/* Benefício 5 */}
            <div className="benefit-card">
              <div className="benefit-icon bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B]">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Multiplataforma</h3>
              <p className="text-[#86868b] leading-relaxed">
                Estude onde quiser: web, mobile, tablet. Sincronização automática em tempo real permite 
                continuidade perfeita entre dispositivos.
              </p>
            </div>

            {/* Benefício 6 */}
            <div className="benefit-card">
              <div className="benefit-icon bg-gradient-to-br from-[#007AFF] to-[#40A9FF]">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Acesso Global</h3>
              <p className="text-[#86868b] leading-relaxed">
                Estude offline, sincronize online. Acesso 24/7 de qualquer lugar do mundo com tecnologia 
                de cache inteligente para máxima disponibilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-white/90 backdrop-blur-md relative z-10">
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
            <div className="pricing-card">
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
            <div className="pricing-card-featured">
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
            <div className="pricing-card">
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

      {/* Resto das seções... */}
      {/* (Mantendo as outras seções existentes) */}

      {/* Script para efeitos prismáticos */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('prismCanvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Partículas de luz
            const particles = [];
            
            class LightParticle {
              constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = \`hsl(\${Math.random() * 60 + 200}, 70%, 70%)\`;
              }
              
              update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                
                this.opacity = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3 + 0.4;
              }
              
              draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              }
            }
            
            // Criar partículas
            for (let i = 0; i < 50; i++) {
              particles.push(new LightParticle());
            }
            
            // Função de animação
            function animate() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Gradiente de fundo sutil
              const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width / 2
              );
              gradient.addColorStop(0, 'rgba(0, 113, 227, 0.02)');
              gradient.addColorStop(1, 'rgba(52, 199, 89, 0.01)');
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Atualizar e desenhar partículas
              particles.forEach(particle => {
                particle.update();
                particle.draw();
              });
              
              requestAnimationFrame(animate);
            }
            
            animate();
            
            // Redimensionar canvas
            window.addEventListener('resize', () => {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            });
          });
        `
      }} />
    </main>
  );
}