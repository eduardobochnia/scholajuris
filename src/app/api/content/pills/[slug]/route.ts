import { NextResponse } from 'next/server';
import { findPillBySlug } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(`🔍 Buscando pílula: ${params.slug} (dados mockados)`);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const pill = findPillBySlug(params.slug);

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