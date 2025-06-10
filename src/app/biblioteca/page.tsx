'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, BookOpen, Bookmark, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  slug: string;
  pills: {
    id: string;
    title: string;
    slug: string;
    order: number;
  }[];
}

export default function BibliotecaPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        console.log('🔄 Carregando biblioteca...');
        
        const response = await fetch('/api/content/modules');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || 'Erro ao carregar módulos');
        }
        const data = await response.json();
        
        console.log('✅ Biblioteca carregada:', data);
        setModules(data);
      } catch (err) {
        console.error('❌ Erro ao carregar biblioteca:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.pills.some(pill => 
        pill.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (selectedModule) {
      return matchesSearch && module.id === selectedModule;
    }

    return matchesSearch;
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
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Biblioteca</h1>
          <p className="text-xl text-[#86868b]">
            Explore todo o conteúdo disponível e encontre o que você precisa.
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
              placeholder="Buscar por título, descrição ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-gray-200 focus:border-[#0071e3] focus:ring-[#0071e3]"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setSelectedModule(null)}
            className={`h-12 px-6 ${!selectedModule ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
          >
            <Book className="mr-2 h-4 w-4" />
            Todos
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#1d1d1f]">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  {module.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#86868b] mb-4 line-clamp-2">
                  {module.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-[#1d1d1f] text-sm">Pílulas disponíveis:</h4>
                  {module.pills.slice(0, 3).map((pill) => (
                    <Link
                      key={pill.id}
                      href={`/pilulas/${pill.slug}`}
                      className="block p-2 hover:bg-[#f5f5f7] rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 text-[#86868b]" />
                        <span className="text-sm text-[#1d1d1f]">{pill.title}</span>
                      </div>
                    </Link>
                  ))}
                  {module.pills.length > 3 && (
                    <Link
                      href={`/modulos/${module.slug}`}
                      className="block p-2 text-[#0071e3] hover:text-[#0077ED] text-sm font-medium transition-colors"
                    >
                      Ver todas as {module.pills.length} pílulas →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-[#86868b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
              Nenhum conteúdo encontrado
            </h3>
            <p className="text-[#86868b]">
              {searchQuery 
                ? `Nenhum resultado para "${searchQuery}".`
                : 'Nenhum conteúdo disponível no momento.'
              }
            </p>
          </div>
        )}

        {/* Statistics */}
        {modules.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Estatísticas da Biblioteca</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0071e3] mb-2">
                  {modules.length}
                </div>
                <div className="text-[#86868b]">Módulos Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#34C759] mb-2">
                  {modules.reduce((acc, module) => acc + module.pills.length, 0)}
                </div>
                <div className="text-[#86868b]">Total de Pílulas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF9500] mb-2">
                  {Math.round(modules.reduce((acc, module) => acc + module.pills.length, 0) / modules.length)}
                </div>
                <div className="text-[#86868b]">Média por Módulo</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}