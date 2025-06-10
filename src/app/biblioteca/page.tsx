'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Book, 
  BookOpen, 
  Bookmark, 
  AlertCircle, 
  Target, 
  Clock, 
  Tag,
  Star,
  User,
  Calendar,
  FileText,
  Award,
  TrendingUp,
  Eye,
  Filter,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { mockFormations, getAllPills, MockPill, mockBooks, MockBook } from '@/lib/mockData';
import { dataLoader } from '@/lib/dataLoader';

type ContentType = 'all' | 'pills' | 'books';

export default function BibliotecaPage() {
  const [formations, setFormations] = useState(mockFormations);
  const [pills, setPills] = useState<MockPill[]>([]);
  const [books, setBooks] = useState<MockBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contentType, setContentType] = useState<ContentType>('all');
  const [isUpdatingJson, setIsUpdatingJson] = useState(false);

  const loadContent = async () => {
    try {
      console.log('🔄 Carregando conteúdo da biblioteca...');
      
      // Carregar dados mockados
      const allPills = getAllPills();
      setPills(allPills);
      setFormations(mockFormations);
      setBooks(mockBooks);
      
      // Tentar carregar dados dos arquivos JSON
      try {
        const jsonBooks = await dataLoader.loadBooks();
        if (jsonBooks.length > 0) {
          console.log(`✅ Carregados ${jsonBooks.length} livros dos arquivos JSON`);
          // Converter para formato MockBook
          const convertedBooks: MockBook[] = jsonBooks.map(book => ({
            id: book.id,
            title: book.metadata.title,
            slug: book.metadata.title.toLowerCase().replace(/\s+/g, '-'),
            author: book.bibliographic?.author || book.metadata.author || 'Autor não informado',
            isbn: book.bibliographic?.isbn || '',
            publishedYear: book.bibliographic?.publishedYear || new Date().getFullYear(),
            pages: book.bibliographic?.pages || 0,
            category: book.bibliographic?.category || 'Direito',
            difficulty: book.metadata.difficulty,
            synopsis: book.metadata.description || '',
            tags: book.metadata.tags,
            rating: book.metrics?.rating || 4.5,
            reviews: book.metrics?.reviews || 0,
            readingTime: book.metadata.estimatedTime || book.metrics?.readingTime || 120,
            summary: {
              overview: book.content?.synopsis?.overview || book.metadata.description || '',
              mainConcepts: book.content?.synopsis?.mainConcepts || [],
              practicalImplications: book.content?.synopsis?.practicalImplications || [],
              criticalAnalysis: book.content?.synopsis?.criticalAnalysis || '',
              recommendations: book.content?.synopsis?.recommendations || ''
            },
            keyTopics: book.analysis?.keyTopics || [],
            targetAudience: book.analysis?.targetAudience || [],
            practicalApplications: book.analysis?.practicalApplications || [],
            legislationCovered: book.analysis?.legislationCovered || [],
            jurisprudenceReferences: book.analysis?.jurisprudenceReferences || []
          }));
          
          // Combinar livros mockados com livros dos arquivos JSON
          setBooks([...mockBooks, ...convertedBooks]);
        }
      } catch (jsonError) {
        console.warn('⚠️ Não foi possível carregar livros dos arquivos JSON:', jsonError);
      }

      // Tentar carregar pílulas dos arquivos JSON
      try {
        const jsonPills = await dataLoader.loadPills();
        if (jsonPills.length > 0) {
          console.log(`✅ Carregadas ${jsonPills.length} pílulas dos arquivos JSON`);
          // Aqui você pode converter e adicionar as pílulas JSON se necessário
        }
      } catch (jsonError) {
        console.warn('⚠️ Não foi possível carregar pílulas dos arquivos JSON:', jsonError);
      }
      
      console.log('✅ Biblioteca carregada:', { 
        formations: mockFormations.length, 
        pills: allPills.length,
        books: mockBooks.length 
      });
    } catch (err) {
      console.error('❌ Erro ao carregar biblioteca:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleUpdateJson = async () => {
    setIsUpdatingJson(true);
    try {
      console.log('🔄 Atualizando arquivos JSON...');
      
      // Limpar cache do dataLoader
      dataLoader.clearCache();
      
      // Recarregar conteúdo
      await loadContent();
      
      console.log('✅ Arquivos JSON atualizados com sucesso!');
      alert('Arquivos JSON atualizados com sucesso! Biblioteca atualizada.');
      
    } catch (err) {
      console.error('❌ Erro ao atualizar arquivos JSON:', err);
      alert('Erro ao atualizar arquivos JSON. Verifique os arquivos e tente novamente.');
    } finally {
      setIsUpdatingJson(false);
    }
  };

  const allSubjects = formations.flatMap(formation => 
    formation.modules.flatMap(module => module.subjects)
  );

  const allCategories = Array.from(new Set(books.map(book => book.category)));

  const filteredPills = pills.filter(pill => {
    const matchesSearch = pill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === null || pill.subjectId === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === null || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'Iniciante';
      case 'INTERMEDIATE':
        return 'Intermediário';
      case 'ADVANCED':
        return 'Avançado';
      default:
        return 'Não definido';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Carregando biblioteca...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">Erro ao carregar biblioteca</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#0071e3] text-white px-6 py-2 rounded-lg hover:bg-[#0077ED] transition-colors duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Biblioteca Jurídica</h1>
              <p className="text-xl text-[#86868b]">
                Explore pílulas de conhecimento, livros jurídicos e conteúdo especializado.
              </p>
            </div>
            
            {/* Botão para atualizar JSON */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleUpdateJson}
                disabled={isUpdatingJson}
                className="bg-[#0071e3] hover:bg-[#0077ED] text-white px-6 py-3 font-medium"
              >
                {isUpdatingJson ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Atualizar JSON
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Type Selector */}
        <div className="flex gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setContentType('all')}
            className={`${contentType === 'all' ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
          >
            <Book className="mr-2 h-4 w-4" />
            Todo Conteúdo
          </Button>
          <Button
            variant="outline"
            onClick={() => setContentType('pills')}
            className={`${contentType === 'pills' ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
          >
            <Target className="mr-2 h-4 w-4" />
            Pílulas ({filteredPills.length})
          </Button>
          <Button
            variant="outline"
            onClick={() => setContentType('books')}
            className={`${contentType === 'books' ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Livros ({filteredBooks.length})
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86868b] w-5 h-5" />
            <Input
              type="text"
              placeholder={contentType === 'books' ? "Buscar livros, autores ou sinopses..." : "Buscar pílulas, tags ou conteúdo..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-gray-200 focus:border-[#0071e3] focus:ring-[#0071e3]"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSubject(null);
              setSelectedCategory(null);
            }}
            className="h-12 px-6 border-gray-200"
          >
            <Filter className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>

        {/* Subject/Category Filters */}
        {(contentType === 'all' || contentType === 'pills') && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm font-medium text-[#86868b] flex items-center mr-4">
              <Tag className="w-4 h-4 mr-1" />
              Matérias:
            </span>
            {allSubjects.map((subject) => (
              <Button
                key={subject.id}
                variant="outline"
                size="sm"
                onClick={() => setSelectedSubject(subject.id)}
                className={`${selectedSubject === subject.id ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: subject.color }}
                ></div>
                {subject.title}
              </Button>
            ))}
          </div>
        )}

        {(contentType === 'all' || contentType === 'books') && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm font-medium text-[#86868b] flex items-center mr-4">
              <BookOpen className="w-4 h-4 mr-1" />
              Categorias:
            </span>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${selectedCategory === category ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Content Grid */}
        <div className="space-y-12">
          {/* Pills Section */}
          {(contentType === 'all' || contentType === 'pills') && (
            <div>
              {contentType === 'all' && (
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-[#0071e3]" />
                  Pílulas de Conhecimento
                </h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPills.map((pill) => (
                  <Card key={pill.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {pill.subject && (
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: pill.subject.color }}
                            ></div>
                          )}
                          <span className="text-sm text-[#86868b]">{pill.subject?.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(pill.difficulty)}`}>
                          {getDifficultyText(pill.difficulty)}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-[#1d1d1f] leading-tight">
                        {pill.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-[#86868b]">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{pill.estimatedTime} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>Ordem {pill.order}</span>
                          </div>
                        </div>

                        {pill.tags.length > 0 && (
                          <div>
                            <div className="flex flex-wrap gap-1">
                              {pill.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs text-[#0071e3] bg-blue-50 px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {pill.tags.length > 3 && (
                                <span className="text-xs text-[#86868b] px-2 py-1">
                                  +{pill.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <Link href={`/pilulas/${pill.slug}`}>
                          <Button className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Estudar Pílula
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Books Section */}
          {(contentType === 'all' || contentType === 'books') && (
            <div>
              {contentType === 'all' && (
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-[#0071e3]" />
                  Livros Jurídicos
                </h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Card key={book.id} className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm text-[#0071e3] bg-blue-50 px-2 py-1 rounded-full font-medium">
                          {book.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(book.difficulty)}`}>
                          {getDifficultyText(book.difficulty)}
                        </span>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-[#1d1d1f] leading-tight mb-2">
                        {book.title}
                      </CardTitle>
                      
                      <div className="flex items-center space-x-2 text-sm text-[#86868b] mb-3">
                        <User className="w-4 h-4" />
                        <span>{book.author}</span>
                        <span>•</span>
                        <Calendar className="w-4 h-4" />
                        <span>{book.publishedYear}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-[#86868b] text-sm leading-relaxed line-clamp-3">
                          {book.synopsis}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-[#86868b]" />
                            <span className="text-[#86868b]">{book.readingTime} min</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-[#86868b]" />
                            <span className="text-[#86868b]">{book.pages} páginas</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-[#86868b]">{book.rating}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-[#86868b]" />
                            <span className="text-[#86868b]">{book.reviews} avaliações</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-[#1d1d1f] mb-2">Tópicos principais:</h4>
                          <div className="flex flex-wrap gap-1">
                            {book.keyTopics.slice(0, 3).map((topic, index) => (
                              <span
                                key={index}
                                className="text-xs text-[#34C759] bg-green-50 px-2 py-1 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                            {book.keyTopics.length > 3 && (
                              <span className="text-xs text-[#86868b] px-2 py-1">
                                +{book.keyTopics.length - 3} tópicos
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-[#1d1d1f] mb-2">Aplicações práticas:</h4>
                          <ul className="text-xs text-[#86868b] space-y-1">
                            {book.practicalApplications.slice(0, 2).map((application, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1 h-1 bg-[#86868b] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {application}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href={`/livros/${book.slug}`}>
                          <Button className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Ver Sinopse Completa
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* No Results */}
        {((contentType === 'all' || contentType === 'pills') && filteredPills.length === 0) && 
         ((contentType === 'all' || contentType === 'books') && filteredBooks.length === 0) && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-[#86868b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
              Nenhum conteúdo encontrado
            </h3>
            <p className="text-[#86868b]">
              {searchQuery 
                ? `Nenhum resultado para "${searchQuery}".`
                : 'Nenhum conteúdo disponível com os filtros aplicados.'
              }
            </p>
          </div>
        )}

        {/* Statistics */}
        {(pills.length > 0 || books.length > 0) && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Estatísticas da Biblioteca</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0071e3] mb-2">
                  {formations.length}
                </div>
                <div className="text-[#86868b]">Formações</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#34C759] mb-2">
                  {pills.length}
                </div>
                <div className="text-[#86868b]">Pílulas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF9500] mb-2">
                  {books.length}
                </div>
                <div className="text-[#86868b]">Livros</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF2D55] mb-2">
                  {allSubjects.length}
                </div>
                <div className="text-[#86868b]">Matérias</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}