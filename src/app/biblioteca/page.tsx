'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, BookOpen, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  pills: {
    id: string;
    title: string;
    description: string;
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
        const response = await fetch('/api/content/modules');
        if (!response.ok) {
          throw new Error('Erro ao carregar módulos');
        }
        const data = await response.json();
        setModules(data);
      } catch (err) {
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
        pill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pill.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (selectedModule) {
      return matchesSearch && module.id === selectedModule;
    }

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar biblioteca: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Biblioteca</h1>
        <p className="text-muted-foreground mb-6">
          Explore todo o conteúdo disponível e encontre o que você precisa.
        </p>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título, descrição ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setSelectedModule(null)}
            className={!selectedModule ? 'bg-primary text-primary-foreground' : ''}
          >
            <Book className="mr-2 h-4 w-4" />
            Todos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {module.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {module.description}
                </p>
                <div className="space-y-2">
                  {module.pills.map((pill) => (
                    <Link
                      key={pill.id}
                      href={`/pilulas/${pill.id}`}
                      className="block p-2 hover:bg-muted rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 text-muted-foreground" />
                        <span>{pill.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum conteúdo encontrado para "{searchQuery}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 