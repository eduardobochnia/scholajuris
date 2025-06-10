// DataLoader para uso no cliente (browser) - sem dependência do módulo 'fs'
export type ContentMnemonic = 
  | 'PILL'      // Pílula de conhecimento
  | 'BOOK'      // Livro jurídico
  | 'MODULE'    // Módulo de formação
  | 'FORMATION' // Formação completa
  | 'SUBJECT'   // Matéria/disciplina
  | 'QUIZ'      // Quiz/avaliação
  | 'GLOSSARY'  // Termo do glossário
  | 'CASE'      // Caso prático
  | 'LAW'       // Texto de lei
  | 'DOCTRINE'; // Texto doutrinário

// Interface base para todos os conteúdos
export interface BaseContent {
  id: string;
  mnemonic: ContentMnemonic;
  version: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    title: string;
    description?: string;
    tags: string[];
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    estimatedTime?: number; // em minutos
    author?: string;
    reviewer?: string;
    status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  };
}

// Interface para pílulas extensas
export interface PillContent extends BaseContent {
  mnemonic: 'PILL';
  content: {
    introduction: {
      overview: string;
      objectives: string[];
      prerequisites?: string[];
    };
    sections: Array<{
      id: string;
      title: string;
      type: 'THEORY' | 'LAW_TEXT' | 'DOCTRINE' | 'JURISPRUDENCE' | 'PRACTICE' | 'CASE_STUDY';
      content: any[]; // Rich content format
      references?: string[];
      notes?: string[];
    }>;
    conclusion: {
      summary: string;
      keyPoints: string[];
      nextSteps?: string[];
    };
    appendices?: Array<{
      title: string;
      content: any[];
    }>;
  };
  relationships: {
    subjectId: string;
    moduleId: string;
    formationId: string;
    prerequisites: string[];
    dependents: string[];
    related: string[];
  };
  assessment?: {
    quizId?: string;
    exercises?: Array<{
      type: 'MULTIPLE_CHOICE' | 'ESSAY' | 'CASE_ANALYSIS';
      question: string;
      options?: string[];
      correctAnswer?: string;
      explanation?: string;
    }>;
  };
}

// Interface para livros completos
export interface BookContent extends BaseContent {
  mnemonic: 'BOOK';
  bibliographic: {
    isbn: string;
    author: string;
    publisher: string;
    publishedYear: number;
    edition: number;
    pages: number;
    language: string;
    category: string;
  };
  content: {
    synopsis: {
      overview: string;
      mainConcepts: string[];
      practicalImplications: string[];
      criticalAnalysis: string;
      recommendations: string;
    };
    chapters: Array<{
      id: string;
      number: number;
      title: string;
      summary: string;
      keyPoints: string[];
      content?: any[]; // Conteúdo completo do capítulo se disponível
    }>;
    appendices?: Array<{
      title: string;
      type: 'LEGISLATION' | 'JURISPRUDENCE' | 'FORMS' | 'TABLES';
      content: any[];
    }>;
  };
  analysis: {
    targetAudience: string[];
    practicalApplications: string[];
    legislationCovered: string[];
    jurisprudenceReferences: string[];
    keyTopics: string[];
    strengths: string[];
    limitations: string[];
  };
  metrics: {
    rating: number;
    reviews: number;
    readingTime: number;
    complexity: number; // 1-10
    relevance: number; // 1-10
  };
}

// Interface para formações
export interface FormationContent extends BaseContent {
  mnemonic: 'FORMATION';
  structure: {
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    duration: string;
    totalModules: number;
    totalHours: number;
    certification: {
      name: string;
      requirements: string[];
      validity: string;
    };
  };
  modules: Array<{
    id: string;
    order: number;
    title: string;
    description: string;
    duration: string;
    subjects: string[]; // IDs das matérias
  }>;
  pricing: {
    currency: string;
    amount: number;
    installments?: {
      count: number;
      amount: number;
    };
  };
  requirements: {
    prerequisites: string[];
    technicalRequirements: string[];
    timeCommitment: string;
  };
}

// Interface para módulos
export interface ModuleContent extends BaseContent {
  mnemonic: 'MODULE';
  structure: {
    formationId: string;
    order: number;
    duration: string;
    objectives: string[];
  };
  subjects: Array<{
    id: string;
    order: number;
    title: string;
    description: string;
    color: string;
    iconUrl?: string;
    pills: string[]; // IDs das pílulas
  }>;
  assessment: {
    type: 'CONTINUOUS' | 'FINAL' | 'MIXED';
    passingScore: number;
    attempts: number;
  };
}

