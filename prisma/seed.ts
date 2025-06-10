import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar o banco de dados
  await prisma.userAchievement.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.pill.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Dados antigos removidos');

  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Usuário de Teste',
      email: 'teste@example.com',
      password: hashedPassword,
    },
  });

  console.log('👤 Usuário criado');

  // Criar módulos
  const module1 = await prisma.module.create({
    data: {
      title: 'Introdução ao Direito',
      slug: 'introducao-ao-direito',
      description: 'Conceitos fundamentais do Direito e sua importância na sociedade.',
      order: 1,
    },
  });

  const module2 = await prisma.module.create({
    data: {
      title: 'Direito Constitucional',
      slug: 'direito-constitucional',
      description: 'Estudo da Constituição Federal e seus princípios fundamentais.',
      order: 2,
    },
  });

  const module3 = await prisma.module.create({
    data: {
      title: 'Direito Civil',
      slug: 'direito-civil',
      description: 'Relações jurídicas entre particulares e seus direitos.',
      order: 3,
    },
  });

  console.log('📚 Módulos criados');

  // Criar pílulas para Módulo 1 - Introdução ao Direito
  const pill1 = await prisma.pill.create({
    data: {
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
      moduleId: module1.id,
    },
  });

  const pill2 = await prisma.pill.create({
    data: {
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
        },
        {
          type: 'heading',
          level: 4,
          text: 'Fontes Materiais'
        },
        {
          type: 'paragraph',
          text: 'São os fatores sociais, econômicos, políticos e culturais que influenciam a criação das normas jurídicas, como:'
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Necessidades sociais e econômicas',
            'Valores morais e éticos da sociedade',
            'Pressões políticas e movimentos sociais',
            'Tradições culturais e históricas',
            'Influências internacionais e tratados'
          ]
        }
      ],
      order: 2,
      moduleId: module1.id,
    },
  });

  const pill3 = await prisma.pill.create({
    data: {
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
        },
        {
          type: 'heading',
          level: 3,
          text: 'Princípios da Aplicação'
        },
        {
          type: 'paragraph',
          text: 'A aplicação das normas deve observar princípios fundamentais:'
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Legalidade: aplicação conforme a lei',
            'Igualdade: tratamento igual para situações iguais',
            'Proporcionalidade: adequação entre meio e fim',
            'Razoabilidade: decisões fundamentadas e lógicas',
            'Segurança jurídica: previsibilidade das decisões'
          ]
        }
      ],
      order: 3,
      moduleId: module1.id,
    },
  });

  const pill4 = await prisma.pill.create({
    data: {
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
        },
        {
          type: 'heading',
          level: 3,
          text: 'Critérios de Interpretação'
        },
        {
          type: 'paragraph',
          text: 'Quanto ao resultado, a interpretação pode ser:'
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Declarativa: confirma o sentido aparente da norma',
            'Restritiva: limita o alcance da norma',
            'Extensiva: amplia o alcance da norma',
            'Analógica: aplica a norma a casos similares não previstos'
          ]
        },
        {
          type: 'quote',
          text: 'Na interpretação da lei, deve-se buscar não apenas a letra, mas principalmente o espírito da norma.',
          author: 'Princípio hermenêutico clássico'
        }
      ],
      order: 4,
      moduleId: module1.id,
    },
  });

  const pill5 = await prisma.pill.create({
    data: {
      title: 'Quiz de Revisão',
      slug: 'quiz-revisao',
      content: [
        {
          type: 'paragraph',
          text: 'Teste seus conhecimentos sobre os conceitos fundamentais do Direito. Este quiz aborda os principais temas estudados no módulo de Introdução ao Direito.'
        },
        {
          type: 'paragraph',
          text: 'Responda com atenção e utilize os conhecimentos adquiridos nas pílulas anteriores.'
        }
      ],
      order: 5,
      moduleId: module1.id,
    },
  });

  // Criar pílulas para Módulo 2 - Direito Constitucional
  const pill6 = await prisma.pill.create({
    data: {
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
        },
        {
          type: 'heading',
          level: 3,
          text: 'Objetivos Fundamentais'
        },
        {
          type: 'paragraph',
          text: 'A Constituição estabelece como objetivos fundamentais da República:'
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Construir uma sociedade livre, justa e solidária',
            'Garantir o desenvolvimento nacional',
            'Erradicar a pobreza e a marginalização',
            'Promover o bem de todos, sem preconceitos'
          ]
        }
      ],
      order: 1,
      moduleId: module2.id,
    },
  });

  const pill7 = await prisma.pill.create({
    data: {
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
        },
        {
          type: 'heading',
          level: 3,
          text: 'Características dos Direitos Fundamentais'
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Universalidade: pertencem a todos os seres humanos',
            'Indivisibilidade: formam um conjunto integrado',
            'Interdependência: relacionam-se mutuamente',
            'Inalienabilidade: não podem ser transferidos',
            'Imprescritibilidade: não se perdem com o tempo'
          ]
        }
      ],
      order: 2,
      moduleId: module2.id,
    },
  });

  // Criar mais pílulas para completar o módulo 2
  for (let i = 3; i <= 8; i++) {
    await prisma.pill.create({
      data: {
        title: `Tópico ${i} - Direito Constitucional`,
        slug: `topico-${i}-constitucional`,
        content: [
          {
            type: 'heading',
            level: 2,
            text: `Tópico ${i} do Direito Constitucional`
          },
          {
            type: 'paragraph',
            text: `Este é o conteúdo detalhado do tópico ${i} sobre Direito Constitucional. Aqui você aprenderá conceitos importantes e fundamentais para sua formação jurídica.`
          },
          {
            type: 'paragraph',
            text: 'O estudo do Direito Constitucional é essencial para compreender a estrutura do Estado e os direitos dos cidadãos.'
          }
        ],
        order: i,
        moduleId: module2.id,
      },
    });
  }

  // Criar pílulas para Módulo 3 - Direito Civil
  for (let i = 1; i <= 12; i++) {
    await prisma.pill.create({
      data: {
        title: `Tópico ${i} - Direito Civil`,
        slug: `topico-${i}-civil`,
        content: [
          {
            type: 'heading',
            level: 2,
            text: `Tópico ${i} do Direito Civil`
          },
          {
            type: 'paragraph',
            text: `Conteúdo abrangente do tópico ${i} sobre Direito Civil. Este módulo aborda as relações jurídicas entre particulares e os institutos fundamentais do direito privado.`
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Conceitos fundamentais',
              'Aplicação prática',
              'Jurisprudência relevante',
              'Casos concretos'
            ]
          }
        ],
        order: i,
        moduleId: module3.id,
      },
    });
  }

  console.log('💊 Pílulas criadas');

  // Criar quizzes para as principais pílulas
  const quiz1 = await prisma.quiz.create({
    data: {
      pillId: pill1.id,
    },
  });

  await prisma.question.create({
    data: {
      text: 'O que é Direito?',
      quizId: quiz1.id,
      options: [
        { text: 'Um conjunto de normas que regulam a vida em sociedade', isCorrect: true },
        { text: 'Apenas leis escritas pelo governo', isCorrect: false },
        { text: 'Regras criadas pelos juízes', isCorrect: false },
        { text: 'Costumes antigos da sociedade', isCorrect: false }
      ],
      type: 'MULTIPLE_CHOICE',
      explanation: 'O Direito é um conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres para manter a ordem social e garantir a justiça.'
    },
  });

  await prisma.question.create({
    data: {
      text: 'Qual das seguintes é uma característica fundamental do Direito?',
      quizId: quiz1.id,
      options: [
        { text: 'Opcional', isCorrect: false },
        { text: 'Imperativo', isCorrect: true },
        { text: 'Sugestivo', isCorrect: false },
        { text: 'Temporário', isCorrect: false }
      ],
      type: 'MULTIPLE_CHOICE',
      explanation: 'A imperatividade é uma característica fundamental do Direito, tornando suas normas obrigatórias e vinculantes para todos.'
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      pillId: pill2.id,
    },
  });

  await prisma.question.create({
    data: {
      text: 'Qual é a principal fonte formal do Direito no Brasil?',
      quizId: quiz2.id,
      options: [
        { text: 'Costume', isCorrect: false },
        { text: 'Lei', isCorrect: true },
        { text: 'Jurisprudência', isCorrect: false },
        { text: 'Doutrina', isCorrect: false }
      ],
      type: 'MULTIPLE_CHOICE',
      explanation: 'A lei é a principal fonte formal do Direito no Brasil, sendo norma escrita emanada do Poder Legislativo seguindo processo específico.'
    },
  });

  const quiz3 = await prisma.quiz.create({
    data: {
      pillId: pill5.id,
    },
  });

  await prisma.question.create({
    data: {
      text: 'A interpretação que busca a finalidade da norma é chamada de:',
      quizId: quiz3.id,
      options: [
        { text: 'Literal', isCorrect: false },
        { text: 'Histórica', isCorrect: false },
        { text: 'Teleológica', isCorrect: true },
        { text: 'Sistemática', isCorrect: false }
      ],
      type: 'MULTIPLE_CHOICE',
      explanation: 'A interpretação teleológica busca identificar a finalidade, o objetivo que a norma pretende alcançar.'
    },
  });

  console.log('❓ Quizzes criados');

  // Criar conquistas
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'Jurista Iniciante',
        description: 'Complete sua primeira pílula de conhecimento jurídico',
        iconUrl: '/achievements/jurista-iniciante.png',
        criteria: {
          type: 'pillsCompleted',
          count: 1,
        },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Aprendiz do Direito',
        description: 'Complete 5 pílulas de conhecimento jurídico',
        iconUrl: '/achievements/aprendiz-direito.png',
        criteria: {
          type: 'pillsCompleted',
          count: 5,
        },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Estudante Dedicado',
        description: 'Complete 10 pílulas de conhecimento jurídico',
        iconUrl: '/achievements/estudante-dedicado.png',
        criteria: {
          type: 'pillsCompleted',
          count: 10,
        },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Mestre das Leis',
        description: 'Complete 25 pílulas de conhecimento jurídico',
        iconUrl: '/achievements/mestre-leis.png',
        criteria: {
          type: 'pillsCompleted',
          count: 25,
        },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Quiz Master',
        description: 'Obtenha uma pontuação média de 90% ou mais em 5 quizzes',
        iconUrl: '/achievements/quiz-master.png',
        criteria: {
          type: 'quizScore',
          average: 90,
          count: 5,
        },
      },
    }),
  ]);

  console.log('🏆 Conquistas criadas');

  // Registrar progresso inicial do usuário
  const progressEntries = await Promise.all([
    prisma.userProgress.create({
      data: {
        userId: user.id,
        pillId: pill1.id,
        completedAt: new Date(),
        score: 95,
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: user.id,
        pillId: pill2.id,
        completedAt: new Date(),
        score: 88,
      },
    }),
  ]);

  // Desbloquear primeira conquista
  await prisma.userAchievement.create({
    data: {
      userId: user.id,
      achievementId: achievements[0].id,
      awardedAt: new Date(),
    },
  });

  console.log('📈 Progresso inicial registrado');

  console.log('✅ Seed concluído com sucesso!');
  console.log(`
📊 Resumo do seed:
- 👤 1 usuário criado
- 📚 3 módulos criados
- 💊 ${3 + 6 + 12} pílulas criadas (21 total)
- ❓ 3 quizzes criados
- 🏆 5 conquistas criadas
- 📈 Progresso inicial registrado

🔑 Credenciais de teste:
- Email: teste@example.com
- Senha: 123456
  `);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });