// Dados simulados para desenvolvimento
export interface MockModule {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  pills: MockPill[];
}

export interface MockPill {
  id: string;
  title: string;
  slug: string;
  content: any[];
  order: number;
  moduleId: string;
  quizzes: MockQuiz[];
  module?: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface MockQuiz {
  id: string;
  questions: MockQuestion[];
}

export interface MockQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  type: 'MULTIPLE_CHOICE';
  explanation: string;
}

export const mockModules: MockModule[] = [
  {
    id: '1',
    title: 'Introdução ao Direito',
    slug: 'introducao-ao-direito',
    description: 'Conceitos fundamentais do Direito e sua importância na sociedade.',
    order: 1,
    pills: [
      {
        id: '1',
        title: 'Conceitos Básicos',
        slug: 'conceitos-basicos',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'O que é Direito?'
          },
          {
            type: 'paragraph',
            text: 'O Direito é um conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres para os indivíduos e organizações. É uma ciência social aplicada que busca organizar a convivência humana de forma justa e harmoniosa.'
          },
          {
            type: 'paragraph',
            text: 'Essas normas têm como objetivo principal manter a ordem social, garantir a justiça e proteger os direitos fundamentais de todos os cidadãos. O Direito evolui constantemente para acompanhar as transformações da sociedade.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Características Fundamentais do Direito'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Bilateralidade: estabelece direitos e deveres recíprocos',
              'Imperatividade: suas normas são obrigatórias e vinculantes',
              'Coercibilidade: pode ser imposto pela força do Estado',
              'Heteronomia: vem de uma autoridade externa ao indivíduo',
              'Generalidade: aplica-se a todos de forma igual',
              'Abstração: regula situações em tese, não casos específicos'
            ]
          },
          {
            type: 'quote',
            text: 'O Direito é a arte do bom e do justo.',
            author: 'Ulpiano, jurista romano'
          }
        ],
        order: 1,
        moduleId: '1',
        quizzes: [
          {
            id: '1',
            questions: [
              {
                id: '1',
                text: 'O que é Direito?',
                options: [
                  { text: 'Um conjunto de normas que regulam a vida em sociedade', isCorrect: true },
                  { text: 'Apenas leis escritas pelo governo', isCorrect: false },
                  { text: 'Regras criadas pelos juízes', isCorrect: false },
                  { text: 'Costumes antigos da sociedade', isCorrect: false }
                ],
                type: 'MULTIPLE_CHOICE',
                explanation: 'O Direito é um conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres para manter a ordem social e garantir a justiça.'
              },
              {
                id: '2',
                text: 'Qual das seguintes é uma característica fundamental do Direito?',
                options: [
                  { text: 'Opcional', isCorrect: false },
                  { text: 'Imperativo', isCorrect: true },
                  { text: 'Sugestivo', isCorrect: false },
                  { text: 'Temporário', isCorrect: false }
                ],
                type: 'MULTIPLE_CHOICE',
                explanation: 'A imperatividade é uma característica fundamental do Direito, tornando suas normas obrigatórias e vinculantes para todos.'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'Fontes do Direito',
        slug: 'fontes-do-direito',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Fontes do Direito'
          },
          {
            type: 'paragraph',
            text: 'As fontes do Direito são os meios pelos quais as normas jurídicas se manifestam e se tornam conhecidas na sociedade. Elas representam a origem e o fundamento das regras que governam nossa vida em comunidade.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Classificação das Fontes'
          },
          {
            type: 'paragraph',
            text: 'As fontes do Direito podem ser classificadas em formais e materiais:'
          },
          {
            type: 'heading',
            level: 4,
            text: 'Fontes Formais'
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Lei: norma escrita emanada do Poder Legislativo, seguindo processo específico',
              'Costume: prática reiterada e aceita como obrigatória pela sociedade',
              'Jurisprudência: decisões reiteradas dos tribunais sobre casos similares',
              'Doutrina: opinião e interpretação dos estudiosos e especialistas do Direito',
              'Princípios Gerais do Direito: valores fundamentais que orientam o ordenamento'
            ]
          }
        ],
        order: 2,
        moduleId: '1',
        quizzes: [
          {
            id: '2',
            questions: [
              {
                id: '3',
                text: 'Qual é a principal fonte formal do Direito no Brasil?',
                options: [
                  { text: 'Costume', isCorrect: false },
                  { text: 'Lei', isCorrect: true },
                  { text: 'Jurisprudência', isCorrect: false },
                  { text: 'Doutrina', isCorrect: false }
                ],
                type: 'MULTIPLE_CHOICE',
                explanation: 'A lei é a principal fonte formal do Direito no Brasil, sendo norma escrita emanada do Poder Legislativo seguindo processo específico.'
              }
            ]
          }
        ]
      },
      {
        id: '3',
        title: 'Aplicação das Normas',
        slug: 'aplicacao-das-normas',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Aplicação das Normas Jurídicas'
          },
          {
            type: 'paragraph',
            text: 'A aplicação das normas jurídicas é o processo pelo qual as regras abstratas do Direito são concretizadas em situações específicas. Este processo envolve interpretação, subsunção e decisão.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Elementos da Aplicação'
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Identificação da norma aplicável ao caso',
              'Interpretação do conteúdo e alcance da norma',
              'Análise dos fatos relevantes',
              'Subsunção dos fatos à norma',
              'Decisão e suas consequências jurídicas'
            ]
          }
        ],
        order: 3,
        moduleId: '1',
        quizzes: []
      },
      {
        id: '4',
        title: 'Interpretação Jurídica',
        slug: 'interpretacao-juridica',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Métodos de Interpretação Jurídica'
          },
          {
            type: 'paragraph',
            text: 'A interpretação jurídica é a atividade intelectual que busca determinar o sentido e o alcance das normas jurídicas. É fundamental para a correta aplicação do Direito aos casos concretos.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Métodos Clássicos de Interpretação'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Interpretação Literal ou Gramatical: análise do texto da norma',
              'Interpretação Lógica ou Sistemática: consideração do contexto normativo',
              'Interpretação Histórica: investigação da intenção do legislador',
              'Interpretação Teleológica: busca da finalidade da norma',
              'Interpretação Sociológica: adaptação às necessidades sociais atuais'
            ]
          }
        ],
        order: 4,
        moduleId: '1',
        quizzes: []
      },
      {
        id: '5',
        title: 'Quiz de Revisão',
        slug: 'quiz-revisao',
        content: [
          {
            type: 'paragraph',
            text: 'Teste seus conhecimentos sobre os conceitos fundamentais do Direito. Este quiz aborda os principais temas estudados no módulo de Introdução ao Direito.'
          }
        ],
        order: 5,
        moduleId: '1',
        quizzes: [
          {
            id: '3',
            questions: [
              {
                id: '4',
                text: 'A interpretação que busca a finalidade da norma é chamada de:',
                options: [
                  { text: 'Literal', isCorrect: false },
                  { text: 'Histórica', isCorrect: false },
                  { text: 'Teleológica', isCorrect: true },
                  { text: 'Sistemática', isCorrect: false }
                ],
                type: 'MULTIPLE_CHOICE',
                explanation: 'A interpretação teleológica busca identificar a finalidade, o objetivo que a norma pretende alcançar.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Direito Constitucional',
    slug: 'direito-constitucional',
    description: 'Estudo da Constituição Federal e seus princípios fundamentais.',
    order: 2,
    pills: [
      {
        id: '6',
        title: 'Princípios Constitucionais',
        slug: 'principios-constitucionais',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Princípios Fundamentais da Constituição'
          },
          {
            type: 'paragraph',
            text: 'Os princípios constitucionais são as bases fundamentais que orientam todo o ordenamento jurídico brasileiro. Eles representam os valores mais importantes da nossa sociedade e servem como diretrizes para a interpretação e aplicação de todas as normas.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Princípios Fundamentais (Arts. 1º a 4º da CF/88)'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Soberania: poder supremo do Estado brasileiro',
              'Cidadania: participação ativa na vida política',
              'Dignidade da pessoa humana: valor supremo do ser humano',
              'Valores sociais do trabalho e da livre iniciativa',
              'Pluralismo político: diversidade de ideias e partidos'
            ]
          }
        ],
        order: 1,
        moduleId: '2',
        quizzes: []
      },
      {
        id: '7',
        title: 'Direitos Fundamentais',
        slug: 'direitos-fundamentais',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Direitos e Garantias Fundamentais'
          },
          {
            type: 'paragraph',
            text: 'Os direitos fundamentais são direitos básicos e essenciais de todos os cidadãos, protegidos pela Constituição Federal. Eles representam conquistas históricas da humanidade na luta pela dignidade e liberdade.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Classificação dos Direitos Fundamentais'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Direitos Individuais: vida, liberdade, igualdade, segurança, propriedade',
              'Direitos Coletivos: direitos de grupos e comunidades',
              'Direitos Sociais: educação, saúde, trabalho, moradia',
              'Direitos de Nacionalidade: vínculo jurídico com o Estado',
              'Direitos Políticos: participação na vida política do país'
            ]
          }
        ],
        order: 2,
        moduleId: '2',
        quizzes: []
      }
    ]
  },
  {
    id: '3',
    title: 'Direito Civil',
    slug: 'direito-civil',
    description: 'Relações jurídicas entre particulares e seus direitos.',
    order: 3,
    pills: [
      {
        id: '8',
        title: 'Pessoas Naturais',
        slug: 'pessoas-naturais',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Conceito de Pessoa Natural'
          },
          {
            type: 'paragraph',
            text: 'Pessoa natural é o ser humano considerado como sujeito de direitos e obrigações. Todo ser humano tem personalidade jurídica, que é a aptidão para ser titular de direitos e deveres na ordem civil.'
          },
          {
            type: 'heading',
            level: 3,
            text: 'Início da Personalidade'
          },
          {
            type: 'paragraph',
            text: 'A personalidade civil da pessoa começa do nascimento com vida. No entanto, a lei põe a salvo, desde a concepção, os direitos do nascituro.'
          }
        ],
        order: 1,
        moduleId: '3',
        quizzes: []
      },
      {
        id: '9',
        title: 'Capacidade Civil',
        slug: 'capacidade-civil',
        content: [
          {
            type: 'heading',
            level: 2,
            text: 'Capacidade de Direito e de Fato'
          },
          {
            type: 'paragraph',
            text: 'A capacidade civil divide-se em capacidade de direito (ou de gozo) e capacidade de fato (ou de exercício). A primeira é a aptidão para ser titular de direitos, enquanto a segunda é a aptidão para exercer pessoalmente os atos da vida civil.'
          }
        ],
        order: 2,
        moduleId: '3',
        quizzes: []
      }
    ]
  }
];

