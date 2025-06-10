import { NextResponse } from 'next/server';
import { findModuleBySlug } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(`🔍 Buscando módulo: ${params.slug} (dados mockados)`);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const moduleData = findModuleBySlug(params.slug);

    if (!moduleData) {
      console.log(`❌ Módulo não encontrado: ${params.slug}`);
      return NextResponse.json(
        { error: 'Módulo não encontrado' },
        { status: 404 }
      );
    }

    console.log(`✅ Módulo encontrado: ${moduleData.title} com ${moduleData.pills.length} pílulas`);
    
    return NextResponse.json(moduleData);
  } catch (error) {
    console.error('❌ Erro ao buscar módulo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar módulo', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}