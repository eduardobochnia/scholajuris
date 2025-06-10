// Dados mockados para desenvolvimento - agora integrados com o sistema JSON
export interface MockPill {
  id: string;
  title: string;
  slug: string;
  content: any;
  estimatedTime: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  tags: string[];
  order: number;
  subjectId?: string;
  moduleId?: string;
  subject?: {
    id: string;
    title: string;
    color: string;
  };
  module?: {
    id: string;
    title: string;
    slug: string;
  };
  quizzes: Array<{
    id: string;
    questions: Array<{
      id: string;
      text: string;
      options: Array<{
        text: string;
        isCorrect: boolean;
      }>;
      type: 'MULTIPLE_CHOICE';
      explanation?: string;
    }>;
  }>;
}

export interface MockBook {
  id: string;
  title: string;
  slug: string;
  author: string;
  isbn: string;
  publishedYear: number;
  pages: number;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  synopsis: string;
  tags: string[];
  rating: number;
  reviews: number;
  readingTime: number;
  summary: {
    overview: string;
    mainConcepts: string[];
    practicalImplications: string[];
    criticalAnalysis: string;
    recommendations: string;
  };
  keyTopics: string[];
  targetAudience: string[];
  practicalApplications: string[];
  legislationCovered: string[];
  jurisprudenceReferences: string[];
}

export interface MockSubject {
  id: string;
  title: string;
  description: string;
  color: string;
  pills: MockPill[];
}

export interface MockModule {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  subjects: MockSubject[];
}

export interface MockFormation {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration: string;
  price: number;
  modules: MockModule[];
}

