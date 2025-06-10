import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return new NextResponse('Query de busca não fornecida', { status: 400 });
    }

    // Buscar em módulos
    const modules = await prisma.module.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        pills: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Buscar em pílulas
    const pills = await prisma.pill.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Buscar em quizzes
    const quizzes = await prisma.quiz.findMany({
      where: {
        OR: [
          { questions: { some: { text: { contains: query, mode: 'insensitive' } } } },
          { questions: { some: { explanation: { contains: query, mode: 'insensitive' } } } },
        ],
      },
      include: {
        pill: {
          select: {
            id: true,
            title: true,
            module: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    // Formatar resultados
    const results = {
      modules: modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        type: 'module',
        pills: module.pills,
      })),
      pills: pills.map(pill => ({
        id: pill.id,
        title: pill.title,
        type: 'pill',
        module: pill.module,
      })),
      quizzes: quizzes.map(quiz => ({
        id: quiz.id,
        type: 'quiz',
        pill: quiz.pill,
      })),
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error('Erro na busca:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}