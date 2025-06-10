'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  ChevronRight, 
  Clock, 
  Star, 
  Users, 
  Trophy,
  Target,
  AlertCircle,
  GraduationCap,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { mockFormations, MockFormation } from '@/lib/mockData';

export default function FormacoesPage() {
  const [formations, setFormations] = useState<MockFormation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setFormations(mockFormations);
      setLoading(false);
    }, 500);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const getLevelText = (level: string) => {
    switch (level) {
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
          <p className="text-[#86868b]">Carregando formações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">Erro ao carregar formações</h2>
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
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Formações Jurídicas</h1>
          <p className="text-xl text-[#86868b]">
            Formações completas e estruturadas para sua especialização em Direito.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Formações Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {formations.map((formation) => {
            const totalModules = formation.modules.length;
            const totalSubjects = formation.modules.reduce((acc, module) => acc + module.subjects.length, 0);
            const totalPills = formation.modules.reduce((acc, module) => 
              acc + module.subjects.reduce((subAcc, subject) => subAcc + subject.pills.length, 0), 0
            );

            return (
              <Card 
                key={formation.id} 
                className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(formation.level)}`}>
                      {getLevelText(formation.level)}
                    </span>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-[#1d1d1f] mb-2">
                    {formation.title}
                  </CardTitle>
                  
                  <p className="text-[#86868b] mb-4 leading-relaxed">
                    {formation.description}
                  </p>

                  <div className="flex items-center space-x-6 text-sm text-[#86868b] mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{totalModules} módulos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{totalSubjects} matérias</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Estatísticas */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-[#f5f5f7] rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0071e3] mb-1">{totalModules}</div>
                        <div className="text-xs text-[#86868b]">Módulos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#34C759] mb-1">{totalSubjects}</div>
                        <div className="text-xs text-[#86868b]">Matérias</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FF9500] mb-1">{totalPills}</div>
                        <div className="text-xs text-[#86868b]">Pílulas</div>
                      </div>
                    </div>

                    {/* Preço */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0071e3] to-[#007AFF] rounded-xl text-white">
                      <div>
                        <div className="text-sm opacity-90">Investimento</div>
                        <div className="text-2xl font-bold">
                          R$ {formation.price.toLocaleString('pt-BR')}
                        </div>
                        <div className="text-sm opacity-90">ou 12x de R$ {(formation.price / 12).toFixed(0)}</div>
                      </div>
                      <Award className="w-8 h-8 opacity-80" />
                    </div>

                    {/* Módulos Preview */}
                    <div>
                      <h4 className="font-semibold text-[#1d1d1f] mb-3">Módulos inclusos:</h4>
                      <div className="space-y-2">
                        {formation.modules.slice(0, 2).map((module) => (
                          <div key={module.id} className="flex items-center space-x-3 p-3 bg-[#f5f5f7] rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{module.order}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-[#1d1d1f] text-sm">{module.title}</div>
                              <div className="text-xs text-[#86868b]">{module.subjects.length} matérias</div>
                            </div>
                          </div>
                        ))}
                        {formation.modules.length > 2 && (
                          <div className="text-center text-sm text-[#86868b] py-2">
                            +{formation.modules.length - 2} módulos adicionais
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex space-x-3 pt-4">
                      <Link href={`/formacoes/${formation.slug}`} className="flex-1">
                        <Button className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium">
                          Ver Detalhes
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="px-6">
                        <Trophy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Seção de Benefícios */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8 text-center">
            Por que escolher nossas formações?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Estrutura Completa</h3>
              <p className="text-[#86868b]">
                Formações organizadas em módulos, matérias e pílulas ultra-específicas para aprendizado eficiente.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Conteúdo Especializado</h3>
              <p className="text-[#86868b]">
                Pílulas com passagens de lei, doutrina, jurisprudência e infográficos explicativos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Certificação</h3>
              <p className="text-[#86868b]">
                Certificados reconhecidos ao concluir cada formação e módulo específico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}