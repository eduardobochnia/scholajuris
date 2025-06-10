import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pillId, score } = body;

    console.log(`📈 Registrando progresso: Pílula ${pillId}, Score: ${score}`);

    // Simular registro de progresso
    const progress = {
      id: Date.now().toString(),
      userId: '1',
      pillId,
      score: score || 0,
      completedAt: new Date().toISOString()
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error('❌ Erro ao registrar progresso:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar progresso' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Simular dados de progresso
    const progress = [
      {
        id: '1',
        userId: '1',
        pillId: '1',
        completedAt: '2024-01-15T10:30:00Z',
        score: 95,
        pill: {
          title: 'Conceitos Básicos',
          module: {
            title: 'Introdução ao Direito'
          }
        }
      },
      {
        id: '2',
        userId: '1',
        pillId: '2',
        completedAt: '2024-01-16T14:20:00Z',
        score: 88,
        pill: {
          title: 'Fontes do Direito',
          module: {
            title: 'Introdução ao Direito'
          }
        }
      }
    ];

    return NextResponse.json(progress);
  } catch (error) {
    console.error('❌ Erro ao buscar progresso:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar progresso' },
      { status: 500 }
    );
  }
}