// Dados de exemplo expandidos
export const mockFormations: MockFormation[] = [
  {
    id: 'formacao-direito-civil',
    title: 'Formação Completa em Direito Civil',
    slug: 'formacao-direito-civil',
    description: 'Formação abrangente e aprofundada em direito civil brasileiro, cobrindo desde os conceitos fundamentais até os aspectos mais avançados da matéria.',
    level: 'INTERMEDIATE',
    duration: '36 meses',
    price: 8400,
    modules: [
      {
        id: 'modulo-parte-geral',
        title: 'Parte Geral do Direito Civil',
        slug: 'parte-geral-direito-civil',
        description: 'Fundamentos do direito civil: pessoas, bens e fatos jurídicos',
        order: 1,
        subjects: [
          {
            id: 'pessoas-naturais',
            title: 'Pessoas Naturais',
            description: 'Personalidade jurídica, capacidade civil e direitos da personalidade',
            color: '#3B82F6',
            pills: [
              {
                id: 'personalidade-juridica',
                title: 'Personalidade Jurídica - Conceito e Características',
                slug: 'personalidade-juridica-conceito',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Conceito de Personalidade Jurídica'
                  },
                  {
                    type: 'paragraph',
                    text: 'A personalidade jurídica constitui um dos pilares fundamentais do direito civil brasileiro, representando a aptidão para ser sujeito de direitos e obrigações na ordem jurídica. Este conceito, consagrado no artigo 1º do Código Civil de 2002, estabelece as bases para toda a estrutura das relações jurídicas entre pessoas naturais e jurídicas em nosso ordenamento.'
                  },
                  {
                    type: 'paragraph',
                    text: 'Segundo a doutrina majoritária brasileira, a personalidade jurídica é a aptidão genérica para adquirir direitos e contrair obrigações na ordem civil. Trata-se de um atributo inerente ao ser humano, reconhecido pelo ordenamento jurídico como pressuposto fundamental para a participação nas relações jurídicas.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Características Essenciais'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Universalidade: Todo ser humano possui personalidade jurídica, independentemente de qualquer condição',
                      'Indisponibilidade: Não pode ser objeto de negociação ou renúncia',
                      'Irrenunciabilidade: Ninguém pode abrir mão de sua personalidade jurídica',
                      'Imprescritibilidade: Não se perde pelo não exercício',
                      'Extrapatrimonialidade: Não possui valor econômico direto',
                      'Vitaliciedade: Perdura durante toda a existência da pessoa'
                    ]
                  },
                  {
                    type: 'quote',
                    text: 'A personalidade é a aptidão genérica para adquirir direitos e contrair obrigações ou deveres na ordem civil.',
                    author: 'Caio Mário da Silva Pereira'
                  }
                ],
                estimatedTime: 45,
                difficulty: 'BEGINNER',
                tags: ['personalidade jurídica', 'direito civil', 'pessoa natural', 'capacidade'],
                order: 1,
                subjectId: 'pessoas-naturais',
                moduleId: 'modulo-parte-geral',
                subject: {
                  id: 'pessoas-naturais',
                  title: 'Pessoas Naturais',
                  color: '#3B82F6'
                },
                module: {
                  id: 'modulo-parte-geral',
                  title: 'Parte Geral do Direito Civil',
                  slug: 'parte-geral-direito-civil'
                },
                quizzes: [
                  {
                    id: 'quiz-personalidade-juridica',
                    questions: [
                      {
                        id: 'q1',
                        text: 'Segundo o Código Civil brasileiro, a personalidade jurídica:',
                        options: [
                          { text: 'É adquirida apenas por brasileiros natos', isCorrect: false },
                          { text: 'Pode ser renunciada em casos específicos', isCorrect: false },
                          { text: 'É atributo de toda pessoa, sem distinção', isCorrect: true },
                          { text: 'Depende de registro em cartório', isCorrect: false }
                        ],
                        type: 'MULTIPLE_CHOICE',
                        explanation: 'Conforme art. 1º do Código Civil, "toda pessoa é capaz de direitos e deveres na ordem civil", sem qualquer distinção ou condição.'
                      }
                    ]
                  }
                ]
              },
              {
                id: 'capacidade-civil',
                title: 'Capacidade Civil - Conceito e Espécies',
                slug: 'capacidade-civil-conceito',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Capacidade Civil'
                  },
                  {
                    type: 'paragraph',
                    text: 'A capacidade civil é a medida da personalidade jurídica, representando a aptidão para exercer por si só os atos da vida civil. Enquanto a personalidade jurídica é universal e igual para todos, a capacidade pode variar conforme a idade, o estado mental e outras circunstâncias previstas em lei.'
                  }
                ],
                estimatedTime: 40,
                difficulty: 'BEGINNER',
                tags: ['capacidade civil', 'incapacidade', 'representação'],
                order: 2,
                subjectId: 'pessoas-naturais',
                moduleId: 'modulo-parte-geral',
                subject: {
                  id: 'pessoas-naturais',
                  title: 'Pessoas Naturais',
                  color: '#3B82F6'
                },
                module: {
                  id: 'modulo-parte-geral',
                  title: 'Parte Geral do Direito Civil',
                  slug: 'parte-geral-direito-civil'
                },
                quizzes: []
              }
            ]
          },
          {
            id: 'pessoas-juridicas',
            title: 'Pessoas Jurídicas',
            description: 'Teoria geral das pessoas jurídicas e sua classificação',
            color: '#10B981',
            pills: [
              {
                id: 'conceito-pessoa-juridica',
                title: 'Conceito e Natureza das Pessoas Jurídicas',
                slug: 'conceito-pessoa-juridica',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Pessoas Jurídicas'
                  },
                  {
                    type: 'paragraph',
                    text: 'As pessoas jurídicas são entidades abstratas criadas pelo direito para serem sujeitos de direitos e obrigações, distintas das pessoas que as compõem. Representam uma ficção legal que permite a organização de atividades coletivas e a perpetuação de objetivos que transcendem a vida individual.'
                  }
                ],
                estimatedTime: 35,
                difficulty: 'INTERMEDIATE',
                tags: ['pessoa jurídica', 'personalidade', 'ficção legal'],
                order: 1,
                subjectId: 'pessoas-juridicas',
                moduleId: 'modulo-parte-geral',
                subject: {
                  id: 'pessoas-juridicas',
                  title: 'Pessoas Jurídicas',
                  color: '#10B981'
                },
                module: {
                  id: 'modulo-parte-geral',
                  title: 'Parte Geral do Direito Civil',
                  slug: 'parte-geral-direito-civil'
                },
                quizzes: []
              }
            ]
          }
        ]
      },
      {
        id: 'modulo-obrigacoes',
        title: 'Direito das Obrigações',
        slug: 'direito-obrigacoes',
        description: 'Teoria geral das obrigações e suas modalidades',
        order: 2,
        subjects: [
          {
            id: 'teoria-geral-obrigacoes',
            title: 'Teoria Geral das Obrigações',
            description: 'Conceitos fundamentais do direito obrigacional',
            color: '#F59E0B',
            pills: [
              {
                id: 'conceito-obrigacao',
                title: 'Conceito e Elementos da Obrigação',
                slug: 'conceito-obrigacao',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Conceito de Obrigação'
                  },
                  {
                    type: 'paragraph',
                    text: 'A obrigação é uma relação jurídica de caráter transitório, estabelecida entre devedor e credor, cujo objeto consiste numa prestação pessoal econômica, positiva ou negativa, devida pelo primeiro ao segundo, garantindo-lhe o adimplemento através de seu patrimônio.'
                  }
                ],
                estimatedTime: 50,
                difficulty: 'INTERMEDIATE',
                tags: ['obrigação', 'devedor', 'credor', 'prestação'],
                order: 1,
                subjectId: 'teoria-geral-obrigacoes',
                moduleId: 'modulo-obrigacoes',
                subject: {
                  id: 'teoria-geral-obrigacoes',
                  title: 'Teoria Geral das Obrigações',
                  color: '#F59E0B'
                },
                module: {
                  id: 'modulo-obrigacoes',
                  title: 'Direito das Obrigações',
                  slug: 'direito-obrigacoes'
                },
                quizzes: []
              }
            ]
          }
        ]
      }
    ]
  }
];

