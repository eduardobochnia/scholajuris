'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, BookOpen, Bookmark, AlertCircle, Target, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { mockFormations, getAllPills, MockPill } from '@/lib/mockData';

export default function BibliotecaPage() {
  const [formations, setFormations] = useState(mockFormations);
  const [pills, setPills] = useState<MockPill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('🔄 Carregando biblioteca...');
      
      const allPills = getAllPills();
      setPills(allPills);
      setFormations(mockFormations);
      
      console.log('✅ Biblioteca carregada:', { formations: mockFormations.length, pills: allPills.length });
    } catch (err) {
      console.error('❌ Erro ao carregar biblioteca:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  const allSubjects = formations.flatMap(formation => 
    formation.modules.flatMap(module => module.subjects)
  );

  const filteredPills = pills.filter(pill => {
    const matchesSearch = pill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject = selectedSubject === null || pill.subjectId === selectedSubject;

    return matchesSearch && matchesSubject;
  });

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
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Biblioteca de Pílulas</h1>
          <p className="text-xl text-[#86868b]">
            Explore todas as pílulas de conhecimento disponíveis organizadas por matéria.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86868b] w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por título, tags ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-gray-200 focus:border-[#0071e3] focus:ring-[#0071e3]"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setSelectedSubject(null)}
            className={`h-12 px-6 ${!selectedSubject ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
          >
            <Book className="mr-2 h-4 w-4" />
            Todas as Matérias
          </Button>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allSubjects.map((subject) => (
            <Button
              key={subject.id}
              variant="outline"
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

        {/* Pills Grid */}
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
                  <span className="text-xs bg-[#f5f5f7] px-2 py-1 rounded-full text-[#86868b]">
                    {pill.difficulty}
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
                      <div className="flex items-center space-x-1 mb-2">
                        <Tag className="w-4 h-4 text-[#86868b]" />
                        <span className="text-sm font-medium text-[#1d1d1f]">Tags:</span>
                      </div>
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

        {filteredPills.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-[#86868b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
              Nenhuma pílula encontrada
            </h3>
            <p className="text-[#86868b]">
              {searchQuery 
                ? `Nenhum resultado para "${searchQuery}".`
                : 'Nenhuma pílula disponível com os filtros aplicados.'
              }
            </p>
          </div>
        )}

        {/* Statistics */}
        {pills.length > 0 && (
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
                  {allSubjects.length}
                </div>
                <div className="text-[#86868b]">Matérias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF9500] mb-2">
                  {pills.length}
                </div>
                <div className="text-[#86868b]">Total de Pílulas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF2D55] mb-2">
                  {filteredPills.length}
                </div>
                <div className="text-[#86868b]">Resultados Filtrados</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}