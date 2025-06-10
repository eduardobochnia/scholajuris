// Dados simulados para desenvolvimento com nova estrutura
export interface MockFormation {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  price: number;
  imageUrl: string;
  order: number;
  modules: MockModule[];
}

export interface MockModule {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  formationId: string;
  subjects: MockSubject[];
}

export interface MockSubject {
  id: string;
  title: string;
  slug: string;
  description: string;
  color: string;
  iconUrl: string;
  order: number;
  moduleId: string;
  pills: MockPill[];
}

export interface MockPill {
  id: string;
  title: string;
  slug: string;
  content: any[];
  estimatedTime: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  tags: string[];
  order: number;
  subjectId: string;
  prerequisites: string[];
  relatedPills: string[];
  quizzes: MockQuiz[];
  subject?: {
    id: string;
    title: string;
    slug: string;
    color: string;
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

export const mockFormations: MockFormation[] = [
  {
    id: '1',
    title: 'Formação Completa em Direito Civil',
    slug: 'formacao-direito-civil',
    description: 'Formação completa e aprofundada em Direito Civil, desde os conceitos fundamentais até os temas mais avançados da área.',
    duration: '8 meses',
    level: 'INTERMEDIATE',
    price: 1497,
    imageUrl: '/images/formations/direito-civil.jpg',
    order: 1,
    modules: [
      {
        id: '1',
        title: 'Módulo 1 - Fundamentos do Direito Civil',
        slug: 'fundamentos-direito-civil',
        description: 'Base sólida nos conceitos fundamentais do Direito Civil brasileiro.',
        order: 1,
        formationId: '1',
        subjects: [
          {
            id: '1',
            title: 'Teoria Geral do Direito Civil',
            slug: 'teoria-geral-direito-civil',
            description: 'Conceitos fundamentais e princípios basilares do Direito Civil.',
            color: '#3B82F6',
            iconUrl: '/icons/teoria-geral.svg',
            order: 1,
            moduleId: '1',
            pills: [
              {
                id: '1',
                title: 'Art. 1º do Código Civil - Conceito de Pessoa',
                slug: 'art-1-codigo-civil-conceito-pessoa',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Art. 1º do Código Civil - Conceito de Pessoa'
                  },
                  {
                    type: 'quote',
                    text: 'Toda pessoa é capaz de direitos e deveres na ordem civil.',
                    author: 'Art. 1º do Código Civil Brasileiro'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Análise Doutrinária'
                  },
                  {
                    type: 'paragraph',
                    text: 'O artigo 1º do Código Civil estabelece o princípio fundamental da capacidade jurídica universal. Segundo Maria Helena Diniz, "este dispositivo consagra o princípio da dignidade da pessoa humana, reconhecendo que todo ser humano, pelo simples fato de existir, possui personalidade jurídica".'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Elementos Essenciais'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Capacidade de direito (capacidade de gozo): aptidão para ser titular de direitos',
                      'Capacidade de fato (capacidade de exercício): aptidão para exercer pessoalmente os atos da vida civil',
                      'Personalidade jurídica: atributo inerente a todo ser humano',
                      'Universalidade: aplica-se a todas as pessoas sem distinção'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Jurisprudência Relevante'
                  },
                  {
                    type: 'paragraph',
                    text: 'STJ, REsp 1.159.242/SP: "A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro, conforme dispõe o art. 2º do Código Civil."'
                  }
                ],
                estimatedTime: 15,
                difficulty: 'BEGINNER',
                tags: ['personalidade', 'capacidade', 'direitos fundamentais'],
                order: 1,
                subjectId: '1',
                prerequisites: [],
                relatedPills: ['2', '3'],
                quizzes: [
                  {
                    id: '1',
                    questions: [
                      {
                        id: '1',
                        text: 'Segundo o art. 1º do Código Civil, toda pessoa é:',
                        options: [
                          { text: 'Capaz de direitos e deveres na ordem civil', isCorrect: true },
                          { text: 'Capaz apenas de direitos na ordem civil', isCorrect: false },
                          { text: 'Capaz apenas de deveres na ordem civil', isCorrect: false },
                          { text: 'Incapaz até atingir a maioridade', isCorrect: false }
                        ],
                        type: 'MULTIPLE_CHOICE',
                        explanation: 'O art. 1º estabelece que toda pessoa é capaz de direitos E deveres na ordem civil, consagrando a capacidade jurídica universal.'
                      }
                    ]
                  }
                ]
              },
              {
                id: '2',
                title: 'Art. 2º do Código Civil - Nascituro',
                slug: 'art-2-codigo-civil-nascituro',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Art. 2º do Código Civil - Proteção do Nascituro'
                  },
                  {
                    type: 'quote',
                    text: 'A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro.',
                    author: 'Art. 2º do Código Civil Brasileiro'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Teorias sobre o Nascituro'
                  },
                  {
                    type: 'list',
                    ordered: true,
                    items: [
                      'Teoria Natalista: personalidade inicia com o nascimento com vida',
                      'Teoria da Personalidade Condicional: personalidade desde a concepção, condicionada ao nascimento',
                      'Teoria Concepcionista: personalidade desde a concepção'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Direitos do Nascituro'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Direito à vida e à integridade física',
                      'Direito sucessório (herança)',
                      'Direito a alimentos',
                      'Direito ao reconhecimento de paternidade',
                      'Direito a danos morais'
                    ]
                  }
                ],
                estimatedTime: 12,
                difficulty: 'BEGINNER',
                tags: ['nascituro', 'personalidade', 'concepção'],
                order: 2,
                subjectId: '1',
                prerequisites: ['1'],
                relatedPills: ['1', '3'],
                quizzes: []
              }
            ]
          },
          {
            id: '2',
            title: 'Direito das Obrigações',
            slug: 'direito-obrigacoes',
            description: 'Estudo completo das obrigações civis e seus elementos.',
            color: '#10B981',
            iconUrl: '/icons/obrigacoes.svg',
            order: 2,
            moduleId: '1',
            pills: [
              {
                id: '3',
                title: 'Princípio do Pacta Sunt Servanda',
                slug: 'principio-pacta-sunt-servanda',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Princípio do Pacta Sunt Servanda'
                  },
                  {
                    type: 'paragraph',
                    text: 'O princípio do pacta sunt servanda (os pactos devem ser cumpridos) é um dos pilares fundamentais do direito contratual, estabelecendo que os contratos fazem lei entre as partes.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Fundamento Legal'
                  },
                  {
                    type: 'quote',
                    text: 'O contrato tem força de lei entre as partes.',
                    author: 'Princípio derivado do art. 421 do Código Civil'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Características'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Força obrigatória dos contratos',
                      'Intangibilidade do conteúdo contratual',
                      'Impossibilidade de alteração unilateral',
                      'Execução específica das obrigações'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Limitações Modernas'
                  },
                  {
                    type: 'paragraph',
                    text: 'O princípio sofre limitações pela função social do contrato, boa-fé objetiva e pela teoria da imprevisão (rebus sic stantibus).'
                  }
                ],
                estimatedTime: 18,
                difficulty: 'INTERMEDIATE',
                tags: ['contratos', 'obrigações', 'princípios'],
                order: 1,
                subjectId: '2',
                prerequisites: [],
                relatedPills: ['4', '5'],
                quizzes: []
              },
              {
                id: '4',
                title: 'Cláusula Rebus Sic Stantibus',
                slug: 'clausula-rebus-sic-stantibus',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Cláusula Rebus Sic Stantibus'
                  },
                  {
                    type: 'paragraph',
                    text: 'A cláusula rebus sic stantibus (estando as coisas assim) permite a revisão ou resolução de contratos quando ocorrem mudanças imprevisíveis que tornam excessivamente oneroso o cumprimento da obrigação.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Fundamento Legal'
                  },
                  {
                    type: 'quote',
                    text: 'Nos contratos de execução continuada ou diferida, se a prestação de uma das partes se tornar excessivamente onerosa, com extrema vantagem para a outra, em virtude de acontecimentos extraordinários e imprevisíveis, poderá o devedor pedir a resolução do contrato.',
                    author: 'Art. 478 do Código Civil'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Requisitos para Aplicação'
                  },
                  {
                    type: 'list',
                    ordered: true,
                    items: [
                      'Contrato de execução continuada ou diferida',
                      'Onerosidade excessiva superveniente',
                      'Extrema vantagem para a outra parte',
                      'Acontecimentos extraordinários e imprevisíveis',
                      'Nexo causal entre o fato e a onerosidade'
                    ]
                  }
                ],
                estimatedTime: 20,
                difficulty: 'ADVANCED',
                tags: ['contratos', 'revisão', 'onerosidade excessiva'],
                order: 2,
                subjectId: '2',
                prerequisites: ['3'],
                relatedPills: ['3', '5'],
                quizzes: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Formação em Direito Constitucional',
    slug: 'formacao-direito-constitucional',
    description: 'Formação especializada em Direito Constitucional, abordando desde os princípios fundamentais até o controle de constitucionalidade.',
    duration: '6 meses',
    level: 'INTERMEDIATE',
    price: 1297,
    imageUrl: '/images/formations/direito-constitucional.jpg',
    order: 2,
    modules: [
      {
        id: '2',
        title: 'Módulo 1 - Princípios Constitucionais',
        slug: 'principios-constitucionais',
        description: 'Estudo dos princípios fundamentais da Constituição Federal.',
        order: 1,
        formationId: '2',
        subjects: [
          {
            id: '3',
            title: 'Princípios Fundamentais',
            slug: 'principios-fundamentais',
            description: 'Análise dos princípios fundamentais da República Federativa do Brasil.',
            color: '#8B5CF6',
            iconUrl: '/icons/principios.svg',
            order: 1,
            moduleId: '2',
            pills: []
          }
        ]
      }
    ]
  }
];