// Livros mockados expandidos
export const mockBooks: MockBook[] = [
  {
    id: 'manual-direito-civil-tartuce',
    title: 'Manual de Direito Civil - Volume Único',
    slug: 'manual-direito-civil-tartuce',
    author: 'Flávio Tartuce',
    isbn: '978-85-309-8756-4',
    publishedYear: 2021,
    pages: 1248,
    category: 'Direito Civil',
    difficulty: 'INTERMEDIATE',
    synopsis: 'O Manual de Direito Civil de Flávio Tartuce representa uma das mais completas e atualizadas obras sobre direito civil brasileiro. Com linguagem clara e didática, o autor apresenta todos os institutos fundamentais do direito civil, desde os conceitos básicos da parte geral até os aspectos mais complexos dos contratos e da responsabilidade civil.',
    tags: ['direito civil', 'manual', 'código civil', 'doutrina', 'jurisprudência'],
    rating: 4.8,
    reviews: 1247,
    readingTime: 2400,
    summary: {
      overview: 'Obra completa e atualizada sobre direito civil brasileiro, abordando desde a parte geral até os contratos e responsabilidade civil.',
      mainConcepts: [
        'Personalidade jurídica e capacidade civil como fundamentos do direito das pessoas',
        'Teoria geral dos bens e sua classificação no ordenamento jurídico brasileiro',
        'Fatos, atos e negócios jurídicos como fontes das relações jurídicas',
        'Prescrição e decadência como institutos de estabilização das relações jurídicas',
        'Direitos reais e suas modalidades no sistema brasileiro'
      ],
      practicalImplications: [
        'Fornece base sólida para a prática advocatícia em todas as áreas do direito civil',
        'Orienta a elaboração de contratos e instrumentos jurídicos diversos',
        'Auxilia na compreensão e aplicação da jurisprudência dos tribunais superiores'
      ],
      criticalAnalysis: 'A obra de Flávio Tartuce se destaca no cenário doutrinário brasileiro pela sua capacidade de conciliar rigor técnico com clareza didática. O autor demonstra profundo conhecimento da matéria, apresentando não apenas a doutrina tradicional, mas também as tendências mais modernas do direito civil.',
      recommendations: 'Esta obra é altamente recomendada para estudantes de direito a partir do segundo ano, concurseiros que buscam aprovação em certames de alto nível, advogados que atuam em direito civil e magistrados que necessitam de fonte confiável para fundamentação de decisões.'
    },
    keyTopics: [
      'Personalidade jurídica',
      'Capacidade civil',
      'Direitos da personalidade',
      'Pessoas jurídicas',
      'Bens e patrimônio',
      'Negócios jurídicos',
      'Prescrição e decadência',
      'Direitos reais',
      'Obrigações',
      'Contratos',
      'Responsabilidade civil',
      'Direito de família',
      'Sucessões'
    ],
    targetAudience: [
      'Estudantes de direito (2º ao 5º ano)',
      'Concurseiros de nível superior',
      'Advogados civilistas',
      'Magistrados e membros do Ministério Público',
      'Professores de direito civil',
      'Pesquisadores em direito privado'
    ],
    practicalApplications: [
      'Elaboração de peças processuais em ações cíveis',
      'Redação de contratos e instrumentos jurídicos',
      'Consultoria jurídica em direito civil',
      'Fundamentação de decisões judiciais',
      'Preparação para concursos públicos',
      'Pesquisa acadêmica em direito civil'
    ],
    legislationCovered: [
      'Código Civil (Lei 10.406/2002)',
      'Código de Processo Civil (Lei 13.105/2015)',
      'Estatuto da Criança e do Adolescente (Lei 8.069/1990)',
      'Código de Defesa do Consumidor (Lei 8.078/1990)',
      'Lei de Registros Públicos (Lei 6.015/1973)',
      'Marco Civil da Internet (Lei 12.965/2014)'
    ],
    jurisprudenceReferences: [
      'STF - RE 878.694/MG (Direito ao esquecimento)',
      'STJ - REsp 1.540.580/DF (Responsabilidade civil por abandono afetivo)',
      'STJ - REsp 1.629.255/RJ (Multipropriedade imobiliária)',
      'STF - RE 646.721/RS (Repercussão geral - Responsabilidade civil do Estado)',
      'STJ - REsp 1.642.997/RJ (Direito à desconexão digital)'
    ]
  },
  {
    id: 'curso-direito-constitucional-moraes',
    title: 'Curso de Direito Constitucional',
    slug: 'curso-direito-constitucional-moraes',
    author: 'Alexandre de Moraes',
    isbn: '978-85-224-5436-2',
    publishedYear: 2023,
    pages: 1056,
    category: 'Direito Constitucional',
    difficulty: 'ADVANCED',
    synopsis: 'Obra de referência no estudo do Direito Constitucional brasileiro, apresentando análise sistemática da Constituição Federal de 1988, com ampla jurisprudência do STF e doutrina atualizada.',
    tags: ['direito constitucional', 'constituição federal', 'STF', 'direitos fundamentais'],
    rating: 4.9,
    reviews: 892,
    readingTime: 2800,
    summary: {
      overview: 'Análise completa e sistemática da Constituição Federal de 1988, com jurisprudência atualizada do Supremo Tribunal Federal.',
      mainConcepts: [
        'Teoria geral do Estado e da Constituição',
        'Direitos e garantias fundamentais',
        'Organização do Estado brasileiro',
        'Organização dos Poderes',
        'Controle de constitucionalidade'
      ],
      practicalImplications: [
        'Base fundamental para concursos da magistratura',
        'Referência para peticionamento em ações constitucionais',
        'Orientação para interpretação constitucional'
      ],
      criticalAnalysis: 'Alexandre de Moraes consolida sua posição como um dos principais constitucionalistas brasileiros, oferecendo uma obra que combina rigor acadêmico com aplicabilidade prática.',
      recommendations: 'Indispensável para estudantes avançados, concurseiros da área jurídica, magistrados, promotores e advogados que atuam em direito público.'
    },
    keyTopics: [
      'Teoria da Constituição',
      'Direitos fundamentais',
      'Organização do Estado',
      'Separação de poderes',
      'Controle de constitucionalidade',
      'Processo legislativo',
      'Administração pública',
      'Ordem econômica',
      'Ordem social',
      'Defesa do Estado'
    ],
    targetAudience: [
      'Estudantes de direito avançados',
      'Concurseiros de alto nível',
      'Magistrados',
      'Membros do Ministério Público',
      'Advogados publicistas',
      'Professores universitários'
    ],
    practicalApplications: [
      'Elaboração de ações constitucionais',
      'Fundamentação de decisões judiciais',
      'Consultoria em direito público',
      'Preparação para concursos públicos',
      'Pesquisa acadêmica constitucional'
    ],
    legislationCovered: [
      'Constituição Federal de 1988',
      'Leis complementares constitucionais',
      'Regimentos dos tribunais superiores',
      'Legislação de direitos fundamentais'
    ],
    jurisprudenceReferences: [
      'STF - ADI 4.277/DF (União homoafetiva)',
      'STF - RE 466.343/SP (Prisão civil por dívida)',
      'STF - ADC 41/DF (Escola sem partido)',
      'STF - ADPF 132/RJ (União estável homoafetiva)'
    ]
  }
];