// Interface para matérias
export interface SubjectContent extends BaseContent {
  mnemonic: 'SUBJECT';
  academic: {
    moduleId: string;
    order: number;
    credits?: number;
    workload: number; // horas
  };
  content: {
    syllabus: string[];
    bibliography: Array<{
      type: 'REQUIRED' | 'RECOMMENDED' | 'SUPPLEMENTARY';
      title: string;
      author: string;
      year: number;
    }>;
    topics: Array<{
      id: string;
      title: string;
      subtopics: string[];
      pills: string[]; // IDs das pílulas relacionadas
    }>;
  };
  visual: {
    color: string;
    iconUrl?: string;
    bannerUrl?: string;
  };
}

// Lista de arquivos conhecidos para cada tipo
const KNOWN_FILES = {
  PILL: [
    'direito-civil-personalidade-juridica.json',
    'direito-constitucional-principios-fundamentais.json'
  ],
  BOOK: [
    'manual-direito-civil-tartuce.json',
    'direito-civil-esquematizado-lenza.json'
  ],
  MODULE: [],
  FORMATION: [
    'formacao-direito-civil-completo.json'
  ],
  SUBJECT: []
};

// Classe principal para carregamento de dados no cliente
export class ClientDataLoader {
  private static instance: ClientDataLoader;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): ClientDataLoader {
    if (!ClientDataLoader.instance) {
      ClientDataLoader.instance = new ClientDataLoader();
    }
    return ClientDataLoader.instance;
  }

  // Carrega um arquivo JSON específico via fetch
  private async loadJsonFile(filePath: string): Promise<any> {
    try {
      const fullPath = `/data/${filePath}`;
      console.log(`🔄 Tentando carregar: ${fullPath}`);
      
      const response = await fetch(fullPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const content = await response.json();
      console.log(`✅ Arquivo carregado: ${filePath}`);
      return content;
    } catch (error) {
      console.warn(`⚠️ Erro ao carregar arquivo ${filePath}:`, error);
      return null;
    }
  }

  // Carrega todos os arquivos de um tipo específico
  private async loadContentByType<T extends BaseContent>(
    type: ContentMnemonic
  ): Promise<T[]> {
    const cacheKey = `type_${type}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const typeFolder = type.toLowerCase();
      const knownFiles = KNOWN_FILES[type] || [];
      
      console.log(`🔍 Carregando arquivos do tipo ${type}:`, knownFiles);
      
      const contents: T[] = [];
      
      for (const file of knownFiles) {
        const content = await this.loadJsonFile(`${typeFolder}/${file}`);
        if (content && content.mnemonic === type) {
          contents.push(content as T);
        }
      }

      // Ordenar por ordem se disponível
      contents.sort((a, b) => {
        const orderA = (a as any).structure?.order || (a as any).academic?.order || 0;
        const orderB = (b as any).structure?.order || (b as any).academic?.order || 0;
        return orderA - orderB;
      });

      console.log(`✅ Carregados ${contents.length} itens do tipo ${type}`);
      this.cache.set(cacheKey, contents);
      return contents;
    } catch (error) {
      console.error(`❌ Erro ao carregar conteúdo do tipo ${type}:`, error);
      return [];
    }
  }

  // Carrega um conteúdo específico por ID
  public async loadContentById<T extends BaseContent>(
    id: string,
    type?: ContentMnemonic
  ): Promise<T | null> {
    const cacheKey = `id_${id}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      if (type) {
        const content = await this.loadJsonFile(`${type.toLowerCase()}/${id}.json`);
        if (content) {
          this.cache.set(cacheKey, content);
          return content as T;
        }
      } else {
        // Busca em todos os tipos se não especificado
        const types: ContentMnemonic[] = [
          'PILL', 'BOOK', 'MODULE', 'FORMATION', 'SUBJECT', 'QUIZ', 'GLOSSARY'
        ];
        
        for (const searchType of types) {
          const content = await this.loadJsonFile(`${searchType.toLowerCase()}/${id}.json`);
          if (content && content.id === id) {
            this.cache.set(cacheKey, content);
            return content as T;
          }
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao carregar conteúdo ${id}:`, error);
    }

    return null;
  }

  // Métodos específicos para cada tipo de conteúdo
  public async loadPills(): Promise<PillContent[]> {
    return this.loadContentByType<PillContent>('PILL');
  }

  public async loadBooks(): Promise<BookContent[]> {
    return this.loadContentByType<BookContent>('BOOK');
  }

  public async loadFormations(): Promise<FormationContent[]> {
    return this.loadContentByType<FormationContent>('FORMATION');
  }

  public async loadModules(): Promise<ModuleContent[]> {
    return this.loadContentByType<ModuleContent>('MODULE');
  }

  public async loadSubjects(): Promise<SubjectContent[]> {
    return this.loadContentByType<SubjectContent>('SUBJECT');
  }

  // Busca por slug
  public async findBySlug<T extends BaseContent>(
    slug: string,
    type?: ContentMnemonic
  ): Promise<T | null> {
    const searchTypes = type ? [type] : [
      'PILL', 'BOOK', 'MODULE', 'FORMATION', 'SUBJECT'
    ] as ContentMnemonic[];

    for (const searchType of searchTypes) {
      const contents = await this.loadContentByType<T>(searchType);
      const found = contents.find(content => 
        content.metadata.title.toLowerCase().replace(/\s+/g, '-') === slug ||
        content.id === slug
      );
      if (found) return found;
    }

    return null;
  }

  // Busca com filtros
  public async searchContent<T extends BaseContent>(
    query: string,
    filters?: {
      type?: ContentMnemonic;
      difficulty?: string;
      tags?: string[];
      status?: string;
    }
  ): Promise<T[]> {
    const searchTypes = filters?.type ? [filters.type] : [
      'PILL', 'BOOK', 'MODULE', 'FORMATION', 'SUBJECT'
    ] as ContentMnemonic[];

    const results: T[] = [];

    for (const type of searchTypes) {
      const contents = await this.loadContentByType<T>(type);
      
      const filtered = contents.filter(content => {
        // Filtro por query
        const matchesQuery = !query || 
          content.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
          content.metadata.description?.toLowerCase().includes(query.toLowerCase()) ||
          content.metadata.tags.some(tag => 
            tag.toLowerCase().includes(query.toLowerCase())
          );

        // Filtro por dificuldade
        const matchesDifficulty = !filters?.difficulty || 
          content.metadata.difficulty === filters.difficulty;

        // Filtro por tags
        const matchesTags = !filters?.tags?.length ||
          filters.tags.some(tag => content.metadata.tags.includes(tag));

        // Filtro por status
        const matchesStatus = !filters?.status ||
          content.metadata.status === filters.status;

        return matchesQuery && matchesDifficulty && matchesTags && matchesStatus;
      });

      results.push(...filtered);
    }

    return results;
  }

  // Limpa o cache
  public clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache do dataLoader limpo');
  }

  // Recarrega um tipo específico
  public async reloadType(type: ContentMnemonic): Promise<void> {
    const cacheKey = `type_${type}`;
    this.cache.delete(cacheKey);
    await this.loadContentByType(type);
    console.log(`🔄 Tipo ${type} recarregado`);
  }

  // Adiciona um arquivo conhecido à lista
  public addKnownFile(type: ContentMnemonic, filename: string): void {
    if (!KNOWN_FILES[type].includes(filename)) {
      KNOWN_FILES[type].push(filename);
      console.log(`📝 Arquivo adicionado à lista: ${type}/${filename}`);
    }
  }

  // Lista arquivos conhecidos
  public getKnownFiles(): typeof KNOWN_FILES {
    return { ...KNOWN_FILES };
  }
}

// Instância singleton
export const clientDataLoader = ClientDataLoader.getInstance();

// Funções de conveniência
export async function loadPills(): Promise<PillContent[]> {
  return clientDataLoader.loadPills();
}

export async function loadBooks(): Promise<BookContent[]> {
  return clientDataLoader.loadBooks();
}

export async function loadFormations(): Promise<FormationContent[]> {
  return clientDataLoader.loadFormations();
}

export async function findContentBySlug<T extends BaseContent>(
  slug: string,
  type?: ContentMnemonic
): Promise<T | null> {
  return clientDataLoader.findBySlug<T>(slug, type);
}

export async function searchContent<T extends BaseContent>(
  query: string,
  filters?: {
    type?: ContentMnemonic;
    difficulty?: string;
    tags?: string[];
    status?: string;
  }
): Promise<T[]> {
  return clientDataLoader.searchContent<T>(query, filters);
}