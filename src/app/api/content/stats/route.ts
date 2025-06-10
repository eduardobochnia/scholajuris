import { NextResponse } from 'next/server';
import { getContentStats } from '@/lib/contentManager';

export async function GET() {
  try {
    const stats = await getContentStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}