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
  Timer,
  Sparkles,
  TrendingDown,
  ArrowUp,
  ArrowDown
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
    streak: number;
  };
  stats: {
    totalPills: number;
    completedPills: number;
    averageScore: number;
    streak: number;
    studyTime: number;
    rank: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
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
    trend: number;
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
      completionRate: 83,
      streak: 12
    },
    stats: {
      totalPills: 156,
      completedPills: 89,
      averageScore: 87,
      streak: 12,
      studyTime: 240,
      rank: 15,
      weeklyGrowth: 12,
      monthlyGrowth: 8
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
      { name: 'Direito Civil', progress: 92, color: '#3B82F6', icon: '⚖️', trend: 5 },
      { name: 'Direito Constitucional', progress: 78, color: '#10B981', icon: '🏛️', trend: 12 },
      { name: 'Direito Penal', progress: 65, color: '#F59E0B', icon: '🔒', trend: -3 },
      { name: 'Direito Empresarial', progress: 45, color: '#EF4444', icon: '🏢', trend: 8 },
      { name: 'Processo Civil', progress: 33, color: '#8B5CF6', icon: '📋', trend: 15 }
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
    // Simular carregamento com animação escalonada
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0071e3]/20 border-t-[#0071e3] mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0071e3] to-[#007AFF] opacity-20 animate-pulse"></div>
          </div>
          <p className="text-[#86868b] font-medium">Carregando seu dashboard...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-[#0071e3] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#0071e3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#0071e3] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header com efeito glassmorphism */}
      <div className="frosted-glass border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-slideInLeft">
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Bem-vindo, {dashboardData.user.name.split(' ')[0]}!
              </h1>
              <p className="text-[#86868b] font-medium">
                Seu painel pessoal de aprendizado jurídico
              </p>
            </div>
            <div className="flex items-center space-x-6 animate-slideInRight">
              <div className="text-right">
                <div className="text-sm text-[#86868b] font-medium">Nível atual</div>
                <div className="font-bold text-[#1d1d1f] text-lg">{dashboardData.user.level}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-600">{dashboardData.user.streak} dias</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0071e3] via-[#007AFF] to-[#34C759] rounded-2xl flex items-center justify-center glow-effect floating-animation">
                  <span className="text-2xl font-bold text-white">
                    {dashboardData.user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FF9500] to-[#FFCC02] rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Stats Cards com gradientes e efeitos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {/* Completion Rate Card */}
              <Card className="gradient-card overflow-hidden relative border-0 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] via-[#FF8E8E] to-[#FFB6B6]"></div>
                <CardContent className="relative p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold opacity-95 mb-1">Taxa de Conclusão</h3>
                      <p className="text-sm opacity-80">Pílulas Prioritárias</p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Target className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold mb-3 shimmer-effect">{dashboardData.user.completionRate}%</div>
                  <div className="text-sm opacity-90 mb-4">
                    {dashboardData.stats.completedPills} de {dashboardData.stats.totalPills} completadas
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{dashboardData.stats.weeklyGrowth}% esta semana</span>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                </CardContent>
              </Card>

              {/* Study Streak Card */}
              <Card className="gradient-card overflow-hidden relative border-0 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4] via-[#44A08D] to-[#2E8B7B]"></div>
                <CardContent className="relative p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold opacity-95 mb-1">Sequência de Estudos</h3>
                      <p className="text-sm opacity-80">Dias consecutivos</p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm pulse-glow">
                      <Flame className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold mb-3 shimmer-effect">{dashboardData.stats.streak}</div>
                  <div className="text-sm opacity-90 mb-4">
                    Continue assim! Meta: 30 dias
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">Melhor sequência: 18 dias</span>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics com efeitos glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <Card className="metric-card border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1d1d1f] mb-2">{dashboardData.stats.completedPills}</div>
                  <div className="text-sm text-[#86868b] font-medium">Pílulas Completadas</div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-semibold">+{dashboardData.stats.weeklyGrowth}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1d1d1f] mb-2">{dashboardData.stats.averageScore}%</div>
                  <div className="text-sm text-[#86868b] font-medium">Média de Pontuação</div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-semibold">+3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Timer className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1d1d1f] mb-2">{dashboardData.stats.studyTime}h</div>
                  <div className="text-sm text-[#86868b] font-medium">Tempo de Estudo</div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-semibold">+15h</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1d1d1f] mb-2">#{dashboardData.stats.rank}</div>
                  <div className="text-sm text-[#86868b] font-medium">Ranking Geral</div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-semibold">+2 posições</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress Chart com animações */}
            <Card className="glass-card border-0 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-[#1d1d1f] mb-2">Progresso Semanal</CardTitle>
                    <p className="text-[#86868b] font-medium">Pílulas completadas por dia</p>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#0071e3] to-[#007AFF] rounded-full"></div>
                      <span className="text-[#86868b] font-medium">Completadas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <span className="text-[#86868b] font-medium">Meta</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between space-x-4 h-40 mb-6">
                  {dashboardData.weeklyProgress.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="flex-1 flex flex-col justify-end space-y-1 w-full">
                        <div 
                          className="chart-bar rounded-t-lg transition-all duration-700 ease-out"
                          style={{ 
                            height: `${(day.completed / Math.max(...dashboardData.weeklyProgress.map(d => d.target))) * 100}%`,
                            minHeight: day.completed > 0 ? '12px' : '0px',
                            animationDelay: `${index * 100}ms`
                          }}
                        ></div>
                        <div 
                          className="bg-gray-200 rounded-t-lg transition-all duration-700 ease-out"
                          style={{ 
                            height: `${((day.target - day.completed) / Math.max(...dashboardData.weeklyProgress.map(d => d.target))) * 100}%`,
                            minHeight: (day.target - day.completed) > 0 ? '6px' : '0px',
                            animationDelay: `${index * 100 + 200}ms`
                          }}
                        ></div>
                      </div>
                      <div className="text-sm text-[#86868b] mt-3 font-semibold">{day.day}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center frosted-glass rounded-2xl p-6">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {dashboardData.weeklyProgress.reduce((acc, day) => acc + day.completed, 0)}
                  </div>
                  <div className="text-sm text-[#86868b] font-medium">pílulas esta semana</div>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">+{dashboardData.stats.weeklyGrowth}% vs semana anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Focus Areas com indicadores de tendência */}
            <Card className="glass-card border-0 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1d1d1f] mb-2">Áreas de Foco</CardTitle>
                <p className="text-[#86868b] font-medium">Progresso nas principais matérias jurídicas</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {dashboardData.focusAreas.map((area, index) => (
                    <div key={index} className="activity-item">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 flex-1">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg glow-effect"
                            style={{ backgroundColor: area.color }}
                          >
                            {area.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-bold text-[#1d1d1f]">{area.name}</div>
                              <div className="flex items-center space-x-2">
                                {area.trend > 0 ? (
                                  <ArrowUp className="w-4 h-4 text-green-500" />
                                ) : (
                                  <ArrowDown className="w-4 h-4 text-red-500" />
                                )}
                                <span className={`text-sm font-semibold ${area.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {area.trend > 0 ? '+' : ''}{area.trend}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1 progress-bar h-3">
                                <div 
                                  className="h-full rounded-full transition-all duration-1000 ease-out"
                                  style={{ 
                                    width: `${area.progress}%`,
                                    background: `linear-gradient(90deg, ${area.color}, ${area.color}dd)`,
                                    animationDelay: `${index * 200}ms`
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-[#1d1d1f] min-w-[3rem]">
                                {area.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity com animações escalonadas */}
            <Card className="glass-card border-0 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-[#1d1d1f]">Atividade Recente</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#0071e3] hover:bg-[#0071e3]/10">
                    Ver todas
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="activity-item animate-slideInLeft"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center glow-effect ${
                          activity.type === 'pill_completed' 
                            ? 'bg-gradient-to-br from-[#34C759] to-[#30D158]'
                            : activity.type === 'achievement_unlocked'
                            ? 'bg-gradient-to-br from-[#FF9500] to-[#FFCC02]'
                            : 'bg-gradient-to-br from-[#5856D6] to-[#8B7CF6]'
                        }`}>
                          {activity.type === 'pill_completed' ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : activity.type === 'achievement_unlocked' ? (
                            <Trophy className="w-6 h-6 text-white" />
                          ) : (
                            <Star className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1d1d1f] mb-1">{activity.title}</h3>
                          <div className="flex items-center space-x-4 mb-2">
                            <p className="text-sm text-[#86868b] font-medium">
                              {activity.type === 'pill_completed' ? 'Pílula completada' : 
                               activity.type === 'achievement_unlocked' ? 'Conquista desbloqueada' : 
                               'Quiz aprovado'}
                            </p>
                            {activity.score && (
                              <span className="text-sm font-bold text-[#0071e3] bg-blue-50 px-2 py-1 rounded-full">
                                {activity.score}% de acerto
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#86868b] font-medium">
                            {new Date(activity.timestamp).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com efeitos glassmorphism */}
          <div className="space-y-6 animate-slideInRight">
            {/* Quick Actions */}
            <Card className="sidebar-card border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/formacoes">
                  <Button className="w-full btn-primary justify-start">
                    <Play className="w-5 h-5 mr-3" />
                    Continuar Estudando
                  </Button>
                </Link>
                <Link href="/biblioteca">
                  <Button className="w-full btn-secondary justify-start">
                    <BookOpen className="w-5 h-5 mr-3" />
                    Explorar Biblioteca
                  </Button>
                </Link>
                <Link href="/glossario">
                  <Button className="w-full btn-secondary justify-start">
                    <Brain className="w-5 h-5 mr-3" />
                    Consultar Glossário
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Goals */}
            <Card className="sidebar-card border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Próximos Objetivos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.upcomingGoals.map((goal, index) => (
                  <div 
                    key={goal.id} 
                    className="activity-item animate-fadeIn"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <h3 className="font-bold text-[#1d1d1f] mb-2">{goal.title}</h3>
                    <p className="text-sm text-[#86868b] mb-3 font-medium">{goal.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#86868b] font-medium">Progresso</span>
                        <span className="font-bold text-[#1d1d1f]">{goal.progress}%</span>
                      </div>
                      <div className="progress-bar h-2">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#007AFF] transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${goal.progress}%`,
                            animationDelay: `${index * 300}ms`
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-[#86868b] font-medium">
                        Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Tracker com animação de streak */}
            <Card className="sidebar-card border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f]">Rastreador de Estudos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold gradient-text mb-2 pulse-glow">
                    {dashboardData.stats.streak}
                  </div>
                  <div className="text-sm text-[#86868b] font-medium">dias consecutivos</div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-xs text-orange-600 font-semibold">Sequência ativa!</span>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 14 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg transition-all duration-300 ${
                        i < dashboardData.stats.streak 
                          ? 'bg-gradient-to-br from-[#0071e3] to-[#007AFF] glow-effect' 
                          : 'bg-gray-200'
                      }`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    ></div>
                  ))}
                </div>
                <div className="text-center">
                  <Button className="btn-primary">
                    <Zap className="w-4 h-4 mr-2" />
                    Estudar Hoje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Preview com brilhos */}
            <Card className="sidebar-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-[#1d1d1f]">Conquistas</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#0071e3] hover:bg-[#0071e3]/10">
                    Ver todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-4 activity-item">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF9500] to-[#FFCC02] rounded-2xl flex items-center justify-center mx-auto mb-3 glow-effect">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs font-bold text-[#1d1d1f]">Jurista Iniciante</div>
                  </div>
                  <div className="text-center p-4 activity-item">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-3 glow-effect">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs font-bold text-[#1d1d1f]">Estudante Dedicado</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-2xl opacity-60">
                    <div className="w-10 h-10 bg-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Star className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-xs font-bold text-gray-500">Mestre das Leis</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action com gradiente animado */}
        <div className="mt-12 relative overflow-hidden rounded-3xl animate-fadeIn" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0071e3] via-[#007AFF] to-[#34C759]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="relative p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Continue Sua Jornada de Aprendizado
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg font-medium">
              Você está fazendo um excelente progresso! Continue estudando para alcançar seus objetivos e desbloquear novas conquistas.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/formacoes">
                <Button className="bg-white text-[#0071e3] hover:bg-gray-50 px-8 py-4 text-lg font-semibold glow-effect">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Explorar Formações
                </Button>
              </Link>
              <Link href="/biblioteca">
                <Button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                  <Target className="w-6 h-6 mr-3" />
                  Buscar Pílulas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}