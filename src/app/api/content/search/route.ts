import { NextResponse } from 'next/server';
import { searchContent, SearchFilters } from '@/lib/contentManager';
import { ContentMnemonic } from '@/lib/dataLoader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') as ContentMnemonic | null;
    const difficulty = searchParams.get('difficulty') as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null;
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const status = searchParams.get('status') as 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED' | null;
    const limit = parseInt(searchParams.get('limit') || '20');

    const filters: SearchFilters = {};
    if (type) filters.type = type;
    if (difficulty) filters.difficulty = difficulty;
    if (tags.length > 0) filters.tags = tags;
    if (status) filters.status = status;

    const results = await searchContent(query, filters, limit);

    return NextResponse.json({
      query,
      filters,
      results: results.map(result => ({
        content: result.content,
        relevance: result.relevance,
        matchedFields: result.matchedFields
      })),
      total: results.length
    });
  } catch (error) {
    console.error('Erro na busca de conteúdo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}