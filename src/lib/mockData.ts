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

export interface MockBook {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  readingTime: number;
  pages: number;
  publishedYear: number;
  isbn: string;
  cover: string;
  synopsis: string;
  keyTopics: string[];
  legalAreas: string[];
  targetAudience: string[];
  practicalApplications: string[];
  jurisprudenceReferences: string[];
  legislationCovered: string[];
  rating: number;
  reviews: number;
  tags: string[];
  relatedBooks: string[];
  summary: {
    overview: string;
    mainConcepts: string[];
    practicalImplications: string[];
    criticalAnalysis: string;
    recommendations: string;
  };
}

export const mockBooks: MockBook[] = [
  {
    id: '1',
    title: 'Teoria Geral do Direito Civil Brasileiro',
    slug: 'teoria-geral-direito-civil-brasileiro',
    author: 'Maria Helena Diniz',
    category: 'Direito Civil',
    difficulty: 'INTERMEDIATE',
    readingTime: 45,
    pages: 680,
    publishedYear: 2023,
    isbn: '978-85-02-63847-2',
    cover: '/books/covers/teoria-geral-civil.jpg',
    synopsis: 'Obra fundamental que apresenta de forma sistemática e didática os conceitos basilares do Direito Civil brasileiro, abordando desde a teoria geral das pessoas até os institutos mais complexos da responsabilidade civil.',
    keyTopics: [
      'Personalidade Jurídica',
      'Capacidade Civil',
      'Direitos da Personalidade',
      'Pessoas Jurídicas',
      'Bens e Patrimônio',
      'Fatos e Atos Jurídicos',
      'Negócios Jurídicos',
      'Prescrição e Decadência'
    ],
    legalAreas: ['Direito Civil', 'Teoria Geral do Direito'],
    targetAudience: ['Estudantes de Direito', 'Advogados', 'Magistrados', 'Professores'],
    practicalApplications: [
      'Elaboração de contratos',
      'Análise de capacidade para atos jurídicos',
      'Identificação de vícios em negócios jurídicos',
      'Aplicação de prazos prescricionais'
    ],
    jurisprudenceReferences: [
      'STJ - REsp 1.159.242/SP (Personalidade do nascituro)',
      'STF - RE 898.060/SC (Direito ao nome)',
      'STJ - REsp 1.540.580/DF (Danos morais por abandono afetivo)'
    ],
    legislationCovered: [
      'Código Civil (Lei 10.406/2002)',
      'Constituição Federal de 1988',
      'Lei de Registros Públicos (Lei 6.015/73)',
      'Estatuto da Pessoa com Deficiência (Lei 13.146/15)'
    ],
    rating: 4.8,
    reviews: 1247,
    tags: ['civil', 'teoria geral', 'personalidade', 'capacidade', 'negócios jurídicos'],
    relatedBooks: ['2', '3', '5'],
    summary: {
      overview: 'Esta obra constitui um dos pilares fundamentais para o estudo do Direito Civil brasileiro. Maria Helena Diniz apresenta com clareza e profundidade os institutos básicos que regem as relações civis, oferecendo uma base sólida para compreensão de toda a sistemática civilista.',
      mainConcepts: [
        'Conceito e evolução histórica da personalidade jurídica',
        'Distinção entre capacidade de direito e capacidade de fato',
        'Classificação e regime jurídico dos bens',
        'Elementos essenciais dos negócios jurídicos',
        'Teoria das invalidades e seus efeitos'
      ],
      practicalImplications: [
        'Fornece base teórica essencial para a prática advocatícia',
        'Orienta na interpretação e aplicação das normas civis',
        'Facilita a compreensão de casos complexos envolvendo capacidade',
        'Auxilia na identificação de vícios contratuais'
      ],
      criticalAnalysis: 'A obra se destaca pela sistematização didática e pela atualização constante com a jurisprudência mais recente. A autora consegue equilibrar rigor técnico com clareza expositiva, tornando conceitos complexos acessíveis sem perder a profundidade necessária.',
      recommendations: 'Leitura obrigatória para estudantes de Direito a partir do 2º período e profissionais que atuam na área cível. Recomenda-se a leitura sequencial dos capítulos, pois os conceitos são construídos de forma progressiva.'
    }
  },
  {
    id: '2',
    title: 'Direito Constitucional Esquematizado',
    slug: 'direito-constitucional-esquematizado',
    author: 'Pedro Lenza',
    category: 'Direito Constitucional',
    difficulty: 'BEGINNER',
    readingTime: 35,
    pages: 1420,
    publishedYear: 2024,
    isbn: '978-85-02-64891-4',
    cover: '/books/covers/constitucional-esquematizado.jpg',
    synopsis: 'Manual completo e atualizado de Direito Constitucional, apresentado de forma esquematizada e didática, ideal para estudantes e concurseiros que buscam compreender os fundamentos da Constituição Federal.',
    keyTopics: [
      'Teoria da Constituição',
      'Princípios Fundamentais',
      'Direitos e Garantias Fundamentais',
      'Organização do Estado',
      'Organização dos Poderes',
      'Defesa do Estado e das Instituições',
      'Tributação e Orçamento',
      'Controle de Constitucionalidade'
    ],
    legalAreas: ['Direito Constitucional', 'Direitos Fundamentais', 'Organização do Estado'],
    targetAudience: ['Estudantes de Direito', 'Concurseiros', 'Servidores Públicos', 'Advogados Públicos'],
    practicalApplications: [
      'Preparação para concursos públicos',
      'Análise de constitucionalidade de leis',
      'Defesa de direitos fundamentais',
      'Compreensão da estrutura estatal'
    ],
    jurisprudenceReferences: [
      'STF - ADI 4.277/DF (União homoafetiva)',
      'STF - ADPF 54/DF (Anencefalia)',
      'STF - RE 641.320/RS (Direito à saúde)',
      'STF - ADI 5.357/DF (Financiamento de campanhas)'
    ],
    legislationCovered: [
      'Constituição Federal de 1988',
      'Lei 9.868/99 (Controle de Constitucionalidade)',
      'Lei 9.882/99 (ADPF)',
      'Regimento Interno do STF'
    ],
    rating: 4.9,
    reviews: 2156,
    tags: ['constitucional', 'direitos fundamentais', 'controle constitucionalidade', 'organização estado'],
    relatedBooks: ['4', '6', '7'],
    summary: {
      overview: 'Pedro Lenza apresenta o Direito Constitucional de forma sistemática e acessível, utilizando esquemas, quadros e mapas mentais que facilitam a compreensão e memorização dos conceitos. A obra é constantemente atualizada com as mais recentes decisões do STF.',
      mainConcepts: [
        'Supremacia e rigidez constitucional',
        'Eficácia e aplicabilidade das normas constitucionais',
        'Princípios da dignidade humana e proporcionalidade',
        'Separação de poderes e sistema de freios e contrapesos',
        'Federalismo brasileiro e repartição de competências'
      ],
      practicalImplications: [
        'Base fundamental para atuação em Direito Público',
        'Essencial para compreensão do sistema jurídico brasileiro',
        'Ferramenta indispensável para concursos da área jurídica',
        'Orientação para defesa de direitos constitucionais'
      ],
      criticalAnalysis: 'A metodologia esquematizada torna a obra especialmente útil para revisões e consultas rápidas. O autor consegue abordar temas complexos de forma didática, sem perder o rigor técnico necessário. A constante atualização jurisprudencial é um diferencial importante.',
      recommendations: 'Ideal para iniciantes no estudo do Direito Constitucional e para revisão de candidatos a concursos. Recomenda-se o uso conjunto com a Constituição Federal anotada para aprofundamento dos dispositivos.'
    }
  },
  {
    id: '3',
    title: 'Curso de Direito Penal - Parte Geral',
    slug: 'curso-direito-penal-parte-geral',
    author: 'Rogério Greco',
    category: 'Direito Penal',
    difficulty: 'INTERMEDIATE',
    readingTime: 40,
    pages: 896,
    publishedYear: 2023,
    isbn: '978-85-309-8547-1',
    cover: '/books/covers/direito-penal-greco.jpg',
    synopsis: 'Obra abrangente sobre a Parte Geral do Direito Penal, que analisa de forma crítica e sistemática os institutos fundamentais do Direito Penal brasileiro, com rica fundamentação doutrinária e jurisprudencial.',
    keyTopics: [
      'Teoria Geral do Crime',
      'Tipicidade e Antijuridicidade',
      'Culpabilidade',
      'Tentativa e Consumação',
      'Concurso de Pessoas',
      'Penas e Medidas de Segurança',
      'Aplicação da Pena',
      'Extinção da Punibilidade'
    ],
    legalAreas: ['Direito Penal', 'Criminologia', 'Execução Penal'],
    targetAudience: ['Estudantes de Direito', 'Advogados Criminalistas', 'Promotores', 'Defensores Públicos'],
    practicalApplications: [
      'Análise de tipicidade penal',
      'Identificação de excludentes de ilicitude',
      'Cálculo de penas',
      'Defesa em processos criminais'
    ],
    jurisprudenceReferences: [
      'STF - HC 126.292/SP (Execução provisória)',
      'STJ - HC 598.051/SC (Legítima defesa)',
      'STF - RE 971.959/RS (Progressão de regime)',
      'STJ - REsp 1.736.717/RS (Erro de tipo)'
    ],
    legislationCovered: [
      'Código Penal (Decreto-Lei 2.848/40)',
      'Lei de Execução Penal (Lei 7.210/84)',
      'Lei de Crimes Hediondos (Lei 8.072/90)',
      'Lei Maria da Penha (Lei 11.340/06)'
    ],
    rating: 4.7,
    reviews: 1834,
    tags: ['penal', 'crime', 'pena', 'culpabilidade', 'tipicidade'],
    relatedBooks: ['8', '9', '10'],
    summary: {
      overview: 'Rogério Greco oferece uma análise profunda e crítica dos institutos penais, combinando sólida base teórica com aplicação prática. A obra se destaca pela clareza na exposição de conceitos complexos e pela constante atualização jurisprudencial.',
      mainConcepts: [
        'Conceito analítico de crime e seus elementos',
        'Teoria da tipicidade conglobante',
        'Culpabilidade como juízo de reprovação',
        'Princípios limitadores do poder punitivo',
        'Teorias da pena e sua aplicação'
      ],
      practicalImplications: [
        'Fundamentação teórica para defesas criminais',
        'Compreensão da dosimetria da pena',
        'Análise crítica da legislação penal',
        'Base para estudos em criminologia'
      ],
      criticalAnalysis: 'A obra se caracteriza pela abordagem crítica do sistema penal brasileiro, questionando aspectos controversos e apresentando diferentes correntes doutrinárias. O autor demonstra preocupação com os direitos fundamentais e os princípios garantistas.',
      recommendations: 'Essencial para estudantes avançados de Direito Penal e profissionais da área criminal. Recomenda-se a leitura após conhecimentos básicos da matéria, dada a profundidade da análise.'
    }
  },
  {
    id: '4',
    title: 'Manual de Direito Processual Civil',
    slug: 'manual-direito-processual-civil',
    author: 'Fredie Didier Jr.',
    category: 'Direito Processual Civil',
    difficulty: 'ADVANCED',
    readingTime: 50,
    pages: 1156,
    publishedYear: 2024,
    isbn: '978-85-09-12847-3',
    cover: '/books/covers/processual-civil-didier.jpg',
    synopsis: 'Manual completo e atualizado sobre o Novo Código de Processo Civil, abordando de forma sistemática e crítica os institutos processuais, com ênfase nas inovações trazidas pela Lei 13.105/2015.',
    keyTopics: [
      'Teoria Geral do Processo',
      'Jurisdição e Competência',
      'Sujeitos do Processo',
      'Atos Processuais',
      'Tutela Provisória',
      'Procedimento Comum',
      'Recursos',
      'Execução'
    ],
    legalAreas: ['Direito Processual Civil', 'Teoria Geral do Processo'],
    targetAudience: ['Advogados', 'Magistrados', 'Estudantes Avançados', 'Professores'],
    practicalApplications: [
      'Elaboração de petições processuais',
      'Análise de competência jurisdicional',
      'Estratégias recursais',
      'Tutelas de urgência'
    ],
    jurisprudenceReferences: [
      'STJ - REsp 1.696.396/MT (Negócio jurídico processual)',
      'STF - RE 631.240/MG (Repercussão geral)',
      'STJ - REsp 1.733.412/RJ (Audiência de conciliação)',
      'STF - ADI 5.766/DF (Novo CPC)'
    ],
    legislationCovered: [
      'Código de Processo Civil (Lei 13.105/15)',
      'Constituição Federal de 1988',
      'Lei de Arbitragem (Lei 9.307/96)',
      'Marco Civil da Internet (Lei 12.965/14)'
    ],
    rating: 4.9,
    reviews: 987,
    tags: ['processual civil', 'novo cpc', 'procedimento', 'recursos', 'execução'],
    relatedBooks: ['11', '12', '13'],
    summary: {
      overview: 'Fredie Didier Jr. apresenta análise minuciosa do Novo CPC, destacando as principais inovações e sua aplicação prática. A obra combina rigor acadêmico com utilidade prática, sendo referência obrigatória para operadores do direito.',
      mainConcepts: [
        'Princípios fundamentais do processo civil',
        'Negócios jurídicos processuais',
        'Cooperação e boa-fé processual',
        'Precedentes judiciais e sua aplicação',
        'Técnicas de tutela jurisdicional'
      ],
      practicalImplications: [
        'Adaptação à nova sistemática processual',
        'Otimização de estratégias processuais',
        'Compreensão das inovações do Novo CPC',
        'Melhoria na qualidade das petições'
      ],
      criticalAnalysis: 'A obra se destaca pela análise crítica e construtiva do Novo CPC, apontando virtudes e defeitos da nova legislação. O autor demonstra profundo conhecimento teórico aliado à experiência prática, resultando em uma obra equilibrada e útil.',
      recommendations: 'Indispensável para todos os operadores do direito que atuam na área cível. Recomenda-se como obra de consulta permanente e estudo sistemático para compreensão completa do novo sistema processual.'
    }
  },
  {
    id: '5',
    title: 'Direito Empresarial Brasileiro',
    slug: 'direito-empresarial-brasileiro',
    author: 'Fábio Ulhoa Coelho',
    category: 'Direito Empresarial',
    difficulty: 'INTERMEDIATE',
    readingTime: 38,
    pages: 742,
    publishedYear: 2023,
    isbn: '978-85-02-63951-6',
    cover: '/books/covers/empresarial-coelho.jpg',
    synopsis: 'Obra fundamental sobre Direito Empresarial brasileiro, abordando desde a teoria da empresa até os institutos mais complexos do direito societário, falimentar e dos títulos de crédito.',
    keyTopics: [
      'Teoria da Empresa',
      'Registro de Empresas',
      'Sociedades Empresárias',
      'Títulos de Crédito',
      'Contratos Empresariais',
      'Propriedade Industrial',
      'Recuperação e Falência',
      'Direito Concorrencial'
    ],
    legalAreas: ['Direito Empresarial', 'Direito Societário', 'Direito Falimentar'],
    targetAudience: ['Advogados Empresariais', 'Empresários', 'Estudantes de Direito', 'Consultores'],
    practicalApplications: [
      'Constituição de sociedades',
      'Elaboração de contratos empresariais',
      'Processos de recuperação judicial',
      'Proteção de marcas e patentes'
    ],
    jurisprudenceReferences: [
      'STJ - REsp 1.800.032/SP (Desconsideração da personalidade)',
      'STF - RE 562.276/PR (ICMS na importação)',
      'STJ - REsp 1.698.069/SP (Recuperação judicial)',
      'STJ - REsp 1.729.554/RJ (Marca notória)'
    ],
    legislationCovered: [
      'Código Civil (Lei 10.406/2002)',
      'Lei de Recuperação e Falência (Lei 11.101/05)',
      'Lei de Propriedade Industrial (Lei 9.279/96)',
      'Lei das S.A. (Lei 6.404/76)'
    ],
    rating: 4.6,
    reviews: 1456,
    tags: ['empresarial', 'sociedades', 'falência', 'títulos crédito', 'propriedade industrial'],
    relatedBooks: ['14', '15', '16'],
    summary: {
      overview: 'Fábio Ulhoa Coelho apresenta visão abrangente e atualizada do Direito Empresarial brasileiro, combinando aspectos teóricos e práticos. A obra é reconhecida pela clareza na exposição e pela utilidade para a prática profissional.',
      mainConcepts: [
        'Conceito moderno de empresa e empresário',
        'Regime jurídico das sociedades empresárias',
        'Princípios dos títulos de crédito',
        'Institutos da recuperação e falência',
        'Proteção da propriedade intelectual'
      ],
      practicalImplications: [
        'Base para consultoria empresarial',
        'Orientação para constituição societária',
        'Compreensão do direito concorrencial',
        'Estratégias de proteção patrimonial'
      ],
      criticalAnalysis: 'A obra se caracteriza pela abordagem prática e pela constante atualização com as mudanças legislativas e jurisprudenciais. O autor consegue equilibrar rigor técnico com linguagem acessível, tornando a obra útil tanto para acadêmicos quanto para profissionais.',
      recommendations: 'Essencial para advogados que atuam na área empresarial e para empresários que desejam compreender melhor o ambiente jurídico dos negócios. Recomenda-se como obra de referência e consulta constante.'
    }
  },
  {
    id: '6',
    title: 'Direito Administrativo Brasileiro',
    slug: 'direito-administrativo-brasileiro',
    author: 'Hely Lopes Meirelles',
    category: 'Direito Administrativo',
    difficulty: 'INTERMEDIATE',
    readingTime: 42,
    pages: 968,
    publishedYear: 2023,
    isbn: '978-85-02-64123-6',
    cover: '/books/covers/administrativo-meirelles.jpg',
    synopsis: 'Clássico do Direito Administrativo brasileiro, obra de referência que aborda de forma sistemática e completa os institutos fundamentais da Administração Pública, constantemente atualizada com a legislação e jurisprudência mais recentes.',
    keyTopics: [
      'Organização Administrativa',
      'Poderes Administrativos',
      'Atos Administrativos',
      'Contratos Administrativos',
      'Licitações e Pregões',
      'Serviços Públicos',
      'Responsabilidade Civil do Estado',
      'Controle da Administração'
    ],
    legalAreas: ['Direito Administrativo', 'Direito Público', 'Administração Pública'],
    targetAudience: ['Servidores Públicos', 'Advogados Públicos', 'Estudantes', 'Gestores Públicos'],
    practicalApplications: [
      'Elaboração de atos administrativos',
      'Condução de processos licitatórios',
      'Análise de contratos públicos',
      'Defesa em processos administrativos'
    ],
    jurisprudenceReferences: [
      'STF - RE 592.581/RS (Responsabilidade objetiva)',
      'STJ - REsp 1.677.910/RJ (Licitação)',
      'STF - ADI 2.135/DF (Agências reguladoras)',
      'STJ - REsp 1.706.423/SP (Improbidade administrativa)'
    ],
    legislationCovered: [
      'Lei de Licitações (Lei 14.133/21)',
      'Lei de Improbidade (Lei 8.429/92)',
      'Lei do Processo Administrativo (Lei 9.784/99)',
      'Constituição Federal de 1988'
    ],
    rating: 4.8,
    reviews: 2341,
    tags: ['administrativo', 'licitação', 'atos administrativos', 'serviços públicos', 'responsabilidade estado'],
    relatedBooks: ['17', '18', '19'],
    summary: {
      overview: 'Obra clássica e indispensável para o estudo do Direito Administrativo, Hely Lopes Meirelles criou um verdadeiro manual que orienta gerações de estudantes e profissionais. A obra mantém sua relevância através de constantes atualizações.',
      mainConcepts: [
        'Princípios da Administração Pública',
        'Regime jurídico-administrativo',
        'Discricionariedade e vinculação administrativa',
        'Supremacia do interesse público',
        'Controle interno e externo da Administração'
      ],
      practicalImplications: [
        'Base fundamental para concursos públicos',
        'Orientação para gestão pública eficiente',
        'Compreensão do regime jurídico público',
        'Ferramenta para controle da Administração'
      ],
      criticalAnalysis: 'A obra mantém sua posição de referência no Direito Administrativo brasileiro pela sistematização clara e pela abordagem prática dos institutos. Embora seja um clássico, continua atual e relevante para a compreensão da Administração Pública contemporânea.',
      recommendations: 'Leitura obrigatória para todos que estudam ou trabalham com Direito Público. Especialmente recomendada para candidatos a concursos públicos e servidores que desejam aprofundar seus conhecimentos.'
    }
  }
];

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
        pill.module = {
          id: module.id,
          title: module.title,
          slug: module.slug
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
        if (pill) {
          // Ensure the pill has both subject and module references
          return {
            ...pill,
            subject: {
              id: subject.id,
              title: subject.title,
              slug: subject.slug,
              color: subject.color
            },
            module: {
              id: module.id,
              title: module.title,
              slug: module.slug
            }
          };
        }
      }
    }
  }
  return undefined;
}

export function findBookBySlug(slug: string): MockBook | undefined {
  return mockBooks.find(book => book.slug === slug);
}

export function getBooksByCategory(category: string): MockBook[] {
  return mockBooks.filter(book => book.category === category);
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