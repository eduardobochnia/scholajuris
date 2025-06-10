import { dataLoader, ContentMnemonic, BaseContent } from './dataLoader';

export interface JsonLoadResult {
  success: boolean;
  message: string;
  loadedContent?: {
    pills: number;
    books: number;
    modules: number;
    formations: number;
    subjects: number;
  };
  errors?: string[];
}

export class JsonLoader {
  private static instance: JsonLoader;

  private constructor() {}

  public static getInstance(): JsonLoader {
    if (!JsonLoader.instance) {
      JsonLoader.instance = new JsonLoader();
    }
    return JsonLoader.instance;
  }

  // Carrega todos os arquivos JSON disponíveis
  public async loadAllJsonFiles(): Promise<JsonLoadResult> {
    try {
      console.log('🔄 Iniciando carregamento de arquivos JSON...');
      
      const results = {
        pills: 0,
        books: 0,
        modules: 0,
        formations: 0,
        subjects: 0
      };

      const errors: string[] = [];

      // Limpar cache antes de recarregar
      dataLoader.clearCache();

      // Carregar cada tipo de conteúdo
      try {
        const pills = await dataLoader.loadPills();
        results.pills = pills.length;
        console.log(`✅ Carregadas ${pills.length} pílulas`);
      } catch (error) {
        const errorMsg = `Erro ao carregar pílulas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }

      try {
        const books = await dataLoader.loadBooks();
        results.books = books.length;
        console.log(`✅ Carregados ${books.length} livros`);
      } catch (error) {
        const errorMsg = `Erro ao carregar livros: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }

      try {
        const modules = await dataLoader.loadModules();
        results.modules = modules.length;
        console.log(`✅ Carregados ${modules.length} módulos`);
      } catch (error) {
        const errorMsg = `Erro ao carregar módulos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }

      try {
        const formations = await dataLoader.loadFormations();
        results.formations = formations.length;
        console.log(`✅ Carregadas ${formations.length} formações`);
      } catch (error) {
        const errorMsg = `Erro ao carregar formações: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }

      try {
        const subjects = await dataLoader.loadSubjects();
        results.subjects = subjects.length;
        console.log(`✅ Carregadas ${subjects.length} matérias`);
      } catch (error) {
        const errorMsg = `Erro ao carregar matérias: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }

      const totalContent = Object.values(results).reduce((sum, count) => sum + count, 0);

      if (totalContent === 0) {
        return {
          success: false,
          message: 'Nenhum conteúdo foi carregado. Verifique se os arquivos JSON estão na pasta public/data/',
          errors
        };
      }

      const message = errors.length > 0 
        ? `Carregamento parcial: ${totalContent} itens carregados com ${errors.length} erros`
        : `Carregamento completo: ${totalContent} itens carregados com sucesso`;

      return {
        success: errors.length === 0,
        message,
        loadedContent: results,
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      console.error('❌ Erro geral no carregamento:', error);
      return {
        success: false,
        message: `Erro geral no carregamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      };
    }
  }

  // Valida um arquivo JSON antes do carregamento
  public validateJsonContent(content: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Verificações básicas
    if (!content.id) {
      errors.push('Campo "id" é obrigatório');
    }

    if (!content.mnemonic) {
      errors.push('Campo "mnemonic" é obrigatório');
    } else {
      const validMnemonics: ContentMnemonic[] = [
        'PILL', 'BOOK', 'MODULE', 'FORMATION', 'SUBJECT', 'QUIZ', 'GLOSSARY', 'CASE', 'LAW', 'DOCTRINE'
      ];
      if (!validMnemonics.includes(content.mnemonic)) {
        errors.push(`Mnemonic inválido: ${content.mnemonic}. Valores válidos: ${validMnemonics.join(', ')}`);
      }
    }

    if (!content.metadata) {
      errors.push('Campo "metadata" é obrigatório');
    } else {
      if (!content.metadata.title) {
        errors.push('Campo "metadata.title" é obrigatório');
      }
      if (!content.metadata.status) {
        errors.push('Campo "metadata.status" é obrigatório');
      }
      if (!content.metadata.difficulty) {
        errors.push('Campo "metadata.difficulty" é obrigatório');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Recarrega um tipo específico de conteúdo
  public async reloadContentType(type: ContentMnemonic): Promise<JsonLoadResult> {
    try {
      console.log(`🔄 Recarregando conteúdo do tipo ${type}...`);
      
      await dataLoader.reloadType(type);
      
      let count = 0;
      switch (type) {
        case 'PILL':
          count = (await dataLoader.loadPills()).length;
          break;
        case 'BOOK':
          count = (await dataLoader.loadBooks()).length;
          break;
        case 'MODULE':
          count = (await dataLoader.loadModules()).length;
          break;
        case 'FORMATION':
          count = (await dataLoader.loadFormations()).length;
          break;
        case 'SUBJECT':
          count = (await dataLoader.loadSubjects()).length;
          break;
        default:
          count = 0;
      }

      console.log(`✅ Recarregados ${count} itens do tipo ${type}`);

      return {
        success: true,
        message: `${count} itens do tipo ${type} recarregados com sucesso`,
        loadedContent: {
          pills: type === 'PILL' ? count : 0,
          books: type === 'BOOK' ? count : 0,
          modules: type === 'MODULE' ? count : 0,
          formations: type === 'FORMATION' ? count : 0,
          subjects: type === 'SUBJECT' ? count : 0
        }
      };

    } catch (error) {
      console.error(`❌ Erro ao recarregar ${type}:`, error);
      return {
        success: false,
        message: `Erro ao recarregar ${type}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      };
    }
  }

  // Obtém estatísticas dos arquivos carregados
  public async getLoadedContentStats(): Promise<{
    totalFiles: number;
    byType: Record<string, number>;
    lastUpdate: string;
  }> {
    try {
      const [pills, books, modules, formations, subjects] = await Promise.all([
        dataLoader.loadPills(),
        dataLoader.loadBooks(),
        dataLoader.loadModules(),
        dataLoader.loadFormations(),
        dataLoader.loadSubjects()
      ]);

      const byType = {
        PILL: pills.length,
        BOOK: books.length,
        MODULE: modules.length,
        FORMATION: formations.length,
        SUBJECT: subjects.length
      };

      const totalFiles = Object.values(byType).reduce((sum, count) => sum + count, 0);

      return {
        totalFiles,
        byType,
        lastUpdate: new Date().toISOString()
      };

    } catch (error) {
      console.error('❌ Erro ao obter estatísticas:', error);
      return {
        totalFiles: 0,
        byType: {},
        lastUpdate: new Date().toISOString()
      };
    }
  }
}

// Instância singleton
export const jsonLoader = JsonLoader.getInstance();

// Funções de conveniência
export async function loadAllJsonFiles(): Promise<JsonLoadResult> {
  return jsonLoader.loadAllJsonFiles();
}

export async function reloadContentType(type: ContentMnemonic): Promise<JsonLoadResult> {
  return jsonLoader.reloadContentType(type);
}

export async function getLoadedContentStats() {
  return jsonLoader.getLoadedContentStats();
}