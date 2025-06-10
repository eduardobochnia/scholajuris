import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pillId, score } = body;

    if (!pillId) {
      return NextResponse.json(
        { error: 'ID da pílula é obrigatório' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se a pílula existe
    const pill = await prisma.pill.findUnique({
      where: { id: pillId }
    });

    if (!pill) {
      return NextResponse.json(
        { error: 'Pílula não encontrada' },
        { status: 404 }
      );
    }

    // Registra ou atualiza o progresso
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_pillId: {
          userId: user.id,
          pillId: pillId
        }
      },
      update: {
        score: score || undefined,
        completedAt: new Date()
      },
      create: {
        userId: user.id,
        pillId: pillId,
        score: score || 0,
        completedAt: new Date()
      }
    });

    // Verifica conquistas
    const completedPills = await prisma.userProgress.count({
      where: { userId: user.id }
    });

    // Exemplo de verificação de conquista por número de pílulas completadas
    if (completedPills === 1) {
      const achievement = await prisma.achievement.findFirst({
        where: {
          name: 'Jurista Iniciante'
        }
      });

      if (achievement) {
        await prisma.userAchievement.create({
          data: {
            userId: user.id,
            achievementId: achievement.id
          }
        });
      }
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Erro ao registrar progresso:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar progresso' },
      { status: 500 }
    );
  }
}

async function checkAndAwardAchievements(userId: string) {
  const newAchievements = [];

  // Buscar progresso do usuário
  const userProgress = await prisma.userProgress.findMany({
    where: { userId },
  });

  // Verificar conquistas baseadas em pílulas completadas
  const pillsCompleted = userProgress.length;
  const achievements = await prisma.achievement.findMany({
    where: {
      criteria: {
        path: ['type'],
        equals: 'pillsCompleted',
      },
    },
  });

  for (const achievement of achievements) {
    const criteria = achievement.criteria as { count: number };
    
    if (pillsCompleted >= criteria.count) {
      // Verificar se o usuário já tem esta conquista
      const existingAchievement = await prisma.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id,
          },
        },
      });

      if (!existingAchievement) {
        // Conceder conquista
        const userAchievement = await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id,
          },
        });
        newAchievements.push(userAchievement);
      }
    }
  }

  return newAchievements;
}

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId: user.id },
      include: {
        pill: {
          select: {
            title: true,
            module: {
              select: {
                title: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar progresso' },
      { status: 500 }
    );
  }
}