'use client';

import { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Star, 
  Eye, 
  Target, 
  Award,
  Scale,
  Gavel,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Bookmark,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { findBookBySlug, MockBook } from '@/lib/mockData';

export default function LivroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [book, setBook] = useState<MockBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const foundBook = findBookBySlug(slug);
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError('Livro não encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

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
          <p className="text-[#86868b]">Carregando livro...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">Livro não encontrado</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/biblioteca">
            <Button className="bg-[#0071e3] hover:bg-[#0077ED]">
              Voltar à Biblioteca
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/biblioteca"
            className="text-[#0071e3] hover:text-[#0077ED] font-medium text-sm mb-6 inline-flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Biblioteca
          </Link>
          
          <div className="flex items-start space-x-8">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="w-48 h-64 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm text-[#0071e3] bg-blue-50 px-3 py-1 rounded-full font-medium">
                  {book.category}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getDifficultyColor(book.difficulty)}`}>
                  {getDifficultyText(book.difficulty)}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-[#1d1d1f]">{book.rating}</span>
                  <span className="text-sm text-[#86868b]">({book.reviews} avaliações)</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4 leading-tight">{book.title}</h1>
              
              <div className="flex items-center space-x-6 mb-6 text-[#86868b]">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{book.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{book.publishedYear}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>{book.pages} páginas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{book.readingTime} min de leitura</span>
                </div>
              </div>

              <p className="text-lg text-[#86868b] leading-relaxed mb-6">
                {book.synopsis}
              </p>

              <div className="flex items-center space-x-4">
                <Button className="bg-[#0071e3] hover:bg-[#0077ED] text-white px-8 py-3">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Ler Sinopse Completa
                </Button>
                <Button variant="outline" className="px-6 py-3">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Salvar
                </Button>
                <Button variant="outline" className="px-6 py-3">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Overview */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1d1d1f] flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-[#0071e3]" />
                  Visão Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1d1d1f] leading-relaxed text-lg">
                  {book.summary.overview}
                </p>
              </CardContent>
            </Card>

            {/* Main Concepts */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1d1d1f] flex items-center">
                  <Target className="w-6 h-6 mr-3 text-[#0071e3]" />
                  Conceitos Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {book.summary.mainConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#0071e3] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-[#1d1d1f] leading-relaxed">{concept}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Practical Implications */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1d1d1f] flex items-center">
                  <Gavel className="w-6 h-6 mr-3 text-[#0071e3]" />
                  Implicações Práticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {book.summary.practicalImplications.map((implication, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#34C759] rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-[#1d1d1f] leading-relaxed">{implication}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Critical Analysis */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1d1d1f] flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-[#0071e3]" />
                  Análise Crítica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1d1d1f] leading-relaxed text-lg">
                  {book.summary.criticalAnalysis}
                </p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-[#0071e3] to-[#007AFF] text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Award className="w-6 h-6 mr-3" />
                  Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-lg opacity-95">
                  {book.summary.recommendations}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Topics */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Tópicos Principais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {book.keyTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-[#f5f5f7] rounded-lg">
                      <div className="w-2 h-2 bg-[#0071e3] rounded-full"></div>
                      <span className="text-sm text-[#1d1d1f] font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Público-Alvo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {book.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-[#1d1d1f] font-medium">{audience}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practical Applications */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Aplicações Práticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {book.practicalApplications.map((application, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-[#1d1d1f] leading-relaxed">{application}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legislation Covered */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Legislação Abordada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {book.legislationCovered.map((law, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg">
                      <Scale className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1d1d1f] font-medium leading-relaxed">{law}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Jurisprudence References */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Jurisprudência Relevante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {book.jurisprudenceReferences.map((reference, index) => (
                    <div key={index} className="p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-[#1d1d1f] leading-relaxed font-mono">{reference}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Book Details */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Detalhes do Livro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">ISBN:</span>
                    <span className="text-[#1d1d1f] font-mono">{book.isbn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Páginas:</span>
                    <span className="text-[#1d1d1f] font-semibold">{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Ano:</span>
                    <span className="text-[#1d1d1f] font-semibold">{book.publishedYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Tempo de leitura:</span>
                    <span className="text-[#1d1d1f] font-semibold">{book.readingTime} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}