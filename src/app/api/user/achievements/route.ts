import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simular dados de conquistas
    const achievements = {
      achievements: [
        {
          id: '1',
          name: 'Jurista Iniciante',
          description: 'Complete sua primeira pílula de conhecimento jurídico',
          iconUrl: '/achievements/jurista-iniciante.png',
          awarded: true,
          awardedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Aprendiz do Direito',
          description: 'Complete 5 pílulas de conhecimento jurídico',
          iconUrl: '/achievements/aprendiz-direito.png',
          awarded: false,
          awardedAt: null
        },
        {
          id: '3',
          name: 'Estudante Dedicado',
          description: 'Complete 10 pílulas de conhecimento jurídico',
          iconUrl: '/achievements/estudante-dedicado.png',
          awarded: false,
          awardedAt: null
        }
      ],
      total: 1
    };

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('❌ Erro ao buscar conquistas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar conquistas' },
      { status: 500 }
    );
  }
}