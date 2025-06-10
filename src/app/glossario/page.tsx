'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, Plus } from 'lucide-react';
import Link from 'next/link';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  createdBy: string;
  relatedTerms: {
    id: string;
    term: string;
  }[];
}

export default function GlossarioPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const url = new URL('/api/glossary', window.location.origin);
        if (searchQuery) {
          url.searchParams.set('q', searchQuery);
        } else if (selectedLetter) {
          url.searchParams.set('letter', selectedLetter);
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro ao carregar termos');
        }
        const data = await response.json();
        setTerms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [searchQuery, selectedLetter]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
        Erro ao carregar glossário: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Glossário</h1>
        <p className="text-muted-foreground mb-6">
          Explore os termos jurídicos e suas definições.
        </p>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar termos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null);
              }}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedLetter(null);
            }}
            className={!searchQuery && !selectedLetter ? 'bg-primary text-primary-foreground' : ''}
          >
            <Book className="mr-2 h-4 w-4" />
            Todos
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedLetter(letter);
              }}
              className={selectedLetter === letter ? 'bg-primary text-primary-foreground' : ''}
            >
              {letter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term) => (
            <Card key={term.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{term.term}</span>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {term.definition}
                </p>
                {term.relatedTerms.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Termos Relacionados:</h3>
                    <div className="flex flex-wrap gap-2">
                      {term.relatedTerms.map((relatedTerm) => (
                        <Link
                          key={relatedTerm.id}
                          href={`/glossario?term=${relatedTerm.id}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {relatedTerm.term}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {terms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? `Nenhum termo encontrado para "${searchQuery}".`
                : selectedLetter
                ? `Nenhum termo encontrado começando com "${selectedLetter}".`
                : 'Nenhum termo encontrado.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 