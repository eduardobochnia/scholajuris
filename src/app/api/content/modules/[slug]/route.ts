import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(`🔍 Buscando módulo: ${params.slug}`);
    
    const moduleData = await prisma.module.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        pills: {
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
            videoUrl: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

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