// Termos do glossário
export const mockGlossaryTerms = [
  {
    id: '1',
    term: 'Personalidade Jurídica',
    definition: 'Aptidão genérica para adquirir direitos e contrair obrigações na ordem civil. É um atributo inerente a toda pessoa humana, reconhecido pelo ordenamento jurídico.',
    category: 'Direito Civil',
    relatedTerms: ['Capacidade Civil', 'Pessoa Natural', 'Sujeito de Direito']
  },
  {
    id: '2',
    term: 'Capacidade Civil',
    definition: 'Medida da personalidade jurídica. Representa a aptidão para exercer por si só os atos da vida civil, podendo ser plena ou limitada conforme a idade e outras circunstâncias.',
    category: 'Direito Civil',
    relatedTerms: ['Personalidade Jurídica', 'Incapacidade', 'Representação Legal']
  },
  {
    id: '3',
    term: 'Devido Processo Legal',
    definition: 'Princípio constitucional que garante a todos o direito a um processo justo, com observância das garantias processuais fundamentais.',
    category: 'Direito Constitucional',
    relatedTerms: ['Ampla Defesa', 'Contraditório', 'Direitos Fundamentais']
  },
  {
    id: '4',
    term: 'Boa-fé Objetiva',
    definition: 'Princípio que impõe às partes de uma relação jurídica o dever de agir com lealdade, honestidade e cooperação, independentemente de sua intenção subjetiva.',
    category: 'Direito Civil',
    relatedTerms: ['Função Social do Contrato', 'Princípios Contratuais', 'Teoria Geral dos Contratos']
  },
  {
    id: '5',
    term: 'Supremacia do Interesse Público',
    definition: 'Princípio do direito administrativo que estabelece a prevalência do interesse coletivo sobre o interesse particular.',
    category: 'Direito Administrativo',
    relatedTerms: ['Interesse Público', 'Administração Pública', 'Poder de Polícia']
  }
];

// Funções auxiliares para busca
export function findModuleBySlug(slug: string): MockModule | null {
  for (const formation of mockFormations) {
    const module = formation.modules.find(m => m.slug === slug);
    if (module) return module;
  }
  return null;
}

export function findPillBySlug(slug: string): MockPill | null {
  for (const formation of mockFormations) {
    for (const module of formation.modules) {
      for (const subject of module.subjects) {
        const pill = subject.pills.find(p => p.slug === slug);
        if (pill) return pill;
      }
    }
  }
  return null;
}

export function findBookBySlug(slug: string): MockBook | null {
  return mockBooks.find(book => book.slug === slug) || null;
}

export function findFormationBySlug(slug: string): MockFormation | null {
  return mockFormations.find(formation => formation.slug === slug) || null;
}

export function getAllPills(): MockPill[] {
  const pills: MockPill[] = [];
  for (const formation of mockFormations) {
    for (const module of formation.modules) {
      for (const subject of module.subjects) {
        pills.push(...subject.pills);
      }
    }
  }
  return pills;
}