// Adicionar referências cruzadas
mockFormations.forEach(formation => {
  formation.modules.forEach(module => {
    module.subjects.forEach(subject => {
      subject.pills.forEach(pill => {
        pill.subject = {
          id: subject.id,
          title: subject.title,
          slug: subject.slug,
          color: subject.color
        };
      });
    });
  });
});

export const mockGlossaryTerms = [
  {
    id: '1',
    term: 'Pacta Sunt Servanda',
    definition: 'Princípio fundamental do direito contratual que estabelece que os contratos fazem lei entre as partes e devem ser cumpridos.',
    category: 'Princípios Contratuais',
    relatedTerms: ['Rebus Sic Stantibus', 'Força Obrigatória', 'Boa-fé Objetiva']
  },
  {
    id: '2',
    term: 'Rebus Sic Stantibus',
    definition: 'Cláusula que permite a revisão ou resolução de contratos quando ocorrem mudanças imprevisíveis que tornam excessivamente oneroso o cumprimento.',
    category: 'Teoria da Imprevisão',
    relatedTerms: ['Pacta Sunt Servanda', 'Onerosidade Excessiva', 'Caso Fortuito']
  },
  {
    id: '3',
    term: 'Nascituro',
    definition: 'Ser humano já concebido, mas que ainda não nasceu. A lei protege seus direitos desde a concepção.',
    category: 'Personalidade Civil',
    relatedTerms: ['Personalidade', 'Capacidade', 'Concepção']
  },
  {
    id: '4',
    term: 'Personalidade Jurídica',
    definition: 'Aptidão para ser sujeito de direitos e obrigações na ordem civil. Todo ser humano possui personalidade jurídica.',
    category: 'Teoria Geral',
    relatedTerms: ['Capacidade', 'Pessoa Natural', 'Direitos Fundamentais']
  }
];

