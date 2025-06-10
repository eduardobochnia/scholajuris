'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Trophy, Clock, TrendingUp, ChevronRight } from 'lucide-react';

interface ProgressData {
  totalPills: number;
  completedPills: number;
  averageScore: number;
  streak: number;
}

interface RecentActivity {
  id: string;
  type: 'pill_completed' | 'achievement_unlocked';
  title: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [progress, setProgress] = useState<ProgressData>({
    totalPills: 50,
    completedPills: 12,
    averageScore: 85,
    streak: 5
  });
  
  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'pill_completed',
      title: 'Conceitos Básicos do Direito',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'achievement_unlocked',
      title: 'Jurista Iniciante',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const progressPercentage = (progress.completedPills / progress.totalPills) * 100;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">U</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#1d1d1f]">
                  Bem-vindo, Usuário!
                </h1>
                <p className="text-[#86868b]">
                  Continue sua jornada de aprendizado jurídico
                </p>
              </div>
            </div>
            <Link
              href="/modulos"
              className="bg-[#0071e3] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0077ED] transition-colors duration-200"
            >
              Continuar Estudando
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#1d1d1f]">
                {progress.completedPills}
              </span>
            </div>
            <h3 className="text-sm font-medium text-[#86868b] mb-1">Pílulas Completadas</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#FF2D55] to-[#FF6B6B] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#1d1d1f]">
                {progress.averageScore}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-[#86868b] mb-1">Média de Pontuação</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#5856D6] to-[#8B7CF6] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.averageScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#40A9FF] rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#1d1d1f]">
                {progress.streak}
              </span>
            </div>
            <h3 className="text-sm font-medium text-[#86868b] mb-1">Dias Consecutivos</h3>
            <p className="text-xs text-[#86868b]">Continue estudando!</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#1d1d1f]">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-[#86868b] mb-1">Progresso Total</h3>
            <p className="text-xs text-[#86868b]">
              {progress.totalPills - progress.completedPills} pílulas restantes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Módulos em Progresso */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1d1d1f]">Módulos em Progresso</h2>
              <Link 
                href="/modulos"
                className="text-[#0071e3] hover:text-[#0077ED] font-medium text-sm transition-colors duration-200"
              >
                Ver todos
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#f5f5f7] rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF2D55] to-[#FF6B6B] rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1d1d1f]">Introdução ao Direito</h3>
                    <p className="text-sm text-[#86868b]">3 de 5 pílulas completadas</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#86868b]" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f5f5f7] rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5856D6] to-[#8B7CF6] rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1d1d1f]">Direito Constitucional</h3>
                    <p className="text-sm text-[#86868b]">1 de 8 pílulas completadas</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#86868b]" />
              </div>
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-6">Atividade Recente</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'pill_completed' 
                      ? 'bg-gradient-to-br from-[#34C759] to-[#30D158]'
                      : 'bg-gradient-to-br from-[#FF9500] to-[#FFCC02]'
                  }`}>
                    {activity.type === 'pill_completed' ? (
                      <BookOpen className="w-4 h-4 text-white" />
                    ) : (
                      <Trophy className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{activity.title}</p>
                    <p className="text-sm text-[#86868b]">
                      {activity.type === 'pill_completed' ? 'Pílula completada' : 'Conquista desbloqueada'}
                    </p>
                    <p className="text-xs text-[#86868b]">
                      {new Date(activity.timestamp).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-[#0071e3] to-[#007AFF] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Sua Jornada de Aprendizado
          </h2>
          <p className="text-blue-100 mb-6">
            Você está indo muito bem! Continue estudando para desbloquear novas conquistas.
          </p>
          <Link
            href="/modulos"
            className="bg-white text-[#0071e3] px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 inline-block"
          >
            Explorar Módulos
          </Link>
        </div>
      </div>
    </div>
  );
}