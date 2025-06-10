import { dataLoader, ContentMnemonic, BaseContent, PillContent, BookContent, FormationContent } from './dataLoader';

// Interface para resultados de busca
export interface SearchResult<T extends BaseContent = BaseContent> {
  content: T;
  relevance: number;
  matchedFields: string[];
}

// Interface para filtros de busca
export interface SearchFilters {
  type?: ContentMnemonic;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  tags?: string[];
  status?: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  author?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  estimatedTime?: {
    min: number;
    max: number;
  };
}

// Interface para estatísticas de conteúdo
export interface ContentStats {
  totalContent: number;
  byType: Record<ContentMnemonic, number>;
  byDifficulty: Record<string, number>;
  byStatus: Record<string, number>;
  averageTime: number;
  mostUsedTags: Array<{ tag: string; count: number }>;
}

// Classe principal para gerenciamento de conteúdo
export class ContentManager {
  private static instance: ContentManager;
  private searchIndex: Map<string, BaseContent[]> = new Map();
  private tagIndex: Map<string, BaseContent[]> = new Map();

  private constructor() {}

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  // Busca avançada com relevância
  public async searchWithRelevance<T extends BaseContent = BaseContent>(
    query: string,
    filters?: SearchFilters,
    limit: number = 50
  ): Promise<SearchResult<T>[]> {
    const allContent = await this.getAllContent();
    const results: SearchResult<T>[] = [];

    for (const content of allContent) {
      // Aplicar filtros
      if (!this.matchesFilters(content, filters)) {
        continue;
      }

      // Calcular relevância
      const relevance = this.calculateRelevance(content, query);
      if (relevance > 0) {
        const matchedFields = this.getMatchedFields(content, query);
        results.push({
          content: content as T,
          relevance,
          matchedFields
        });
      }
    }

    // Ordenar por relevância e limitar resultados
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }

  // Busca por tags relacionadas
  public async findRelatedContent<T extends BaseContent = BaseContent>(
    contentId: string,
    limit: number = 10
  ): Promise<T[]> {
    const content = await dataLoader.loadContentById(contentId);
    if (!content) return [];

    const relatedResults = await this.searchWithRelevance<T>(
      content.metadata.tags.join(' '),
      { type: content.mnemonic },
      limit + 1 // +1 para excluir o próprio conteúdo
    );

    return relatedResults
      .filter(result => result.content.id !== contentId)
      .slice(0, limit)
      .map(result => result.content);
  }

  // Recomendações baseadas em histórico
  public async getRecommendations<T extends BaseContent = BaseContent>(
    userHistory: string[],
    limit: number = 10
  ): Promise<T[]> {
    if (userHistory.length === 0) {
      // Se não há histórico, retornar conteúdo popular
      return this.getPopularContent<T>(limit);
    }

    // Analisar tags do histórico do usuário
    const userTags = await this.extractUserTags(userHistory);
    const tagQuery = userTags.slice(0, 10).join(' '); // Top 10 tags

    const recommendations = await this.searchWithRelevance<T>(
      tagQuery,
      { status: 'PUBLISHED' },
      limit * 2
    );

    // Filtrar conteúdo já visto
    return recommendations
      .filter(rec => !userHistory.includes(rec.content.id))
      .slice(0, limit)
      .map(rec => rec.content);
  }

  // Busca por trilha de aprendizado
  public async getLearningPath(
    startContentId: string,
    targetDifficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  ): Promise<BaseContent[]> {
    const startContent = await dataLoader.loadContentById(startContentId);
    if (!startContent) return [];

    const path: BaseContent[] = [startContent];
    let currentDifficulty = startContent.metadata.difficulty;

    // Se já está no nível alvo, buscar conteúdo relacionado no mesmo nível
    if (currentDifficulty === targetDifficulty) {
      const related = await this.findRelatedContent(startContentId, 5);
      return [startContent, ...related];
    }

    // Determinar direção da progressão
    const difficulties = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    const currentIndex = difficulties.indexOf(currentDifficulty);
    const targetIndex = difficulties.indexOf(targetDifficulty);
    const direction = targetIndex > currentIndex ? 1 : -1;

    // Construir trilha progressiva
    let currentContent = startContent;
    while (currentContent.metadata.difficulty !== targetDifficulty && path.length < 10) {
      const nextDifficultyIndex = difficulties.indexOf(currentContent.metadata.difficulty) + direction;
      if (nextDifficultyIndex < 0 || nextDifficultyIndex >= difficulties.length) break;

      const nextDifficulty = difficulties[nextDifficultyIndex] as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
      
      const nextContent = await this.findNextInPath(
        currentContent,
        nextDifficulty
      );

      if (nextContent) {
        path.push(nextContent);
        currentContent = nextContent;
      } else {
        break;
      }
    }

    return path;
  }

