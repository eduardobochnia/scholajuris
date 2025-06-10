'use client';

import { useEffect, useState } from 'react';
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
  Award,
  CheckCircle,
  Lock,
  Play
} from 'lucide-react';
import Link from 'next/link';
import { findFormationBySlug, MockFormation } from '@/lib/mockData';

export default function FormacaoPage({ params }: { params: { slug: string } }) {
  const [formation, setFormation] = useState<MockFormation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      const foundFormation = findFormationBySlug(params.slug);
      if (foundFormation) {
        setFormation(foundFormation);
      } else {
        setError('Formação não encontrada');
      }
      setLoading(false);
    }, 500);
  }, [params.slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Carregando formação...</p>
        </div>
      </div>
    );
  }

  if (error || !formation) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">Formação não encontrada</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/formacoes">
            <Button className="bg-[#0071e3] hover:bg-[#0077ED]">
              Voltar às Formações
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalModules = formation.modules.length;
  const totalSubjects = formation.modules.reduce((acc, module) => acc + module.subjects.length, 0);
  const totalPills = formation.modules.reduce((acc, module) => 
    acc + module.subjects.reduce((subAcc, subject) => subAcc + subject.pills.length, 0), 0
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/formacoes"
            className="text-[#0071e3] hover:text-[#0077ED] font-medium text-sm mb-4 inline-block transition-colors duration-200"
          >
            ← Voltar às Formações
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(formation.level)}`}>
                    {getLevelText(formation.level)}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">{formation.title}</h1>
              <p className="text-xl text-[#86868b] mb-6 max-w-3xl">{formation.description}</p>
              
              <div className="flex items-center space-x-8 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#86868b]" />
                  <span className="text-[#86868b]">{formation.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-[#86868b]" />
                  <span className="text-[#86868b]">{totalModules} módulos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-[#86868b]" />
                  <span className="text-[#86868b]">{totalSubjects} matérias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-[#86868b]" />
                  <span className="text-[#86868b]">{totalPills} pílulas</span>
                </div>
              </div>
            </div>

            <div className="ml-8">
              <Card className="w-80">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#0071e3] mb-2">
                      R$ {formation.price.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-[#86868b]">
                      ou 12x de R$ {(formation.price / 12).toFixed(0)}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium mb-4">
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Formação
                  </Button>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Acesso vitalício</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificado de conclusão</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Suporte especializado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Garantia de 30 dias</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trilha de Módulos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">Trilha de Aprendizado</h2>
          
          <div className="relative">
            {/* Linha conectora */}
            <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {formation.modules.map((module, index) => (
                <div key={module.id} className="relative flex items-start">
                  {/* Indicador de status */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#007AFF] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{module.order}</span>
                  </div>

                  {/* Conteúdo do módulo */}
                  <div className="ml-8 flex-1">
                    <Card className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-bold text-[#1d1d1f]">
                            {module.title}
                          </CardTitle>
                          <ChevronRight className="w-5 h-5 text-[#86868b]" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#86868b] mb-4">{module.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {module.subjects.map((subject) => (
                            <div key={subject.id} className="flex items-center space-x-3 p-3 bg-[#f5f5f7] rounded-lg">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: subject.color }}
                              >
                                <BookOpen className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-[#1d1d1f] text-sm">{subject.title}</div>
                                <div className="text-xs text-[#86868b]">{subject.pills.length} pílulas</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-[#86868b]">
                            <div className="flex items-center space-x-1">
                              <Target className="w-4 h-4" />
                              <span>{module.subjects.length} matérias</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Trophy className="w-4 h-4" />
                              <span>{module.subjects.reduce((acc, s) => acc + s.pills.length, 0)} pílulas</span>
                            </div>
                          </div>
                          
                          <Link href={`/modulos/${module.slug}`}>
                            <Button className="bg-[#0071e3] hover:bg-[#0077ED]">
                              Acessar Módulo
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estatísticas da Formação */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[#1d1d1f] mb-6">Estatísticas da Formação</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0071e3] mb-2">{totalModules}</div>
              <div className="text-[#86868b]">Módulos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#34C759] mb-2">{totalSubjects}</div>
              <div className="text-[#86868b]">Matérias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF9500] mb-2">{totalPills}</div>
              <div className="text-[#86868b]">Pílulas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF2D55] mb-2">{formation.duration}</div>
              <div className="text-[#86868b]">Duração</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}