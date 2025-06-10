import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const letter = searchParams.get('letter');

    // Como não temos tabela de glossário ainda, retornar array vazio
    const terms = [];

    return NextResponse.json(terms);
  } catch (error) {
    console.error('Erro ao buscar termos do glossário:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.email) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = await request.json();
    const { term, definition, relatedTerms } = body;

    if (!term || !definition) {
      return new NextResponse('Termo e definição são obrigatórios', { status: 400 });
    }

    // Como não temos tabela de glossário ainda, retornar sucesso simulado
    const newTerm = {
      id: '1',
      term,
      definition,
      createdBy: session.user.email,
      relatedTerms: relatedTerms || [],
    };

    return NextResponse.json(newTerm);
  } catch (error) {
    console.error('Erro ao criar termo do glossário:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}