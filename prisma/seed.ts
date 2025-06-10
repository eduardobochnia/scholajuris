import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados
  await prisma.userAchievement.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.pill.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Usuário de Teste',
      email: 'teste@example.com',
      password: hashedPassword,
    },
  });

  // Criar módulos
  const modules = await Promise.all([
    prisma.module.create({
      data: {
        title: 'Introdução ao Direito',
        description: 'Conceitos fundamentais do Direito e sua importância na sociedade.',
        order: 1,
        slug: 'introducao-ao-direito',
      },
    }),
    prisma.module.create({
      data: {
        title: 'Direito Constitucional',
        description: 'Estudo da Constituição Federal e seus princípios fundamentais.',
        order: 2,
        slug: 'direito-constitucional',
      },
    }),
    prisma.module.create({
      data: {
        title: 'Direito Civil',
        description: 'Relações jurídicas entre particulares e seus direitos.',
        order: 3,
        slug: 'direito-civil',
      },
    }),
  ]);

  // Criar pílulas para cada módulo
  for (const moduleData of modules) {
    const pills = await Promise.all([
      prisma.pill.create({
        data: {
          title: 'Conceitos Básicos',
          content: [
            {
              type: 'text',
              content: 'Este é um conteúdo de exemplo para a pílula de conceitos básicos.',
            },
          ],
          order: 1,
          moduleId: moduleData.id,
          slug: 'conceitos-basicos',
        },
      }),
      prisma.pill.create({
        data: {
          title: 'Aplicação Prática',
          content: [
            {
              type: 'text',
              content: 'Este é um conteúdo de exemplo para a pílula de aplicação prática.',
            },
          ],
          order: 2,
          moduleId: moduleData.id,
          slug: 'aplicacao-pratica',
        },
      }),
      prisma.pill.create({
        data: {
          title: 'Quiz de Revisão',
          content: [
            {
              type: 'text',
              content: 'Este é um conteúdo de exemplo para o quiz de revisão.',
            },
          ],
          order: 3,
          moduleId: moduleData.id,
          slug: 'quiz-revisao',
        },
      }),
    ]);

    // Criar quiz para a última pílula
    const lastPill = pills[2];
    await prisma.quiz.create({
      data: {
        pillId: lastPill.id,
        questions: {
          create: [
            {
              text: 'Qual é o conceito principal deste módulo?',
              options: [
                { text: 'Opção A', isCorrect: true },
                { text: 'Opção B', isCorrect: false },
                { text: 'Opção C', isCorrect: false },
              ],
              type: 'MULTIPLE_CHOICE',
            },
            {
              text: 'Qual é a aplicação prática mais comum?',
              options: [
                { text: 'Opção A', isCorrect: false },
                { text: 'Opção B', isCorrect: true },
                { text: 'Opção C', isCorrect: false },
              ],
              type: 'MULTIPLE_CHOICE',
            },
          ],
        },
      },
    });
  }

  // Criar conquistas
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'Primeiros Passos',
        description: 'Complete sua primeira pílula',
        iconUrl: '/achievements/first-steps.png',
        criteria: {
          type: 'pillsCompleted',
          count: 1,
        },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Estudante Dedicado',
        description: 'Complete 5 pílulas',
        iconUrl: '/achievements/dedicated-student.png',
        criteria: {
          type: 'pillsCompleted',
          count: 5,
        },
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Mestre do Conhecimento',
        description: 'Complete um módulo inteiro',
        iconUrl: '/achievements/knowledge-master.png',
        criteria: {
          type: 'moduleCompleted',
          count: 1,
        },
      },
    }),
  ]);

  // Registrar progresso do usuário
  const firstPill = await prisma.pill.findFirst({
    where: { moduleId: modules[0].id },
  });

  if (firstPill) {
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        pillId: firstPill.id,
        completedAt: new Date(),
        score: 100,
      },
    });

    // Desbloquear primeira conquista
    await prisma.userAchievement.create({
      data: {
        userId: user.id,
        achievementId: achievements[0].id,
        awardedAt: new Date(),
      },
    });
  }

  console.log('Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 