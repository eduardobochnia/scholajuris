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
      overview: 'Esta obra constitui um dos pilares fundamentais para o estudo do Direito Civil brasileiro. Maria Helena Diniz apresenta com clareza e profundidade os institutos básicos que regem as relações civis, oferecendo uma base sólida para compreensão de toda a sistemática civilista. O livro é estruturado de forma didática, começando pelos conceitos mais elementares e progredindo para temas mais complexos, sempre com exemplos práticos e referências jurisprudenciais atualizadas. A autora consegue equilibrar rigor acadêmico com clareza expositiva, tornando a obra acessível tanto para iniciantes quanto para profissionais experientes que buscam aprofundamento teórico.',
      mainConcepts: [
        'Conceito e evolução histórica da personalidade jurídica no direito brasileiro',
        'Distinção fundamental entre capacidade de direito e capacidade de fato',
        'Classificação abrangente e regime jurídico dos bens móveis e imóveis',
        'Elementos essenciais dos negócios jurídicos e sua formação',
        'Teoria das invalidades e seus efeitos no ordenamento jurídico'
      ],
      practicalImplications: [
        'Fornece base teórica essencial para a prática advocatícia em todas as áreas do direito civil',
        'Orienta na interpretação e aplicação correta das normas civis em casos concretos',
        'Facilita a compreensão de casos complexos envolvendo questões de capacidade e personalidade',
        'Auxilia na identificação precisa de vícios contratuais e suas consequências jurídicas'
      ],
      criticalAnalysis: 'A obra se destaca pela sistematização didática e pela atualização constante com a jurisprudência mais recente dos tribunais superiores. Maria Helena Diniz demonstra profundo conhecimento da matéria, conseguindo equilibrar rigor técnico com clareza expositiva. O livro é particularmente valioso por sua abordagem prática, sempre conectando a teoria com aplicações concretas. Uma das principais virtudes da obra é sua capacidade de tornar conceitos complexos acessíveis sem perder a profundidade necessária para a formação jurídica sólida.',
      recommendations: 'Leitura obrigatória para estudantes de Direito a partir do 2º período e profissionais que atuam na área cível. Recomenda-se a leitura sequencial dos capítulos, pois os conceitos são construídos de forma progressiva. Ideal para consulta permanente no escritório e para preparação de concursos públicos. Estudantes devem complementar a leitura com exercícios práticos e análise de casos concretos.'
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
    synopsis: 'Manual completo e atualizado de Direito Constitucional, apresentado de forma esquematizada e didática, ideal para estudantes e concurseiros que buscam compreender os fundamentos da Constituição Federal de 1988.',
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
      'Preparação para concursos públicos da área jurídica',
      'Análise de constitucionalidade de leis e atos normativos',
      'Defesa de direitos fundamentais em ações judiciais',
      'Compreensão da estrutura e funcionamento do Estado brasileiro'
    ],
    jurisprudenceReferences: [
      'STF - ADI 4.277/DF (União homoafetiva como entidade familiar)',
      'STF - ADPF 54/DF (Interrupção da gravidez de feto anencéfalo)',
      'STF - RE 641.320/RS (Direito fundamental à saúde)',
      'STF - ADI 5.357/DF (Financiamento empresarial de campanhas eleitorais)'
    ],
    legislationCovered: [
      'Constituição Federal de 1988',
      'Lei 9.868/99 (Processo e julgamento da ADI e ADC)',
      'Lei 9.882/99 (Processo e julgamento da ADPF)',
      'Regimento Interno do STF'
    ],
    rating: 4.9,
    reviews: 2156,
    tags: ['constitucional', 'direitos fundamentais', 'controle constitucionalidade', 'organização estado'],
    relatedBooks: ['4', '6', '7'],
    summary: {
      overview: 'Pedro Lenza apresenta o Direito Constitucional de forma sistemática e acessível, utilizando uma metodologia esquematizada que facilita a compreensão e memorização dos conceitos. A obra é constantemente atualizada com as mais recentes decisões do STF e mudanças legislativas, tornando-se referência indispensável para estudantes e profissionais. O autor consegue abordar temas complexos de forma didática, sem perder o rigor técnico necessário, utilizando esquemas, quadros sinóticos e mapas mentais que otimizam o aprendizado.',
      mainConcepts: [
        'Supremacia e rigidez constitucional como características fundamentais da Constituição',
        'Eficácia e aplicabilidade das normas constitucionais segundo a classificação de José Afonso da Silva',
        'Princípios da dignidade da pessoa humana e proporcionalidade como vetores interpretativos',
        'Separação de poderes e sistema de freios e contrapesos no Estado brasileiro',
        'Federalismo brasileiro e repartição de competências entre os entes federativos'
      ],
      practicalImplications: [
        'Base fundamental para atuação em qualquer área do Direito Público',
        'Essencial para compreensão do sistema jurídico brasileiro e sua hierarquia normativa',
        'Ferramenta indispensável para aprovação em concursos da área jurídica',
        'Orientação prática para defesa de direitos constitucionais em ações judiciais'
      ],
      criticalAnalysis: 'A metodologia esquematizada torna a obra especialmente útil para revisões e consultas rápidas, sem comprometer a profundidade do conteúdo. Pedro Lenza consegue abordar temas complexos de forma didática, mantendo o rigor técnico necessário. A constante atualização jurisprudencial é um diferencial importante, especialmente considerando a dinâmica do Direito Constitucional. A obra se destaca pela organização visual e pela capacidade de síntese, facilitando a memorização de conceitos essenciais.',
      recommendations: 'Ideal para iniciantes no estudo do Direito Constitucional e para revisão intensiva de candidatos a concursos públicos. Recomenda-se o uso conjunto com a Constituição Federal anotada para aprofundamento dos dispositivos. Estudantes devem fazer uso dos esquemas e quadros para otimizar o aprendizado. Profissionais podem utilizá-la como obra de consulta rápida para esclarecimento de dúvidas pontuais.'
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
    synopsis: 'Obra abrangente sobre a Parte Geral do Direito Penal brasileiro, que analisa de forma crítica e sistemática os institutos fundamentais do Direito Penal, com rica fundamentação doutrinária e jurisprudencial atualizada.',
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
      'Análise precisa de tipicidade penal em casos concretos',
      'Identificação e aplicação de excludentes de ilicitude',
      'Cálculo correto de penas e aplicação de benefícios',
      'Elaboração de defesas criminais fundamentadas'
    ],
    jurisprudenceReferences: [
      'STF - HC 126.292/SP (Execução provisória da pena)',
      'STJ - HC 598.051/SC (Legítima defesa putativa)',
      'STF - RE 971.959/RS (Progressão de regime)',
      'STJ - REsp 1.736.717/RS (Erro de tipo essencial)'
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
      overview: 'Rogério Greco oferece uma análise profunda e crítica dos institutos penais fundamentais, combinando sólida base teórica com aplicação prática. A obra se destaca pela clareza na exposição de conceitos complexos e pela constante atualização jurisprudencial dos tribunais superiores. O autor adota uma abordagem garantista, sempre preocupado com os direitos fundamentais e os princípios limitadores do poder punitivo estatal. A obra é estruturada de forma didática, facilitando a compreensão progressiva dos institutos penais.',
      mainConcepts: [
        'Conceito analítico de crime e seus elementos constitutivos (tipicidade, antijuridicidade e culpabilidade)',
        'Teoria da tipicidade conglobante e sua aplicação no direito brasileiro',
        'Culpabilidade como juízo de reprovação e seus elementos (imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa)',
        'Princípios limitadores do poder punitivo estatal (legalidade, lesividade, intervenção mínima)',
        'Teorias da pena e sua aplicação no sistema penal brasileiro'
      ],
      practicalImplications: [
        'Fundamentação teórica sólida para elaboração de defesas criminais eficazes',
        'Compreensão aprofundada da dosimetria da pena e aplicação de benefícios',
        'Análise crítica da legislação penal e identificação de inconstitucionalidades',
        'Base teórica para estudos avançados em criminologia e política criminal'
      ],
      criticalAnalysis: 'A obra se caracteriza pela abordagem crítica e garantista do sistema penal brasileiro, questionando aspectos controversos e apresentando diferentes correntes doutrinárias. Rogério Greco demonstra preocupação constante com os direitos fundamentais e os princípios garantistas, oferecendo uma visão humanizada do Direito Penal. A linguagem é acessível sem perder o rigor técnico, e a obra é constantemente atualizada com as mudanças legislativas e jurisprudenciais mais recentes.',
      recommendations: 'Essencial para estudantes avançados de Direito Penal e profissionais da área criminal. Recomenda-se a leitura após conhecimentos básicos da matéria, dada a profundidade da análise. Ideal para advogados criminalistas, promotores e defensores públicos que buscam fundamentação teórica sólida. Estudantes devem complementar a leitura com análise de casos práticos e jurisprudência atualizada.'
    }
  }
];

