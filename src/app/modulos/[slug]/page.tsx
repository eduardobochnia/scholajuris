'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight, Lock, CheckCircle, Clock, Target, Trophy } from 'lucide-react';
import Link from 'next/link';
import { findModuleBySlug, MockModule } from '@/lib/mockData';

export default function ModulePage({ params }: { params: { slug: string } }) {
  const [module, setModule] = useState<MockModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const foundModule = findModuleBySlug(params.slug);
        if (foundModule) {
          setModule(foundModule);
        } else {
          setError('Módulo não encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar módulo: {error || 'Módulo não encontrado'}
      </div>
    );
  }

  const totalSubjects = module.subjects.length;
  const totalPills = module.subjects.reduce((acc, subject) => acc + subject.pills.length, 0);
  const completedPills = 2; // Simulado
  const progressPercentage = (completedPills / totalPills) * 100;

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
          
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">{module.title}</h1>
          <p className="text-xl text-[#86868b] mb-6">{module.description}</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Progresso do Módulo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pílulas Completadas</span>
                  <span>{completedPills} de {totalPills}</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Matérias */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold mb-6">Matérias do Módulo</h2>
          
          {module.subjects.map((subject) => (
            <Card key={subject.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: subject.color }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-[#1d1d1f]">
                      {subject.title}
                    </CardTitle>
                    <p className="text-[#86868b] mt-1">{subject.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#86868b]">{subject.pills.length} pílulas</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {subject.pills.map((pill, index) => {
                    const isCompleted = index < 2; // Simulado
                    const isLocked = index > 2; // Simulado
                    
                    return (
                      <Link
                        key={pill.id}
                        href={isLocked ? '#' : `/pilulas/${pill.slug}`}
                        className={`block transition-transform ${
                          isLocked ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-[#f5f5f7] transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : isLocked ? (
                                <Lock className="h-6 w-6 text-gray-400" />
                              ) : (
                                <div 
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                  style={{ backgroundColor: subject.color }}
                                >
                                  {pill.order}
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-[#1d1d1f]">{pill.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-[#86868b] mt-1">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{pill.estimatedTime} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Target className="w-4 h-4" />
                                  <span>{pill.difficulty}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Trophy className="w-4 h-4" />
                                  <span>{pill.tags.length} tags</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {!isLocked && (
                            <ChevronRight className="h-5 w-5 text-[#86868b]" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[#1d1d1f] mb-6">Estatísticas do Módulo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0071e3] mb-2">{totalSubjects}</div>
              <div className="text-[#86868b]">Matérias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#34C759] mb-2">{totalPills}</div>
              <div className="text-[#86868b]">Total de Pílulas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF9500] mb-2">{Math.round(progressPercentage)}%</div>
              <div className="text-[#86868b]">Progresso</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}