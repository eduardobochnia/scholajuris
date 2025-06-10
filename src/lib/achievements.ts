import { Achievement, PrismaClient, UserProgress } from '@prisma/client';

export const ACHIEVEMENTS: Omit<Achievement, 'id' | 'createdAt'>[] = [
  {
    name: 'Jurista Iniciante',
    description: 'Complete sua primeira pílula de conhecimento jurídico',
    iconUrl: '/images/achievements/jurista-iniciante.svg',
    criteria: {
      type: 'pillsCompleted',
      count: 1
    }
  },
  {
    name: 'Aprendiz do Direito',
    description: 'Complete 5 pílulas de conhecimento jurídico',
    iconUrl: '/images/achievements/aprendiz-direito.svg',
    criteria: {
      type: 'pillsCompleted',
      count: 5
    }
  },
  {
    name: 'Estudante Dedicado',
    description: 'Complete 10 pílulas de conhecimento jurídico',
    iconUrl: '/images/achievements/estudante-dedicado.svg',
    criteria: {
      type: 'pillsCompleted',
      count: 10
    }
  },
  {
    name: 'Mestre das Leis',
    description: 'Complete 25 pílulas de conhecimento jurídico',
    iconUrl: '/images/achievements/mestre-leis.svg',
    criteria: {
      type: 'pillsCompleted',
      count: 25
    }
  },
  {
    name: 'Sábio Jurídico',
    description: 'Complete 50 pílulas de conhecimento jurídico',
    iconUrl: '/images/achievements/sabio-juridico.svg',
    criteria: {
      type: 'pillsCompleted',
      count: 50
    }
  },
  {
    name: 'Quiz Master',
    description: 'Obtenha uma pontuação média de 90% ou mais em 10 quizzes',
    iconUrl: '/images/achievements/quiz-master.svg',
    criteria: {
      type: 'quizScore',
      average: 90,
      count: 10
    }
  },
  {
    name: 'Estudante Consistente',
    description: 'Complete pílulas por 7 dias consecutivos',
    iconUrl: '/images/achievements/estudante-consistente.svg',
    criteria: {
      type: 'streak',
      days: 7
    }
  },
  {
    name: 'Mestre da Consistência',
    description: 'Complete pílulas por 30 dias consecutivos',
    iconUrl: '/images/achievements/mestre-consistencia.svg',
    criteria: {
      type: 'streak',
      days: 30
    }
  },
  {
    name: 'Explorador do Direito',
    description: 'Complete pílulas de 5 módulos diferentes',
    iconUrl: '/images/achievements/explorador-direito.svg',
    criteria: {
      type: 'uniqueModules',
      count: 5
    }
  },
  {
    name: 'Perfeccionista',
    description: 'Obtenha 100% em 5 quizzes diferentes',
    iconUrl: '/images/achievements/perfeccionista.svg',
    criteria: {
      type: 'perfectScores',
      count: 5
    }
  }
];

export type AchievementCriteria = {
  type: 'pillsCompleted' | 'quizScore' | 'streak' | 'uniqueModules' | 'perfectScores';
  count?: number;
  average?: number;
  days?: number;
};

type ProgressWithPill = UserProgress & {
  pill: {
    moduleId: string;
  };
};

export async function checkAchievements(
  userId: string,
  prisma: PrismaClient
): Promise<string[]> {
  const newAchievements: string[] = [];

  // Buscar progresso do usuário
  const userProgress = await prisma.userProgress.findMany({
    where: { userId },
    include: {
      pill: {
        select: {
          moduleId: true
        }
      }
    }
  }) as ProgressWithPill[];

  // Buscar conquistas existentes do usuário
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true }
  });

  const existingAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));

  // Verificar cada conquista
  for (const achievement of ACHIEVEMENTS) {
    const criteria = achievement.criteria as AchievementCriteria;
    let shouldAward = false;

    switch (criteria.type) {
      case 'pillsCompleted':
        shouldAward = userProgress.length >= (criteria.count || 0);
        break;

      case 'quizScore':
        const validQuizzes = userProgress.filter(p => p.score !== null);
        const averageScore = validQuizzes.reduce((acc: number, curr: ProgressWithPill) => 
          acc + (curr.score || 0), 0) / validQuizzes.length;
        shouldAward = validQuizzes.length >= (criteria.count || 0) && averageScore >= (criteria.average || 0);
        break;

      case 'streak':
        // Implementar lógica de streak
        const sortedProgress = userProgress.sort((a: ProgressWithPill, b: ProgressWithPill) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
        let currentStreak = 1;
        let lastDate = new Date(sortedProgress[0]?.completedAt);
        
        for (let i = 1; i < sortedProgress.length; i++) {
          const currentDate = new Date(sortedProgress[i].completedAt);
          const diffDays = Math.floor((lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            currentStreak++;
            lastDate = currentDate;
          } else {
            break;
          }
        }
        
        shouldAward = currentStreak >= (criteria.days || 0);
        break;

      case 'uniqueModules':
        const uniqueModules = new Set(userProgress.map(p => p.pill.moduleId));
        shouldAward = uniqueModules.size >= (criteria.count || 0);
        break;

      case 'perfectScores':
        const perfectScores = userProgress.filter(p => p.score === 100).length;
        shouldAward = perfectScores >= (criteria.count || 0);
        break;
    }

    if (shouldAward) {
      const newAchievement = await prisma.achievement.create({
        data: achievement
      });

      await prisma.userAchievement.create({
        data: {
          userId,
          achievementId: newAchievement.id
        }
      });

      newAchievements.push(newAchievement.id);
    }
  }

  return newAchievements;
} 