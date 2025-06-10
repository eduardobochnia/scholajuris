import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(`🔍 Buscando pílula: ${params.slug}`);
    
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
      console.log(`❌ Pílula não encontrada: ${params.slug}`);
      return NextResponse.json(
        { error: 'Pílula não encontrada' },
        { status: 404 }
      );
    }

    console.log(`✅ Pílula encontrada: ${pill.title}`);
    
    return NextResponse.json(pill);
  } catch (error) {
    console.error('❌ Erro ao buscar pílula:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pílula', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}