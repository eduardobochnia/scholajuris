'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle, 
  Lock, 
  Play, 
  Clock, 
  Trophy,
  Star,
  Users,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  students: number;
  rating: number;
  modules: CourseModule[];
  color: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  pills: number;
  completed: boolean;
  locked: boolean;
  order: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Fundamentos do Direito',
    description: 'Uma jornada completa pelos conceitos fundamentais do Direito, desde os princípios básicos até a aplicação prática.',
    duration: '8 semanas',
    difficulty: 'Iniciante',
    students: 1247,
    rating: 4.8,
    color: 'from-blue-500 to-blue-600',
    modules: [
      {
        id: '1',
        title: 'Introdução ao Direito',
        description: 'Conceitos básicos, fontes do direito e princípios fundamentais',
        duration: '2 semanas',
        pills: 5,
        completed: true,
        locked: false,
        order: 1
      },
      {
        id: '2',
        title: 'Direito Constitucional',
        description: 'Constituição Federal, direitos fundamentais e organização do Estado',
        duration: '3 semanas',
        pills: 8,
        completed: false,
        locked: false,
        order: 2
      },
      {
        id: '3',
        title: 'Direito Civil',
        description: 'Pessoas, bens, fatos jurídicos e relações civis',
        duration: '3 semanas',
        pills: 12,
        completed: false,
        locked: true,
        order: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Direito Empresarial',
    description: 'Compreenda as complexidades do direito empresarial moderno e suas aplicações práticas no mundo dos negócios.',
    duration: '10 semanas',
    difficulty: 'Intermediário',
    students: 892,
    rating: 4.7,
    color: 'from-green-500 to-green-600',
    modules: [
      {
        id: '4',
        title: 'Direito Societário',
        description: 'Tipos societários, constituição e administração de empresas',
        duration: '3 semanas',
        pills: 10,
        completed: false,
        locked: false,
        order: 1
      },
      {
        id: '5',
        title: 'Contratos Empresariais',
        description: 'Contratos comerciais, negociação e aspectos práticos',
        duration: '4 semanas',
        pills: 15,
        completed: false,
        locked: true,
        order: 2
      },
      {
        id: '6',
        title: 'Direito Falimentar',
        description: 'Recuperação judicial, falência e reestruturação empresarial',
        duration: '3 semanas',
        pills: 8,
        completed: false,
        locked: true,
        order: 3
      }
    ]
  },
  {
    id: '3',
    title: 'Direito Penal Avançado',
    description: 'Aprofunde-se nos aspectos mais complexos do direito penal, incluindo jurisprudência atual e casos práticos.',
    duration: '12 semanas',
    difficulty: 'Avançado',
    students: 634,
    rating: 4.9,
    color: 'from-red-500 to-red-600',
    modules: [
      {
        id: '7',
        title: 'Teoria Geral do Crime',
        description: 'Elementos do crime, tipicidade e antijuridicidade',
        duration: '4 semanas',
        pills: 16,
        completed: false,
        locked: false,
        order: 1
      },
      {
        id: '8',
        title: 'Crimes Específicos',
        description: 'Análise detalhada dos principais tipos penais',
        duration: '4 semanas',
        pills: 20,
        completed: false,
        locked: true,
        order: 2
      },
      {
        id: '9',
        title: 'Processo Penal',
        description: 'Procedimentos, recursos e execução penal',
        duration: '4 semanas',
        pills: 18,
        completed: false,
        locked: true,
        order: 3
      }
    ]
  }
];

