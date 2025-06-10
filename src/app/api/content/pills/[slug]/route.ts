import { NextResponse } from 'next/server';
import { findPillBySlug } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log(`🔍 Buscando pílula: ${slug} (dados mockados)`);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const pillData = findPillBySlug(slug);

    if (!pillData) {
      console.log(`❌ Pílula não encontrada: ${slug}`);
      return NextResponse.json(
        { error: 'Pílula não encontrada' },
        { status: 404 }
      );
    }

    console.log(`✅ Pílula encontrada: ${pillData.title}`);
    
    return NextResponse.json(pillData);
  } catch (error) {
    console.error('❌ Erro ao buscar pílula:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pílula', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}