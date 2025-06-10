import { NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/contentManager';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userHistory = [], limit = 10 } = body;

    if (!Array.isArray(userHistory)) {
      return NextResponse.json(
        { error: 'userHistory deve ser um array' },
        { status: 400 }
      );
    }

    const recommendations = await getRecommendations(userHistory, limit);

    return NextResponse.json({
      recommendations,
      total: recommendations.length,
      basedOn: userHistory.length > 0 ? 'user_history' : 'popular_content'
    });
  } catch (error) {
    console.error('Erro ao gerar recomendações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}