export const mockFormations: MockFormation[] = [
  {
    id: '1',
    title: 'Formação Completa em Direito Civil',
    slug: 'formacao-direito-civil',
    description: 'Formação completa e aprofundada em Direito Civil, desde os conceitos fundamentais até os temas mais avançados da área, com foco em aplicação prática e jurisprudência atualizada.',
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
        description: 'Base sólida nos conceitos fundamentais do Direito Civil brasileiro, incluindo teoria geral das pessoas, bens e fatos jurídicos.',
        order: 1,
        formationId: '1',
        subjects: [
          {
            id: '1',
            title: 'Teoria Geral do Direito Civil',
            slug: 'teoria-geral-direito-civil',
            description: 'Conceitos fundamentais e princípios basilares do Direito Civil brasileiro.',
            color: '#3B82F6',
            iconUrl: '/icons/teoria-geral.svg',
            order: 1,
            moduleId: '1',
            pills: [
              {
                id: '1',
                title: 'Art. 1º do Código Civil - Conceito de Pessoa e Capacidade Jurídica Universal',
                slug: 'art-1-codigo-civil-conceito-pessoa',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Art. 1º do Código Civil - Conceito de Pessoa e Capacidade Jurídica Universal'
                  },
                  {
                    type: 'quote',
                    text: 'Toda pessoa é capaz de direitos e deveres na ordem civil.',
                    author: 'Art. 1º do Código Civil Brasileiro (Lei 10.406/2002)'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Análise Doutrinária Aprofundada'
                  },
                  {
                    type: 'paragraph',
                    text: 'O artigo 1º do Código Civil estabelece o princípio fundamental da capacidade jurídica universal, consagrando que todo ser humano, pelo simples fato de existir, possui personalidade jurídica. Segundo Maria Helena Diniz, "este dispositivo consagra o princípio da dignidade da pessoa humana, reconhecendo que todo ser humano, pelo simples fato de existir, possui personalidade jurídica". Esta norma representa uma evolução histórica significativa do direito brasileiro, rompendo com concepções anteriores que negavam personalidade a determinados grupos de pessoas.'
                  },
                  {
                    type: 'paragraph',
                    text: 'A redação do artigo é deliberadamente ampla e inclusiva, utilizando o termo "toda pessoa" para abranger todos os seres humanos, independentemente de idade, condição mental, nacionalidade ou qualquer outra característica. Como observa Caio Mário da Silva Pereira, "a personalidade é um atributo inerente ao ser humano, não podendo ser negada ou restringida arbitrariamente pelo ordenamento jurídico". Esta universalidade da capacidade jurídica reflete os valores fundamentais da sociedade brasileira e está em harmonia com os princípios constitucionais.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Elementos Essenciais da Capacidade Jurídica'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Capacidade de direito (capacidade de gozo): aptidão para ser titular de direitos e obrigações, inerente a todo ser humano desde o nascimento',
                      'Capacidade de fato (capacidade de exercício): aptidão para exercer pessoalmente os atos da vida civil, que pode ser limitada em certas circunstâncias',
                      'Personalidade jurídica: atributo que confere ao ser humano a qualidade de sujeito de direitos e obrigações',
                      'Universalidade: princípio que garante que todos os seres humanos possuem personalidade jurídica, sem exceções ou discriminações'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Distinção Fundamental: Capacidade de Direito vs. Capacidade de Fato'
                  },
                  {
                    type: 'paragraph',
                    text: 'É crucial compreender que o artigo 1º estabelece a capacidade de direito, que é absoluta e universal. Todos os seres humanos possuem esta capacidade desde o nascimento até a morte. Já a capacidade de fato, que é a aptidão para exercer pessoalmente os atos da vida civil, pode ser limitada em determinadas circunstâncias, como no caso de menores de idade ou pessoas com deficiência mental. Como ensina Silvio Rodrigues, "enquanto a capacidade de direito é a regra geral e absoluta, a capacidade de fato admite gradações e limitações estabelecidas pela lei para proteção da própria pessoa".'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Jurisprudência Relevante dos Tribunais Superiores'
                  },
                  {
                    type: 'paragraph',
                    text: 'STJ, REsp 1.159.242/SP, Rel. Min. Nancy Andrighi: "A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro, conforme dispõe o art. 2º do Código Civil. O nascituro é titular de direitos da personalidade, como o direito à vida, à integridade física, à honra, à imagem, devendo ser resguardado de qualquer forma de discriminação ou desrespeito." Esta decisão demonstra como o princípio estabelecido no art. 1º se estende mesmo antes do nascimento, protegendo direitos fundamentais.'
                  },
                  {
                    type: 'paragraph',
                    text: 'STF, RE 898.060/SC, Rel. Min. Luiz Fux: "O direito ao nome integra o conceito de dignidade da pessoa humana e constitui direito fundamental implícito, corolário do princípio da dignidade da pessoa humana. A possibilidade de alteração do nome civil, quando demonstrada situação excepcional, encontra fundamento no princípio da dignidade da pessoa humana." Esta decisão ilustra como o art. 1º fundamenta direitos específicos da personalidade.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Aplicações Práticas e Casos Concretos'
                  },
                  {
                    type: 'paragraph',
                    text: 'Na prática forense, o art. 1º serve como fundamento para diversas situações: reconhecimento de direitos de pessoas em situação de vulnerabilidade, proteção de direitos da personalidade, fundamentação para ações de estado (investigação de paternidade, retificação de registro civil), e base para a aplicação do princípio da dignidade da pessoa humana em casos concretos. Advogados frequentemente invocam este artigo em petições que envolvem questões de capacidade, personalidade e direitos fundamentais.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Conexões com Outros Institutos Jurídicos'
                  },
                  {
                    type: 'paragraph',
                    text: 'O art. 1º está intrinsecamente conectado com diversos outros institutos do direito civil e constitucional: relaciona-se diretamente com o art. 2º (início da personalidade), com os arts. 3º e 4º (incapacidades), com o art. 5º da Constituição Federal (direitos fundamentais), e com todo o sistema de proteção da pessoa humana. Esta interconexão demonstra a importância fundamental deste dispositivo como pedra angular do sistema civilista brasileiro.'
                  }
                ],
                estimatedTime: 25,
                difficulty: 'BEGINNER',
                tags: ['personalidade', 'capacidade', 'direitos fundamentais', 'dignidade humana'],
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
                        explanation: 'O art. 1º estabelece que toda pessoa é capaz de direitos E deveres na ordem civil, consagrando a capacidade jurídica universal. Esta capacidade é inerente ao ser humano e não depende de idade ou outras condições.'
                      }
                    ]
                  }
                ]
              },
              {
                id: '2',
                title: 'Art. 2º do Código Civil - Nascituro e Proteção dos Direitos desde a Concepção',
                slug: 'art-2-codigo-civil-nascituro',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Art. 2º do Código Civil - Nascituro e Proteção dos Direitos desde a Concepção'
                  },
                  {
                    type: 'quote',
                    text: 'A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro.',
                    author: 'Art. 2º do Código Civil Brasileiro (Lei 10.406/2002)'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Teorias Doutrinárias sobre o Nascituro'
                  },
                  {
                    type: 'paragraph',
                    text: 'A doutrina brasileira desenvolveu três principais teorias para explicar a natureza jurídica do nascituro e o momento de aquisição da personalidade civil. Cada teoria possui implicações práticas distintas e influencia a interpretação dos direitos do nascituro.'
                  },
                  {
                    type: 'list',
                    ordered: true,
                    items: [
                      'Teoria Natalista (majoritária): A personalidade civil inicia-se apenas com o nascimento com vida. O nascituro possui mera expectativa de direito, protegida pela lei. Defendida por Caio Mário da Silva Pereira e Silvio Rodrigues.',
                      'Teoria da Personalidade Condicional: O nascituro possui personalidade desde a concepção, mas condicionada ao nascimento com vida. Se nascer vivo, confirma-se a personalidade retroativamente. Sustentada por Serpa Lopes.',
                      'Teoria Concepcionista (minoritária): O nascituro possui personalidade plena desde a concepção, sendo sujeito de direitos. O nascimento apenas confirma direitos já existentes. Defendida por Silmara Chinelato e Giselda Hironaka.'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Direitos Reconhecidos ao Nascituro'
                  },
                  {
                    type: 'paragraph',
                    text: 'Independentemente da teoria adotada, o ordenamento jurídico brasileiro reconhece diversos direitos ao nascituro, demonstrando a preocupação do legislador em proteger a vida humana desde seus primórdios. Estes direitos são amplamente reconhecidos pela doutrina e jurisprudência.'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Direito à vida e à integridade física: proteção contra aborto ilegal e agressões que possam causar danos',
                      'Direito sucessório: capacidade de herdar bens por testamento ou sucessão legítima',
                      'Direito a alimentos: possibilidade de pleitear alimentos do genitor durante a gravidez',
                      'Direito ao reconhecimento de paternidade: investigação de paternidade pode ser proposta antes do nascimento',
                      'Direito a danos morais: reparação por danos causados durante a gestação',
                      'Direito à curatela: nomeação de curador para representar seus interesses quando necessário'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Jurisprudência dos Tribunais Superiores'
                  },
                  {
                    type: 'paragraph',
                    text: 'STJ, REsp 1.415.727/SC, Rel. Min. Nancy Andrighi: "O nascituro goza de proteção jurídica desde a concepção, sendo-lhe assegurados direitos da personalidade, como o direito à vida, à integridade física, à honra e à imagem. A proteção conferida ao nascituro abrange não apenas os direitos patrimoniais, mas também os direitos extrapatrimoniais." Esta decisão consolidou o entendimento sobre a amplitude da proteção jurídica ao nascituro.'
                  },
                  {
                    type: 'paragraph',
                    text: 'STF, ADPF 54/DF, Rel. Min. Marco Aurélio: "A antecipação terapêutica do parto em caso de anencefalia não configura aborto, pois não há vida viável a ser protegida. O feto anencéfalo, por ser inviável, não se enquadra no conceito de nascituro para fins de proteção jurídica." Esta decisão estabeleceu importante distinção sobre os limites da proteção ao nascituro.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Aplicações Práticas no Direito Sucessório'
                  },
                  {
                    type: 'paragraph',
                    text: 'No direito sucessório, o nascituro pode ser contemplado em testamento e herdar por sucessão legítima. Se o testador falecer durante a gravidez, o nascituro terá direito à herança, que ficará em administração até o nascimento. Caso nasça com vida, confirma-se o direito; caso contrário, os bens retornam aos demais herdeiros. Esta proteção demonstra a preocupação do legislador em garantir direitos patrimoniais desde a concepção.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Questões Controvertidas na Doutrina'
                  },
                  {
                    type: 'paragraph',
                    text: 'Algumas questões permanecem controvertidas na doutrina: a possibilidade de o nascituro ser adotado, a extensão dos danos morais que pode sofrer, a aplicação de medidas protetivas em casos de violência doméstica contra a gestante, e os limites da autonomia da gestante em decisões que afetem o nascituro. Estas controvérsias refletem a complexidade das situações envolvendo direitos do nascituro e demonstram a necessidade de análise caso a caso.'
                  }
                ],
                estimatedTime: 22,
                difficulty: 'BEGINNER',
                tags: ['nascituro', 'personalidade', 'concepção', 'direitos da personalidade'],
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
            description: 'Estudo completo das obrigações civis, seus elementos, classificações e efeitos jurídicos.',
            color: '#10B981',
            iconUrl: '/icons/obrigacoes.svg',
            order: 2,
            moduleId: '1',
            pills: [
              {
                id: '3',
                title: 'Princípio do Pacta Sunt Servanda - Força Obrigatória dos Contratos',
                slug: 'principio-pacta-sunt-servanda',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Princípio do Pacta Sunt Servanda - Força Obrigatória dos Contratos'
                  },
                  {
                    type: 'paragraph',
                    text: 'O princípio do pacta sunt servanda (os pactos devem ser cumpridos) constitui um dos pilares fundamentais do direito contratual moderno, estabelecendo que os contratos fazem lei entre as partes e devem ser rigorosamente cumpridos. Este princípio, de origem romana, foi incorporado ao direito brasileiro e encontra-se implicitamente consagrado no Código Civil, especialmente nos artigos 421 e 422.'
                  },
                  {
                    type: 'paragraph',
                    text: 'A força obrigatória dos contratos representa a segurança jurídica necessária para o desenvolvimento das relações econômicas e sociais. Como ensina Orlando Gomes, "sem a certeza de que os contratos serão cumpridos, não haveria confiança nas relações negociais, comprometendo todo o sistema econômico". Esta estabilidade contratual é essencial para o funcionamento da economia de mercado e para a previsibilidade das relações jurídicas.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Fundamento Legal e Doutrinário'
                  },
                  {
                    type: 'quote',
                    text: 'A liberdade de contratar será exercida em razão e nos limites da função social do contrato.',
                    author: 'Art. 421 do Código Civil - Princípio derivado do pacta sunt servanda'
                  },
                  {
                    type: 'paragraph',
                    text: 'Embora o Código Civil não mencione expressamente o princípio do pacta sunt servanda, ele está implícito em diversos dispositivos. O art. 389 estabelece que "não cumprida a obrigação, responde o devedor por perdas e danos", demonstrando a expectativa legal de cumprimento. O art. 395 dispõe sobre a mora do devedor, pressupondo o dever de cumprimento pontual. Estes dispositivos, em conjunto, consagram a força obrigatória dos contratos no direito brasileiro.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Características Fundamentais do Princípio'
                  },
                  {
                    type: 'list',
                    ordered: false,
                    items: [
                      'Força obrigatória dos contratos: uma vez celebrado validamente, o contrato vincula as partes ao seu cumprimento integral',
                      'Intangibilidade do conteúdo contratual: as cláusulas não podem ser alteradas unilateralmente por qualquer das partes',
                      'Impossibilidade de alteração unilateral: modificações contratuais dependem de acordo entre as partes ou de situações excepcionais previstas em lei',
                      'Execução específica das obrigações: preferência pelo cumprimento in natura das prestações pactuadas',
                      'Responsabilidade por inadimplemento: o descumprimento gera obrigação de indenizar perdas e danos'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Limitações Modernas ao Princípio'
                  },
                  {
                    type: 'paragraph',
                    text: 'O direito moderno reconhece que o princípio do pacta sunt servanda não é absoluto, sofrendo limitações importantes impostas por outros princípios e valores jurídicos. A função social do contrato (art. 421), a boa-fé objetiva (art. 422) e a teoria da imprevisão (arts. 478-480) representam temperamentos necessários ao princípio clássico.'
                  },
                  {
                    type: 'paragraph',
                    text: 'A função social do contrato impede que o acordo seja utilizado para fins contrários ao interesse social ou para prejudicar terceiros. A boa-fé objetiva exige comportamento leal e cooperativo das partes durante toda a execução contratual. A teoria da imprevisão (rebus sic stantibus) permite a revisão ou resolução do contrato quando eventos extraordinários e imprevisíveis tornam excessivamente oneroso o cumprimento para uma das partes.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Jurisprudência dos Tribunais Superiores'
                  },
                  {
                    type: 'paragraph',
                    text: 'STJ, REsp 1.321.614/SP, Rel. Min. Nancy Andrighi: "O princípio do pacta sunt servanda deve ser interpretado em harmonia com a função social do contrato e a boa-fé objetiva. Não se admite o cumprimento de contratos que violem a dignidade da pessoa humana ou que sejam manifestamente abusivos." Esta decisão demonstra a evolução jurisprudencial na aplicação do princípio.'
                  },
                  {
                    type: 'paragraph',
                    text: 'STF, RE 363.889/DF, Rel. Min. Dias Toffoli: "A força obrigatória dos contratos não impede a intervenção judicial para coibir abusos e restabelecer o equilíbrio contratual, especialmente nas relações de consumo e nos contratos de adesão." Esta decisão reconhece a necessidade de temperamentos ao princípio clássico.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Aplicação Prática e Casos Concretos'
                  },
                  {
                    type: 'paragraph',
                    text: 'Na prática forense, o princípio do pacta sunt servanda é invocado em ações de cobrança, execução de contratos, pedidos de resolução contratual e ações de perdas e danos. Advogados utilizam este princípio para fundamentar a exigibilidade de cumprimento de obrigações contratuais e para resistir a tentativas de modificação unilateral de contratos. Contudo, devem sempre considerar as limitações modernas impostas pela função social, boa-fé e teoria da imprevisão.'
                  }
                ],
                estimatedTime: 28,
                difficulty: 'INTERMEDIATE',
                tags: ['contratos', 'obrigações', 'princípios', 'força obrigatória'],
                order: 1,
                subjectId: '2',
                prerequisites: [],
                relatedPills: ['4', '5'],
                quizzes: []
              },
              {
                id: '4',
                title: 'Cláusula Rebus Sic Stantibus - Teoria da Imprevisão Contratual',
                slug: 'clausula-rebus-sic-stantibus',
                content: [
                  {
                    type: 'heading',
                    level: 2,
                    text: 'Cláusula Rebus Sic Stantibus - Teoria da Imprevisão Contratual'
                  },
                  {
                    type: 'paragraph',
                    text: 'A cláusula rebus sic stantibus (estando as coisas assim) representa uma das mais importantes limitações ao princípio do pacta sunt servanda, permitindo a revisão ou resolução de contratos quando ocorrem mudanças imprevisíveis e extraordinárias que tornam excessivamente oneroso o cumprimento da obrigação para uma das partes. Esta teoria, também conhecida como teoria da imprevisão, encontra-se positivada nos artigos 478 a 480 do Código Civil brasileiro.'
                  },
                  {
                    type: 'paragraph',
                    text: 'A teoria da imprevisão surgiu da necessidade de compatibilizar a segurança jurídica dos contratos com a justiça contratual, evitando que mudanças extraordinárias nas circunstâncias fáticas levem ao enriquecimento sem causa de uma parte em detrimento da outra. Como observa Caio Mário da Silva Pereira, "a teoria da imprevisão representa um mecanismo de reequilíbrio contratual, preservando a justiça nas relações negociais quando eventos imprevisíveis alteram substancialmente as condições originais do contrato".'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Fundamento Legal no Código Civil'
                  },
                  {
                    type: 'quote',
                    text: 'Nos contratos de execução continuada ou diferida, se a prestação de uma das partes se tornar excessivamente onerosa, com extrema vantagem para a outra, em virtude de acontecimentos extraordinários e imprevisíveis, poderá o devedor pedir a resolução do contrato.',
                    author: 'Art. 478 do Código Civil Brasileiro'
                  },
                  {
                    type: 'paragraph',
                    text: 'O art. 479 complementa estabelecendo que "a resolução poderá ser evitada, oferecendo-se o réu a modificar equitativamente as condições do contrato". O art. 480 estende a aplicação da teoria aos contratos aleatórios quando a álea extraordinária, estranha ao risco próprio do contrato, tornar a prestação excessivamente onerosa. Estes dispositivos consagram a teoria da imprevisão no direito brasileiro, oferecendo instrumentos para o reequilíbrio contratual.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Requisitos Essenciais para Aplicação'
                  },
                  {
                    type: 'list',
                    ordered: true,
                    items: [
                      'Contrato de execução continuada ou diferida: a prestação deve ser cumprida em momento posterior à celebração, permitindo que eventos supervenientes afetem o equilíbrio',
                      'Onerosidade excessiva superveniente: a prestação deve tornar-se desproporcionalmente onerosa em relação ao pactuado originalmente',
                      'Extrema vantagem para a outra parte: deve haver desequilíbrio significativo, com benefício desproporcional para o credor',
                      'Acontecimentos extraordinários e imprevisíveis: eventos que fogem ao curso normal dos acontecimentos e não podiam ser razoavelmente previstos',
                      'Nexo causal entre o fato e a onerosidade: deve haver relação direta entre o evento imprevisível e o desequilíbrio contratual'
                    ]
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Distinção entre Caso Fortuito e Força Maior'
                  },
                  {
                    type: 'paragraph',
                    text: 'É importante distinguir a teoria da imprevisão do caso fortuito e força maior. Enquanto estes últimos tornam impossível o cumprimento da obrigação (art. 393), a teoria da imprevisão aplica-se quando o cumprimento permanece possível, mas se torna excessivamente oneroso. No caso fortuito e força maior, há impossibilidade absoluta; na teoria da imprevisão, há possibilidade com onerosidade excessiva. Esta distinção é fundamental para a correta aplicação dos institutos.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Jurisprudência Consolidada'
                  },
                  {
                    type: 'paragraph',
                    text: 'STJ, REsp 1.321.614/SP, Rel. Min. Nancy Andrighi: "A aplicação da teoria da imprevisão exige a demonstração cumulativa de todos os requisitos legais. Não basta a mera alteração das circunstâncias econômicas; é necessário que a onerosidade seja excessiva e decorra de eventos extraordinários e imprevisíveis." Esta decisão estabelece critérios rigorosos para aplicação da teoria.'
                  },
                  {
                    type: 'paragraph',
                    text: 'STF, RE 571.969/DF, Rel. Min. Ellen Gracie: "A pandemia de COVID-19 pode configurar evento extraordinário e imprevisível para fins de aplicação da teoria da imprevisão, desde que demonstrado o nexo causal entre a pandemia e a onerosidade excessiva do contrato." Esta decisão reconhece eventos contemporâneos como possíveis fundamentos para a teoria.'
                  },
                  {
                    type: 'heading',
                    level: 3,
                    text: 'Efeitos e Consequências Jurídicas'
                  },
                  {
                    type: 'paragraph',
                    text: 'A aplicação da teoria da imprevisão pode resultar em três consequências distintas: resolução do contrato (extinção com efeitos ex nunc), revisão das cláusulas contratuais para restabelecer o equilíbrio, ou suspensão temporária da execução até que cessem as circunstâncias extraordinárias. A escolha entre essas alternativas depende das circunstâncias específicas do caso e da possibilidade de reequilíbrio contratual. O juiz deve sempre buscar a preservação do contrato quando possível, aplicando o princípio da conservação dos negócios jurídicos.'
                  }
                ],
                estimatedTime: 30,
                difficulty: 'ADVANCED',
                tags: ['contratos', 'revisão', 'onerosidade excessiva', 'teoria da imprevisão'],
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
    description: 'Formação especializada em Direito Constitucional, abordando desde os princípios fundamentais até o controle de constitucionalidade e direitos fundamentais.',
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
        description: 'Estudo aprofundado dos princípios fundamentais da Constituição Federal de 1988.',
        order: 1,
        formationId: '2',
        subjects: [
          {
            id: '3',
            title: 'Princípios Fundamentais',
            slug: 'principios-fundamentais',
            description: 'Análise detalhada dos princípios fundamentais da República Federativa do Brasil.',
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
    definition: 'Princípio fundamental do direito contratual que estabelece que os contratos fazem lei entre as partes e devem ser rigorosamente cumpridos.',
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