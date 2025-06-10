import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 Buscando módulos...');
    
    const modules = await prisma.module.findMany({
      include: {
        pills: {
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    console.log(`✅ ${modules.length} módulos encontrados`);
    
    return NextResponse.json(modules);
  } catch (error) {
    console.error('❌ Erro ao buscar módulos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar módulos', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}