'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Star, 
  Users, 
  Clock,
  Target,
  Award,
  CheckCircle,
  Brain,
  Scale,
  Gavel,
  Building,
  Shield,
  FileText,
  Lightbulb,
  Eye,
  Zap,
  Crown,
  Sparkles,
  Flame,
  ChevronRight,
  Calendar,
  TrendingUp,
  Heart,
  Microscope,
  Atom
} from 'lucide-react';
import Link from 'next/link';

const certificationLevels = [
  {
    id: 1,
    title: 'Paralegal',
    modules: 36,
    duration: '3 anos',
    color: 'from-green-400 to-green-600',
    icon: <BookOpen className="w-8 h-8" />,
    description: 'Formação básica em assistência jurídica e procedimentos legais fundamentais.',
    skills: [
      'Redação de petições simples',
      'Organização de processos',
      'Atendimento ao cliente',
      'Pesquisa jurídica básica'
    ],
    marketValue: 'R$ 2.500 - R$ 4.000',
    opportunities: ['Escritórios de advocacia', 'Departamentos jurídicos', 'Cartórios']
  },
  {
    id: 2,
    title: 'Operador do Direito',
    modules: 60,
    duration: '5 anos',
    color: 'from-blue-400 to-blue-600',
    icon: <Scale className="w-8 h-8" />,
    description: 'Conhecimento sólido em múltiplas áreas do direito com capacidade operacional.',
    skills: [
      'Análise de contratos complexos',
      'Consultoria jurídica intermediária',
      'Gestão de casos',
      'Negociação jurídica'
    ],
    marketValue: 'R$ 4.000 - R$ 7.000',
    opportunities: ['Consultorias', 'Empresas médias', 'Órgãos públicos']
  },
  {
    id: 3,
    title: 'Especialista em Direito',
    modules: 90,
    duration: '7,5 anos',
    color: 'from-purple-400 to-purple-600',
    icon: <Gavel className="w-8 h-8" />,
    description: 'Especialização profunda em áreas específicas com expertise reconhecida.',
    skills: [
      'Pareceres jurídicos especializados',
      'Estratégias processuais avançadas',
      'Consultoria estratégica',
      'Liderança de equipes jurídicas'
    ],
    marketValue: 'R$ 7.000 - R$ 12.000',
    opportunities: ['Grandes escritórios', 'Multinacionais', 'Tribunais']
  },
  {
    id: 4,
    title: 'Multiespecialista em Direito',
    modules: 120,
    duration: '10 anos',
    color: 'from-orange-400 to-orange-600',
    icon: <Building className="w-8 h-8" />,
    description: 'Domínio avançado em múltiplas especialidades jurídicas.',
    skills: [
      'Consultoria multidisciplinar',
      'Gestão de departamentos jurídicos',
      'Estratégias corporativas complexas',
      'Mentoria e desenvolvimento'
    ],
    marketValue: 'R$ 12.000 - R$ 20.000',
    opportunities: ['Diretor jurídico', 'Consultor sênior', 'Árbitro']
  },
  {
    id: 5,
    title: 'Poliespecialista em Direito',
    modules: 150,
    duration: '12,5 anos',
    color: 'from-red-400 to-red-600',
    icon: <Shield className="w-8 h-8" />,
    description: 'Expertise em praticamente todas as áreas do direito brasileiro.',
    skills: [
      'Visão sistêmica do ordenamento',
      'Inovação jurídica',
      'Liderança institucional',
      'Desenvolvimento de políticas'
    ],
    marketValue: 'R$ 20.000 - R$ 35.000',
    opportunities: ['C-Level', 'Magistratura', 'Academia']
  },
  {
    id: 6,
    title: 'Jurista',
    modules: 180,
    duration: '15 anos',
    color: 'from-indigo-400 to-indigo-600',
    icon: <Crown className="w-8 h-8" />,
    description: 'Reconhecimento como autoridade jurídica com contribuições significativas.',
    skills: [
      'Produção doutrinária',
      'Influência na jurisprudência',
      'Formação de opinião',
      'Liderança intelectual'
    ],
    marketValue: 'R$ 35.000 - R$ 60.000',
    opportunities: ['Tribunais superiores', 'Universidades', 'Think tanks']
  },
  {
    id: 7,
    title: 'Doutrinador',
    modules: 240,
    duration: '20 anos',
    color: 'from-pink-400 to-pink-600',
    icon: <Sparkles className="w-8 h-8" />,
    description: 'Criador de teoria jurídica e influenciador do pensamento legal.',
    skills: [
      'Desenvolvimento teórico',
      'Publicações acadêmicas',
      'Conferências internacionais',
      'Formação de escolas de pensamento'
    ],
    marketValue: 'R$ 60.000 - R$ 100.000',
    opportunities: ['Autor renomado', 'Consultor internacional', 'Reformador legal']
  },
  {
    id: 8,
    title: 'Lenda do Direito',
    modules: 300,
    duration: '25 anos',
    color: 'from-yellow-400 to-yellow-600',
    icon: <Flame className="w-8 h-8" />,
    description: 'Status lendário com impacto transformador no sistema jurídico.',
    skills: [
      'Legado histórico',
      'Transformação sistêmica',
      'Influência geracional',
      'Imortalidade acadêmica'
    ],
    marketValue: 'R$ 100.000+',
    opportunities: ['Ícone da profissão', 'Reformador histórico', 'Patrimônio intelectual']
  }
];

