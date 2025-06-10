import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const pill = await prisma.pill.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        quizzes: {
          include: {
            questions: {
              select: {
                id: true,
                text: true,
                type: true,
                options: true,
                explanation: true,
              },
            },
          },
        },
      },
    });

    if (!pill) {
      return NextResponse.json(
        { error: 'Pílula não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(pill);
  } catch (error) {
    console.error('Erro ao buscar pílula:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pílula' },
      { status: 500 }
    );
  }
}