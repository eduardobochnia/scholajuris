'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Play,
  Target,
  Zap,
  Award,
  Calendar,
  Users,
  BarChart3,
  Activity,
  CheckCircle,
  Star,
  Brain,
  Flame,
  Timer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface DashboardData {
  user: {
    name: string;
    avatar: string;
    level: string;
    completionRate: number;
  };
  stats: {
    totalPills: number;
    completedPills: number;
    averageScore: number;
    streak: number;
    studyTime: number;
    rank: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'pill_completed' | 'achievement_unlocked' | 'quiz_passed';
    title: string;
    timestamp: string;
    score?: number;
  }>;
  upcomingGoals: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    target: number;
    deadline: string;
  }>;
  focusAreas: Array<{
    name: string;
    progress: number;
    color: string;
    icon: string;
  }>;
  weeklyProgress: Array<{
    day: string;
    completed: number;
    target: number;
  }>;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    user: {
      name: 'Kristin Watson',
      avatar: '/avatars/kristin.jpg',
      level: 'Jurista Avançado',
      completionRate: 83
    },
    stats: {
      totalPills: 156,
      completedPills: 89,
      averageScore: 87,
      streak: 12,
      studyTime: 240,
      rank: 15
    },
    recentActivity: [
      {
        id: '1',
        type: 'pill_completed',
        title: 'Art. 1º do Código Civil - Conceito de Pessoa',
        timestamp: new Date().toISOString(),
        score: 95
      },
      {
        id: '2',
        type: 'achievement_unlocked',
        title: 'Mestre das Leis',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        type: 'quiz_passed',
        title: 'Quiz: Princípios Constitucionais',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        score: 92
      }
    ],
    upcomingGoals: [
      {
        id: '1',
        title: 'Completar Formação em Direito Civil',
        description: 'Faltam 15 pílulas para concluir',
        progress: 74,
        target: 100,
        deadline: '2024-02-15'
      },
      {
        id: '2',
        title: 'Manter Sequência de 30 dias',
        description: 'Continue estudando diariamente',
        progress: 40,
        target: 100,
        deadline: '2024-02-01'
      }
    ],
    focusAreas: [
      { name: 'Direito Civil', progress: 92, color: '#3B82F6', icon: '⚖️' },
      { name: 'Direito Constitucional', progress: 78, color: '#10B981', icon: '🏛️' },
      { name: 'Direito Penal', progress: 65, color: '#F59E0B', icon: '🔒' },
      { name: 'Direito Empresarial', progress: 45, color: '#EF4444', icon: '🏢' },
      { name: 'Processo Civil', progress: 33, color: '#8B5CF6', icon: '📋' }
    ],
    weeklyProgress: [
      { day: 'Seg', completed: 3, target: 4 },
      { day: 'Ter', completed: 4, target: 4 },
      { day: 'Qua', completed: 2, target: 4 },
      { day: 'Qui', completed: 4, target: 4 },
      { day: 'Sex', completed: 3, target: 4 },
      { day: 'Sáb', completed: 1, target: 2 },
      { day: 'Dom', completed: 0, target: 2 }
    ]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1d1d1f]">
                Bem-vindo, {dashboardData.user.name.split(' ')[0]}!
              </h1>
              <p className="text-[#86868b] mt-1">
                Seu painel pessoal de aprendizado jurídico
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-[#86868b]">Nível atual</div>
                <div className="font-semibold text-[#1d1d1f]">{dashboardData.user.level}</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {dashboardData.user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Completion Rate Card */}
              <Card className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] text-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold opacity-90">Taxa de Conclusão</h3>
                      <p className="text-sm opacity-75">Pílulas Prioritárias</p>
                    </div>
                    <Target className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="text-5xl font-bold mb-2">{dashboardData.user.completionRate}%</div>
                  <div className="text-sm opacity-90">
                    {dashboardData.stats.completedPills} de {dashboardData.stats.totalPills} completadas
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                </CardContent>
              </Card>

              {/* Study Streak Card */}
              <Card className="bg-gradient-to-br from-[#4ECDC4] to-[#44A08D] text-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold opacity-90">Sequência de Estudos</h3>
                      <p className="text-sm opacity-75">Dias consecutivos</p>
                    </div>
                    <Flame className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="text-5xl font-bold mb-2">{dashboardData.stats.streak}</div>
                  <div className="text-sm opacity-90">
                    Continue assim! Meta: 30 dias
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#1d1d1f] mb-1">{dashboardData.stats.completedPills}</div>
                  <div className="text-sm text-[#86868b]">Pílulas Completadas</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#1d1d1f] mb-1">{dashboardData.stats.averageScore}%</div>
                  <div className="text-sm text-[#86868b]">Média de Pontuação</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#1d1d1f] mb-1">{dashboardData.stats.studyTime}h</div>
                  <div className="text-sm text-[#86868b]">Tempo de Estudo</div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#1d1d1f] mb-1">#{dashboardData.stats.rank}</div>
                  <div className="text-sm text-[#86868b]">Ranking Geral</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress Chart */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-[#1d1d1f]">Progresso Semanal</CardTitle>
                    <p className="text-[#86868b] text-sm mt-1">Pílulas completadas por dia</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#0071e3] rounded-full"></div>
                      <span className="text-[#86868b]">Completadas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      <span className="text-[#86868b]">Meta</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between space-x-4 h-32">
                  {dashboardData.weeklyProgress.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="flex-1 flex flex-col justify-end space-y-1 w-full">
                        <div 
                          className="bg-[#0071e3] rounded-t-md transition-all duration-300"
                          style={{ 
                            height: `${(day.completed / Math.max(...dashboardData.weeklyProgress.map(d => d.target))) * 100}%`,
                            minHeight: day.completed > 0 ? '8px' : '0px'
                          }}
                        ></div>
                        <div 
                          className="bg-gray-200 rounded-t-md"
                          style={{ 
                            height: `${((day.target - day.completed) / Math.max(...dashboardData.weeklyProgress.map(d => d.target))) * 100}%`,
                            minHeight: (day.target - day.completed) > 0 ? '4px' : '0px'
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-[#86868b] mt-2 font-medium">{day.day}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-[#1d1d1f]">
                    {dashboardData.weeklyProgress.reduce((acc, day) => acc + day.completed, 0)}
                  </div>
                  <div className="text-sm text-[#86868b]">pílulas esta semana</div>
                </div>
              </CardContent>
            </Card>

            {/* Focus Areas */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1d1d1f]">Áreas de Foco</CardTitle>
                <p className="text-[#86868b] text-sm">Progresso nas principais matérias jurídicas</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {dashboardData.focusAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3 flex-1">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: area.color }}
                        >
                          {area.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-[#1d1d1f] mb-1">{area.name}</div>
                          <div className="flex items-center space-x-3">
                            <Progress value={area.progress} className="flex-1 h-2" />
                            <span className="text-sm font-semibold text-[#1d1d1f] min-w-[3rem]">
                              {area.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-[#1d1d1f]">Atividade Recente</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#0071e3]">
                    Ver todas
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-[#f5f5f7] rounded-xl">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'pill_completed' 
                          ? 'bg-gradient-to-br from-[#34C759] to-[#30D158]'
                          : activity.type === 'achievement_unlocked'
                          ? 'bg-gradient-to-br from-[#FF9500] to-[#FFCC02]'
                          : 'bg-gradient-to-br from-[#5856D6] to-[#8B7CF6]'
                      }`}>
                        {activity.type === 'pill_completed' ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : activity.type === 'achievement_unlocked' ? (
                          <Trophy className="w-5 h-5 text-white" />
                        ) : (
                          <Star className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1d1d1f]">{activity.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-[#86868b]">
                            {activity.type === 'pill_completed' ? 'Pílula completada' : 
                             activity.type === 'achievement_unlocked' ? 'Conquista desbloqueada' : 
                             'Quiz aprovado'}
                          </p>
                          {activity.score && (
                            <span className="text-sm font-semibold text-[#0071e3]">
                              {activity.score}% de acerto
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#86868b] mt-1">
                          {new Date(activity.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/formacoes">
                  <Button className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Continuar Estudando
                  </Button>
                </Link>
                <Link href="/biblioteca">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Explorar Biblioteca
                  </Button>
                </Link>
                <Link href="/glossario">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Consultar Glossário
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Goals */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Próximos Objetivos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.upcomingGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-[#f5f5f7] rounded-xl">
                    <h3 className="font-medium text-[#1d1d1f] mb-2">{goal.title}</h3>
                    <p className="text-sm text-[#86868b] mb-3">{goal.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#86868b]">Progresso</span>
                        <span className="font-semibold text-[#1d1d1f]">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="text-xs text-[#86868b]">
                        Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Tracker */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Rastreador de Estudos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-[#0071e3] mb-1">
                    {dashboardData.stats.streak}
                  </div>
                  <div className="text-sm text-[#86868b]">dias consecutivos</div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 14 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-sm ${
                        i < dashboardData.stats.streak 
                          ? 'bg-[#0071e3]' 
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="text-center">
                  <Button size="sm" className="bg-[#0071e3] hover:bg-[#0077ED] text-white">
                    <Zap className="w-4 h-4 mr-1" />
                    Estudar Hoje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Preview */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-[#1d1d1f]">Conquistas</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#0071e3]">
                    Ver todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-[#f5f5f7] rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs font-medium text-[#1d1d1f]">Jurista Iniciante</div>
                  </div>
                  <div className="text-center p-3 bg-[#f5f5f7] rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs font-medium text-[#1d1d1f]">Estudante Dedicado</div>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded-xl opacity-50">
                    <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Star className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-xs font-medium text-gray-500">Mestre das Leis</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#0071e3] to-[#007AFF] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Continue Sua Jornada de Aprendizado
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Você está fazendo um excelente progresso! Continue estudando para alcançar seus objetivos e desbloquear novas conquistas.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/formacoes">
              <Button className="bg-white text-[#0071e3] hover:bg-gray-50 px-8 py-3">
                <BookOpen className="w-5 h-5 mr-2" />
                Explorar Formações
              </Button>
            </Link>
            <Link href="/biblioteca">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                <Target className="w-5 h-5 mr-2" />
                Buscar Pílulas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}