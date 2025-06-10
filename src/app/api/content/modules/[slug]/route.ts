import { NextResponse } from 'next/server';
import { findModuleBySlug } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log(`🔍 Buscando módulo: ${slug} (dados mockados)`);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const moduleData = findModuleBySlug(slug);

    if (!moduleData) {
      console.log(`❌ Módulo não encontrado: ${slug}`);
      return NextResponse.json(
        { error: 'Módulo não encontrado' },
        { status: 404 }
      );
    }

    const totalPills = moduleData.subjects.reduce((acc, subject) => acc + subject.pills.length, 0);
    console.log(`✅ Módulo encontrado: ${moduleData.title} com ${totalPills} pílulas`);
    
    return NextResponse.json(moduleData);
  } catch (error) {
    console.error('❌ Erro ao buscar módulo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar módulo', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}