const subjects = [
  'Direito Civil I ao XII',
  'Direito Constitucional I ao VIII',
  'Direito Penal I ao X',
  'Direito Processual Civil I ao VIII',
  'Direito Processual Penal I ao VI',
  'Direito Administrativo I ao VI',
  'Direito Tributário I ao VIII',
  'Direito Empresarial I ao X',
  'Direito do Trabalho I ao VI',
  'Direito Internacional I ao IV',
  'Direito Ambiental I ao IV',
  'Direito Digital I ao IV',
  'Direito da Família I ao VI',
  'Direito das Sucessões I ao IV',
  'Direito Bancário I ao IV',
  'Direito Imobiliário I ao IV',
  'Direito da Propriedade Intelectual I ao IV',
  'Direito do Consumidor I ao IV',
  'Direito Previdenciário I ao IV',
  'Direito Eleitoral I ao IV'
];

const methodology = [
  {
    title: 'Pílulas Ultra-Específicas',
    description: 'Cada pílula aborda um conceito jurídico específico com profundidade extrema.',
    icon: <Atom className="w-6 h-6" />,
    details: [
      'Passagens completas da lei com análise detalhada',
      'Doutrina dos principais autores brasileiros',
      'Jurisprudência atualizada dos tribunais superiores',
      'Infográficos explicativos e mapas mentais',
      'Casos práticos e exemplos reais',
      'Conexões com outras áreas do direito'
    ]
  },
  {
    title: 'Metodologia Científica',
    description: 'Baseada em neurociência e pedagogia avançada para maximizar a retenção.',
    icon: <Microscope className="w-6 h-6" />,
    details: [
      'Repetição espaçada cientificamente calculada',
      'Microlearning com sessões de 15-30 minutos',
      'Gamificação baseada em psicologia comportamental',
      'Avaliações adaptativas com IA',
      'Feedback imediato e personalizado',
      'Trilhas de aprendizado individualizadas'
    ]
  },
  {
    title: 'Revisão por Especialistas',
    description: 'Todo conteúdo é validado por autoridades reconhecidas em cada área.',
    icon: <Eye className="w-6 h-6" />,
    details: [
      'Professores doutores de universidades renomadas',
      'Magistrados de tribunais superiores',
      'Advogados especialistas com mais de 20 anos',
      'Consultores em plataformas educacionais',
      'Revisão técnica e pedagógica contínua',
      'Atualização constante com mudanças legais'
    ]
  }
];

