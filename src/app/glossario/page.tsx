'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, Plus, BookOpen } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

// Dados simulados do glossário
const mockGlossaryTerms: GlossaryTerm[] = [
  {
    id: '1',
    term: 'Direito',
    definition: 'Conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres para os indivíduos e organizações.',
    category: 'Conceitos Fundamentais',
    relatedTerms: ['Lei', 'Norma', 'Ordenamento Jurídico']
  },
  {
    id: '2',
    term: 'Lei',
    definition: 'Norma jurídica escrita, emanada do Poder Legislativo, que estabelece regras de conduta obrigatórias para todos.',
    category: 'Fontes do Direito',
    relatedTerms: ['Direito', 'Norma', 'Legislação']
  },
  {
    id: '3',
    term: 'Constituição',
    definition: 'Lei fundamental de um Estado, que estabelece a organização política, os direitos fundamentais e os princípios básicos da ordem jurídica.',
    category: 'Direito Constitucional',
    relatedTerms: ['Direitos Fundamentais', 'Estado', 'Supremacia Constitucional']
  },
  {
    id: '4',
    term: 'Jurisprudência',
    definition: 'Conjunto de decisões reiteradas dos tribunais sobre casos similares, que serve como orientação para casos futuros.',
    category: 'Fontes do Direito',
    relatedTerms: ['Tribunal', 'Precedente', 'Decisão Judicial']
  },
  {
    id: '5',
    term: 'Doutrina',
    definition: 'Opinião e interpretação dos estudiosos e especialistas do Direito sobre questões jurídicas.',
    category: 'Fontes do Direito',
    relatedTerms: ['Jurista', 'Interpretação', 'Ciência Jurídica']
  },
  {
    id: '6',
    term: 'Princípios Gerais do Direito',
    definition: 'Valores fundamentais que orientam o ordenamento jurídico, servindo como base para a interpretação e aplicação das normas.',
    category: 'Conceitos Fundamentais',
    relatedTerms: ['Valores', 'Interpretação', 'Ordenamento Jurídico']
  },
  {
    id: '7',
    term: 'Direitos Fundamentais',
    definition: 'Direitos básicos e essenciais de todos os cidadãos, protegidos pela Constituição Federal.',
    category: 'Direito Constitucional',
    relatedTerms: ['Constituição', 'Dignidade Humana', 'Cidadania']
  },
  {
    id: '8',
    term: 'Estado de Direito',
    definition: 'Forma de organização política em que o poder estatal está limitado pelo Direito e pela Constituição.',
    category: 'Direito Constitucional',
    relatedTerms: ['Constituição', 'Legalidade', 'Separação de Poderes']
  },
  {
    id: '9',
    term: 'Hermenêutica Jurídica',
    definition: 'Arte e ciência de interpretar as normas jurídicas, buscando determinar seu sentido e alcance.',
    category: 'Interpretação',
    relatedTerms: ['Interpretação', 'Métodos Interpretativos', 'Aplicação do Direito']
  },
  {
    id: '10',
    term: 'Subsunção',
    definition: 'Processo lógico de aplicação da norma jurídica ao caso concreto, verificando se os fatos se enquadram na hipótese normativa.',
    category: 'Aplicação do Direito',
    relatedTerms: ['Aplicação', 'Norma', 'Caso Concreto']
  }
];

export default function GlossarioPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setTerms(mockGlossaryTerms);
      setLoading(false);
    }, 500);
  }, []);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const categories = Array.from(new Set(terms.map(term => term.category)));

  const filteredTerms = terms.filter(term => {
    const matchesSearch = searchQuery === '' || 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLetter = selectedLetter === null || 
      term.term.toUpperCase().startsWith(selectedLetter);
    
    const matchesCategory = selectedCategory === null || 
      term.category === selectedCategory;

    return matchesSearch && matchesLetter && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Carregando glossário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Glossário Jurídico</h1>
          <p className="text-xl text-[#86868b]">
            Explore os termos jurídicos e suas definições detalhadas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86868b] w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar termos ou definições..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null);
              }}
              className="pl-10 h-12 bg-white border-gray-200 focus:border-[#0071e3] focus:ring-[#0071e3]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className={`${!selectedCategory ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Todas as Categorias
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSelectedCategory(category)}
                className={`${selectedCategory === category ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <Button
                key={letter}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter(letter);
                }}
                className={`w-10 h-10 p-0 ${selectedLetter === letter ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'border-gray-200'}`}
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => (
            <Card key={term.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-[#1d1d1f]">
                  <span className="text-lg">{term.term}</span>
                  <div className="text-xs bg-[#f5f5f7] px-2 py-1 rounded-full text-[#86868b]">
                    {term.category}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#86868b] mb-4 leading-relaxed">
                  {term.definition}
                </p>
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-[#1d1d1f]">Termos Relacionados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {term.relatedTerms.map((relatedTerm, index) => (
                        <span
                          key={index}
                          className="text-xs text-[#0071e3] bg-blue-50 px-2 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                          onClick={() => setSearchQuery(relatedTerm)}
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-[#86868b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
              Nenhum termo encontrado
            </h3>
            <p className="text-[#86868b]">
              {searchQuery
                ? `Nenhum resultado para "${searchQuery}".`
                : selectedLetter
                ? `Nenhum termo encontrado começando com "${selectedLetter}".`
                : 'Nenhum termo encontrado com os filtros aplicados.'}
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Estatísticas do Glossário</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0071e3] mb-2">
                {terms.length}
              </div>
              <div className="text-[#86868b]">Termos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#34C759] mb-2">
                {categories.length}
              </div>
              <div className="text-[#86868b]">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF9500] mb-2">
                {filteredTerms.length}
              </div>
              <div className="text-[#86868b]">Resultados Filtrados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}