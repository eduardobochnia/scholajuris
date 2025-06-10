import { NextResponse } from 'next/server';
import { mockModules } from '@/lib/mockData';

export async function GET() {
  try {
    console.log('🔍 Buscando módulos (dados mockados)...');
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log(`✅ ${mockModules.length} módulos encontrados`);
    
    return NextResponse.json(mockModules);
  } catch (error) {
    console.error('❌ Erro ao buscar módulos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar módulos', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}