export default function SobrePage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0071e3] via-[#007AFF] to-[#34C759] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Como Funcionam as
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Formações Jurídicas
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Um sistema revolucionário de certificação jurídica que transforma estudantes em 
              verdadeiras autoridades do direito através de um método científico comprovado.
            </p>
            <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Nossa plataforma foi desenvolvida com base em anos de pesquisa em neurociência educacional, 
              combinando as melhores práticas pedagógicas com tecnologia de ponta. Cada elemento foi 
              cuidadosamente projetado para maximizar sua capacidade de aprendizado e retenção de conhecimento, 
              transformando o estudo do direito em uma experiência envolvente e altamente eficaz.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Visão Geral do Sistema */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1d1d1f] mb-6">Sistema de Certificação</h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto mb-8">
              Nosso sistema é baseado em módulos mensais, onde cada módulo representa 30 dias de 
              estudo intensivo e especializado em temas jurídicos específicos.
            </p>
            <p className="text-lg text-[#86868b] max-w-4xl mx-auto leading-relaxed">
              Diferentemente dos métodos tradicionais de ensino jurídico, nossa abordagem fragmenta o conhecimento 
              em unidades digestíveis e interconectadas. Cada módulo é cuidadosamente estruturado para construir 
              sobre o conhecimento anterior, criando uma base sólida e progressiva que permite ao estudante 
              desenvolver expertise real em cada área do direito. Este método, validado por pesquisas em 
              neurociência, aumenta significativamente a retenção de informações e a capacidade de aplicação prática.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white shadow-sm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">1 Módulo = 1 Mês</h3>
                <p className="text-[#86868b] leading-relaxed">
                  Cada módulo é projetado para ser completado em exatamente 30 dias de estudo 
                  consistente e focado, com carga horária otimizada para máximo aproveitamento.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">Progressão Linear</h3>
                <p className="text-[#86868b] leading-relaxed">
                  O conhecimento é construído de forma progressiva e sistemática, com cada módulo 
                  preparando cuidadosamente para o próximo nível de complexidade e especialização.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">Certificação Oficial</h3>
                <p className="text-[#86868b] leading-relaxed">
                  Cada nível concluído garante uma certificação reconhecida no mercado jurídico 
                  brasileiro, validada por instituições parceiras e aceita por empregadores.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6 text-center">
              Diferencial da Nossa Metodologia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#1d1d1f] mb-4">Aprendizado Tradicional</h4>
                <ul className="space-y-2 text-[#86868b]">
                  <li>• Conteúdo extenso e denso</li>
                  <li>• Memorização passiva</li>
                  <li>• Avaliação pontual</li>
                  <li>• Pouca aplicação prática</li>
                  <li>• Ritmo único para todos</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1d1d1f] mb-4">Nossa Metodologia</h4>
                <ul className="space-y-2 text-[#1d1d1f]">
                  <li>• Microlearning focado e específico</li>
                  <li>• Aprendizado ativo e interativo</li>
                  <li>• Avaliação contínua e adaptativa</li>
                  <li>• Casos práticos e aplicação real</li>
                  <li>• Personalização por IA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Níveis de Certificação */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1d1d1f] mb-6">Níveis de Certificação</h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto mb-8">
              Oito níveis progressivos que levam você desde o básico até se tornar uma lenda do direito.
            </p>
            <p className="text-lg text-[#86868b] max-w-4xl mx-auto leading-relaxed">
              Nosso sistema de certificação foi desenvolvido em parceria com especialistas em recursos humanos 
              do setor jurídico e reflete as reais demandas do mercado. Cada nível representa não apenas 
              conhecimento teórico, mas competências práticas validadas e reconhecidas pelos principais 
              escritórios, empresas e instituições jurídicas do país.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {certificationLevels.map((level, index) => (
              <Card 
                key={level.id} 
                className={`bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  selectedLevel === level.id ? 'ring-2 ring-[#0071e3] shadow-xl' : ''
                }`}
                onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <div className="text-white">
                      {level.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#1d1d1f] text-center mb-2">
                    {level.title}
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-[#0071e3] mb-1">
                      {level.modules}
                    </div>
                    <div className="text-sm text-[#86868b]">módulos</div>
                    <div className="text-xs text-[#86868b] mt-1">
                      {level.duration}
                    </div>
                  </div>

                  <p className="text-sm text-[#86868b] text-center leading-relaxed">
                    {level.description}
                  </p>

                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      {selectedLevel === level.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                      <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${
                        selectedLevel === level.id ? 'rotate-90' : ''
                      }`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalhes do Nível Selecionado */}
          {selectedLevel && (
            <Card className="bg-white shadow-lg border-2 border-[#0071e3]/20">
              <CardContent className="p-8">
                {(() => {
                  const level = certificationLevels.find(l => l.id === selectedLevel);
                  if (!level) return null;
                  
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-20 h-20 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center`}>
                            <div className="text-white">
                              {level.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-[#1d1d1f]">{level.title}</h3>
                            <p className="text-[#86868b]">{level.modules} módulos • {level.duration}</p>
                          </div>
                        </div>

                        <p className="text-[#1d1d1f] leading-relaxed mb-6">
                          {level.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="font-bold text-[#1d1d1f] mb-3">Competências Desenvolvidas:</h4>
                          <ul className="space-y-2">
                            {level.skills.map((skill, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-[#86868b]">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <div className="bg-[#f5f5f7] rounded-2xl p-6 mb-6">
                          <h4 className="font-bold text-[#1d1d1f] mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                            Valor de Mercado
                          </h4>
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            {level.marketValue}
                          </div>
                          <p className="text-sm text-[#86868b]">
                            Faixa salarial média para profissionais com esta certificação
                          </p>
                        </div>

                        <div>
                          <h4 className="font-bold text-[#1d1d1f] mb-3 flex items-center">
                            <Building className="w-5 h-5 mr-2 text-[#0071e3]" />
                            Oportunidades de Carreira
                          </h4>
                          <div className="space-y-2">
                            {level.opportunities.map((opportunity, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                <div className="w-2 h-2 bg-[#0071e3] rounded-full"></div>
                                <span className="text-[#1d1d1f] text-sm">{opportunity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Matérias Incluídas */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1d1d1f] mb-6">Matérias Incluídas</h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto mb-8">
              Cobertura completa de todas as áreas do direito brasileiro, organizadas em sequências 
              progressivas para máximo aproveitamento.
            </p>
            <p className="text-lg text-[#86868b] max-w-4xl mx-auto leading-relaxed">
              Nosso currículo abrange todas as disciplinas fundamentais e especializadas do direito brasileiro, 
              desde os conceitos básicos até as áreas mais especializadas e emergentes. Cada matéria é dividida 
              em módulos sequenciais que permitem um aprofundamento gradual e sistemático, garantindo que você 
              desenvolva não apenas conhecimento superficial, mas verdadeira expertise em cada área.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-lg flex items-center justify-center">
                      <Scale className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1d1d1f] text-sm">{subject}</h3>
                      <p className="text-xs text-[#86868b]">Sequência completa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-[#86868b] mb-4">
              E muito mais! Nosso catálogo está em constante expansão com novas áreas emergentes do direito.
            </p>
            <Link href="/biblioteca">
              <Button className="bg-[#0071e3] hover:bg-[#0077ED] text-white">
                <BookOpen className="w-5 h-5 mr-2" />
                Explorar Biblioteca Completa
              </Button>
            </Link>
          </div>
        </div>

        {/* Metodologia de Ensino */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1d1d1f] mb-6">Metodologia de Ensino</h2>
            <p className="text-xl text-[#86868b] max-w-3xl mx-auto mb-8">
              Nossa abordagem combina neurociência, tecnologia e expertise jurídica para criar 
              a experiência de aprendizado mais eficaz do mercado.
            </p>
            <p className="text-lg text-[#86868b] max-w-4xl mx-auto leading-relaxed">
              Desenvolvemos nossa metodologia com base em décadas de pesquisa em neurociência educacional 
              e psicologia cognitiva. Cada elemento da nossa plataforma foi cientificamente validado para 
              maximizar a retenção de informações, acelerar o aprendizado e garantir a aplicação prática 
              do conhecimento adquirido. O resultado é uma experiência de aprendizado que não apenas ensina, 
              mas transforma a forma como você pensa e aplica o direito.
            </p>
          </div>

          <div className="space-y-8">
            {methodology.map((method, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <div className="text-white">
                        {method.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{method.title}</h3>
                      <p className="text-lg text-[#86868b] mb-6 leading-relaxed">
                        {method.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {method.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-[#1d1d1f]">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Revisão por Especialistas */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-[#0071e3] to-[#007AFF] text-white">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <Award className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold mb-6">Revisão por Especialistas</h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Todo nosso conteúdo é meticulosamente revisado por uma equipe de especialistas 
                  reconhecidos nas ciências jurídicas e em plataformas educacionais.
                </p>
                <p className="text-lg text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                  Nossa equipe de revisão inclui alguns dos mais respeitados nomes do direito brasileiro, 
                  garantindo que cada pílula de conhecimento atenda aos mais altos padrões acadêmicos e 
                  profissionais. Além disso, contamos com especialistas em pedagogia digital que asseguram 
                  que o conteúdo seja não apenas preciso, mas também otimizado para o aprendizado online.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-blue-100">Professores Doutores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">25+</div>
                    <div className="text-blue-100">Magistrados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100+</div>
                    <div className="text-blue-100">Advogados Especialistas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-blue-100">Consultores Pedagógicos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-[#0071e3] via-[#007AFF] to-[#34C759] text-white">
            <CardContent className="p-12">
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
                  <Button className="bg-white text-[#0071e3] hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                    <GraduationCap className="w-6 h-6 mr-3" />
                    Explorar Formações
                  </Button>
                </Link>
                <Link href="/biblioteca">
                  <Button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Ver Conteúdo Gratuito
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}