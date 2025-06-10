import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { Achievement, UserAchievement } from '@prisma/client';

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

    const achievements = await prisma.userAchievement.findMany({
      where: { userId: user.id },
      include: {
        achievement: true
      },
      orderBy: {
        awardedAt: 'desc'
      }
    });

    // Buscar todas as conquistas disponíveis para mostrar quais ainda não foram conquistadas
    const allAchievements = await prisma.achievement.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    // Mapear conquistas disponíveis vs conquistadas
    const achievementsWithStatus = allAchievements.map((achievement: Achievement) => {
      const userAchievement = achievements.find(
        (ua: UserAchievement & { achievement: Achievement }) => ua.achievementId === achievement.id
      );
      
      return {
        ...achievement,
        awarded: !!userAchievement,
        awardedAt: userAchievement?.awardedAt
      };
    });

    return NextResponse.json({
      achievements: achievementsWithStatus,
      total: achievements.length
    });
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar conquistas' },
      { status: 500 }
    );
  }
}