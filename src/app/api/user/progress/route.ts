import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    
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

export async function GET() {
  try {
    const session = await getAuthSession();
    
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