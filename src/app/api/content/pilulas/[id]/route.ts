import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const pillId = params.id;

  try {
    const pill = await prisma.pill.findUnique({
      where: { id: pillId },
      include: {
        module: true, // Incluir informações do módulo associado
        quizzes: {
          include: {
            questions: true, // Incluir perguntas dos quizzes
          },
        },
      },
    });

    if (!pill) {
      return NextResponse.json({ error: "Pílula não encontrada" }, { status: 404 });
    }

    return NextResponse.json(pill);
  } catch (error) {
    console.error(`Erro ao buscar pílula com ID ${pillId}:`, error);
    return NextResponse.json({ error: "Erro ao buscar pílula" }, { status: 500 });
  }
}

// Adicionar outras funções para PUT, DELETE se necessário