// Adicionar referência do módulo em cada pílula
mockModules.forEach(module => {
  module.pills.forEach(pill => {
    pill.module = {
      id: module.id,
      title: module.title,
      slug: module.slug
    };
  });
});

export const mockGlossaryTerms = [
  {
    id: '1',
    term: 'Direito',
    definition: 'Conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres para os indivíduos e organizações.',
    category: 'Conceitos Fundamentais',
    relatedTerms: ['Lei', 'Norma', 'Ordenamento Jurídico']
  },
  {
    id: '2',
    term: 'Lei',
    definition: 'Norma jurídica escrita, emanada do Poder Legislativo, que estabelece regras de conduta obrigatórias para todos.',
    category: 'Fontes do Direito',
    relatedTerms: ['Direito', 'Norma', 'Legislação']
  },
  {
    id: '3',
    term: 'Constituição',
    definition: 'Lei fundamental de um Estado, que estabelece a organização política, os direitos fundamentais e os princípios básicos da ordem jurídica.',
    category: 'Direito Constitucional',
    relatedTerms: ['Direitos Fundamentais', 'Estado', 'Supremacia Constitucional']
  },
  {
    id: '4',
    term: 'Jurisprudência',
    definition: 'Conjunto de decisões reiteradas dos tribunais sobre casos similares, que serve como orientação para casos futuros.',
    category: 'Fontes do Direito',
    relatedTerms: ['Tribunal', 'Precedente', 'Decisão Judicial']
  },
  {
    id: '5',
    term: 'Doutrina',
    definition: 'Opinião e interpretação dos estudiosos e especialistas do Direito sobre questões jurídicas.',
    category: 'Fontes do Direito',
    relatedTerms: ['Jurista', 'Interpretação', 'Ciência Jurídica']
  },
  {
    id: '6',
    term: 'Princípios Gerais do Direito',
    definition: 'Valores fundamentais que orientam o ordenamento jurídico, servindo como base para a interpretação e aplicação das normas.',
    category: 'Conceitos Fundamentais',
    relatedTerms: ['Valores', 'Interpretação', 'Ordenamento Jurídico']
  },
  {
    id: '7',
    term: 'Direitos Fundamentais',
    definition: 'Direitos básicos e essenciais de todos os cidadãos, protegidos pela Constituição Federal.',
    category: 'Direito Constitucional',
    relatedTerms: ['Constituição', 'Dignidade Humana', 'Cidadania']
  },
  {
    id: '8',
    term: 'Estado de Direito',
    definition: 'Forma de organização política em que o poder estatal está limitado pelo Direito e pela Constituição.',
    category: 'Direito Constitucional',
    relatedTerms: ['Constituição', 'Legalidade', 'Separação de Poderes']
  },
  {
    id: '9',
    term: 'Hermenêutica Jurídica',
    definition: 'Arte e ciência de interpretar as normas jurídicas, buscando determinar seu sentido e alcance.',
    category: 'Interpretação',
    relatedTerms: ['Interpretação', 'Métodos Interpretativos', 'Aplicação do Direito']
  },
  {
    id: '10',
    term: 'Subsunção',
    definition: 'Processo lógico de aplicação da norma jurídica ao caso concreto, verificando se os fatos se enquadram na hipótese normativa.',
    category: 'Aplicação do Direito',
    relatedTerms: ['Aplicação', 'Norma', 'Caso Concreto']
  }
];

export function findModuleBySlug(slug: string): MockModule | undefined {
  return mockModules.find(module => module.slug === slug);
}

export function findPillBySlug(slug: string): MockPill | undefined {
  for (const module of mockModules) {
    const pill = module.pills.find(pill => pill.slug === slug);
    if (pill) return pill;
  }
  return undefined;
}