export function findFormationBySlug(slug: string): MockFormation | undefined {
  return mockFormations.find(formation => formation.slug === slug);
}

export function findModuleBySlug(slug: string): MockModule | undefined {
  for (const formation of mockFormations) {
    const module = formation.modules.find(module => module.slug === slug);
    if (module) return module;
  }
  return undefined;
}

export function findSubjectBySlug(slug: string): MockSubject | undefined {
  for (const formation of mockFormations) {
    for (const module of formation.modules) {
      const subject = module.subjects.find(subject => subject.slug === slug);
      if (subject) return subject;
    }
  }
  return undefined;
}

export function findPillBySlug(slug: string): MockPill | undefined {
  for (const formation of mockFormations) {
    for (const module of formation.modules) {
      for (const subject of module.subjects) {
        const pill = subject.pills.find(pill => pill.slug === slug);
        if (pill) return pill;
      }
    }
  }
  return undefined;
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

export function getPillsBySubject(subjectId: string): MockPill[] {
  const subject = findSubjectById(subjectId);
  return subject ? subject.pills : [];
}

export function findSubjectById(id: string): MockSubject | undefined {
  for (const formation of mockFormations) {
    for (const module of formation.modules) {
      const subject = module.subjects.find(subject => subject.id === id);
      if (subject) return subject;
    }
  }
  return undefined;
}