export default function TrilhasPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleProgress = (modules: CourseModule[]) => {
    const completed = modules.filter(m => m.completed).length;
    return (completed / modules.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Carregando trilhas de estudo...</p>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    const progress = getModuleProgress(selectedCourse.modules);
    
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-[#0071e3] hover:text-[#0077ED] font-medium text-sm mb-4 transition-colors duration-200"
            >
              ← Voltar às Trilhas
            </button>
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">{selectedCourse.title}</h1>
                <p className="text-xl text-[#86868b] mb-6 max-w-3xl">{selectedCourse.description}</p>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-[#86868b]" />
                    <span className="text-[#86868b]">{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-[#86868b]" />
                    <span className="text-[#86868b]">{selectedCourse.students.toLocaleString()} estudantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-[#86868b]">{selectedCourse.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedCourse.difficulty)}`}>
                    {selectedCourse.difficulty}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#1d1d1f]">Progresso do Curso</span>
                    <span className="text-sm text-[#86868b]">{Math.round(progress)}% concluído</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              </div>

              <div className="ml-8">
                <Button className="bg-[#0071e3] hover:bg-[#0077ED] text-white px-8 py-3 rounded-xl font-medium">
                  <Play className="w-5 h-5 mr-2" />
                  Continuar Estudando
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trilha de Módulos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">Trilha de Aprendizado</h2>
          
          <div className="relative">
            {/* Linha conectora */}
            <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {selectedCourse.modules.map((module, index) => (
                <div key={module.id} className="relative flex items-start">
                  {/* Indicador de status */}
                  <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center ${
                    module.completed 
                      ? 'bg-green-500' 
                      : module.locked 
                      ? 'bg-gray-300' 
                      : `bg-gradient-to-br ${selectedCourse.color}`
                  }`}>
                    {module.completed ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : module.locked ? (
                      <Lock className="w-8 h-8 text-gray-500" />
                    ) : (
                      <span className="text-2xl font-bold text-white">{module.order}</span>
                    )}
                  </div>

                  {/* Conteúdo do módulo */}
                  <div className="ml-8 flex-1">
                    <Card className={`bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${
                      module.locked ? 'opacity-60' : 'hover:scale-[1.02]'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-bold text-[#1d1d1f]">
                            {module.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            {module.completed && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <Trophy className="w-4 h-4" />
                                <span className="text-sm font-medium">Concluído</span>
                              </div>
                            )}
                            {!module.locked && !module.completed && (
                              <ChevronRight className="w-5 h-5 text-[#86868b]" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#86868b] mb-4">{module.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-[#86868b]">
                            <div className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{module.pills} pílulas</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{module.duration}</span>
                            </div>
                          </div>
                          
                          {!module.locked && (
                            <Link href={`/modulos/${module.id}`}>
                              <Button 
                                variant={module.completed ? "outline" : "default"}
                                className={module.completed ? "" : "bg-[#0071e3] hover:bg-[#0077ED]"}
                              >
                                {module.completed ? 'Revisar' : 'Iniciar'}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas do Curso */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-6">Estatísticas do Curso</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0071e3] mb-2">
                  {selectedCourse.modules.length}
                </div>
                <div className="text-[#86868b]">Módulos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#34C759] mb-2">
                  {selectedCourse.modules.reduce((acc, m) => acc + m.pills, 0)}
                </div>
                <div className="text-[#86868b]">Total de Pílulas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF9500] mb-2">
                  {selectedCourse.modules.filter(m => m.completed).length}
                </div>
                <div className="text-[#86868b]">Módulos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF2D55] mb-2">
                  {Math.round(progress)}%
                </div>
                <div className="text-[#86868b]">Progresso</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Trilhas de Estudo</h1>
          <p className="text-xl text-[#86868b]">
            Escolha uma trilha estruturada e acompanhe seu progresso de forma organizada.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cursos Disponíveis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockCourses.map((course) => {
            const progress = getModuleProgress(course.modules);
            
            return (
              <Card 
                key={course.id} 
                className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <CardHeader>
                  <div className={`w-full h-32 bg-gradient-to-br ${course.color} rounded-xl mb-4 flex items-center justify-center`}>
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#1d1d1f] mb-2">
                    {course.title}
                  </CardTitle>
                  <p className="text-[#86868b] text-sm line-clamp-3">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-[#86868b]">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#1d1d1f] font-medium">Progresso</span>
                        <span className="text-[#86868b]">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-[#86868b]">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(course);
                      }}
                    >
                      {progress > 0 ? 'Continuar Trilha' : 'Iniciar Trilha'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Seção de Benefícios */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8 text-center">
            Por que escolher nossas trilhas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Aprendizado Estruturado</h3>
              <p className="text-[#86868b]">
                Conteúdo organizado de forma progressiva para maximizar seu aprendizado.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Acompanhamento de Progresso</h3>
              <p className="text-[#86868b]">
                Visualize seu avanço e conquiste objetivos de forma gamificada.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Conteúdo Especializado</h3>
              <p className="text-[#86868b]">
                Material desenvolvido por especialistas em cada área do Direito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}