  // Estatísticas de conteúdo
  public async getContentStats(): Promise<ContentStats> {
    const allContent = await this.getAllContent();
    
    const stats: ContentStats = {
      totalContent: allContent.length,
      byType: {} as Record<ContentMnemonic, number>,
      byDifficulty: {},
      byStatus: {},
      averageTime: 0,
      mostUsedTags: []
    };

    // Contadores
    const typeCount: Record<string, number> = {};
    const difficultyCount: Record<string, number> = {};
    const statusCount: Record<string, number> = {};
    const tagCount: Record<string, number> = {};
    let totalTime = 0;

    for (const content of allContent) {
      // Por tipo
      typeCount[content.mnemonic] = (typeCount[content.mnemonic] || 0) + 1;
      
      // Por dificuldade
      difficultyCount[content.metadata.difficulty] = 
        (difficultyCount[content.metadata.difficulty] || 0) + 1;
      
      // Por status
      statusCount[content.metadata.status] = 
        (statusCount[content.metadata.status] || 0) + 1;
      
      // Tags
      for (const tag of content.metadata.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
      
      // Tempo
      if (content.metadata.estimatedTime) {
        totalTime += content.metadata.estimatedTime;
      }
    }

    stats.byType = typeCount as Record<ContentMnemonic, number>;
    stats.byDifficulty = difficultyCount;
    stats.byStatus = statusCount;
    stats.averageTime = totalTime / allContent.length;
    
    // Top 20 tags mais usadas
    stats.mostUsedTags = Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));

    return stats;
  }

  // Métodos privados auxiliares

  private async getAllContent(): Promise<BaseContent[]> {
    const [pills, books, formations, modules, subjects] = await Promise.all([
      dataLoader.loadPills(),
      dataLoader.loadBooks(),
      dataLoader.loadFormations(),
      dataLoader.loadModules(),
      dataLoader.loadSubjects()
    ]);

    return [...pills, ...books, ...formations, ...modules, ...subjects];
  }

  private matchesFilters(content: BaseContent, filters?: SearchFilters): boolean {
    if (!filters) return true;

    if (filters.type && content.mnemonic !== filters.type) return false;
    if (filters.difficulty && content.metadata.difficulty !== filters.difficulty) return false;
    if (filters.status && content.metadata.status !== filters.status) return false;
    if (filters.author && content.metadata.author !== filters.author) return false;

    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        content.metadata.tags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    if (filters.estimatedTime && content.metadata.estimatedTime) {
      const time = content.metadata.estimatedTime;
      if (time < filters.estimatedTime.min || time > filters.estimatedTime.max) {
        return false;
      }
    }

    if (filters.dateRange) {
      const contentDate = new Date(content.updatedAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (contentDate < startDate || contentDate > endDate) return false;
    }

    return true;
  }

  private calculateRelevance(content: BaseContent, query: string): number {
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    if (queryTerms.length === 0) return 0;

    let relevance = 0;
    const title = content.metadata.title.toLowerCase();
    const description = content.metadata.description?.toLowerCase() || '';
    const tags = content.metadata.tags.join(' ').toLowerCase();

    for (const term of queryTerms) {
      // Título tem peso maior
      if (title.includes(term)) {
        relevance += title === term ? 100 : 50;
      }
      
      // Descrição tem peso médio
      if (description.includes(term)) {
        relevance += 20;
      }
      
      // Tags têm peso menor
      if (tags.includes(term)) {
        relevance += 10;
      }
    }

    return relevance;
  }

  private getMatchedFields(content: BaseContent, query: string): string[] {
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    const matchedFields: string[] = [];

    const title = content.metadata.title.toLowerCase();
    const description = content.metadata.description?.toLowerCase() || '';
    const tags = content.metadata.tags.join(' ').toLowerCase();

    for (const term of queryTerms) {
      if (title.includes(term) && !matchedFields.includes('title')) {
        matchedFields.push('title');
      }
      if (description.includes(term) && !matchedFields.includes('description')) {
        matchedFields.push('description');
      }
      if (tags.includes(term) && !matchedFields.includes('tags')) {
        matchedFields.push('tags');
      }
    }

    return matchedFields;
  }

  private async getPopularContent<T extends BaseContent = BaseContent>(
    limit: number
  ): Promise<T[]> {
    // Simular popularidade baseada em tags mais comuns
    const stats = await this.getContentStats();
    const popularTags = stats.mostUsedTags.slice(0, 5).map(t => t.tag);
    
    const results = await this.searchWithRelevance<T>(
      popularTags.join(' '),
      { status: 'PUBLISHED' },
      limit
    );

    return results.map(r => r.content);
  }

  private async extractUserTags(userHistory: string[]): Promise<string[]> {
    const tagCount: Record<string, number> = {};

    for (const contentId of userHistory) {
      const content = await dataLoader.loadContentById(contentId);
      if (content) {
        for (const tag of content.metadata.tags) {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
      }
    }

    return Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .map(([tag]) => tag);
  }

  private async findNextInPath(
    currentContent: BaseContent,
    targetDifficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  ): Promise<BaseContent | null> {
    const related = await this.findRelatedContent(currentContent.id, 20);
    
    return related.find(content => 
      content.metadata.difficulty === targetDifficulty
    ) || null;
  }
}

// Instância singleton
export const contentManager = ContentManager.getInstance();

// Funções de conveniência
export async function searchContent<T extends BaseContent = BaseContent>(
  query: string,
  filters?: SearchFilters,
  limit?: number
): Promise<SearchResult<T>[]> {
  return contentManager.searchWithRelevance<T>(query, filters, limit);
}

export async function getRecommendations<T extends BaseContent = BaseContent>(
  userHistory: string[],
  limit?: number
): Promise<T[]> {
  return contentManager.getRecommendations<T>(userHistory, limit);
}

export async function getLearningPath(
  startContentId: string,
  targetDifficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
): Promise<BaseContent[]> {
  return contentManager.getLearningPath(startContentId, targetDifficulty);
}

export async function getContentStats(): Promise<ContentStats> {
  return contentManager.getContentStats();
}