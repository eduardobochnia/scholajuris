'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock } from 'lucide-react';

interface ProgressData {
  totalModules: number;
  completedModules: number;
  totalPills: number;
  completedPills: number;
  totalAchievements: number;
  unlockedAchievements: number;
  averageScore: number;
}

export function ProgressOverview() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch('/api/user/progress/overview');
        if (!response.ok) {
          throw new Error('Erro ao carregar progresso');
        }
        const data = await response.json();
        setProgress(data);
      } catch (error) {
        setError('Não foi possível carregar o progresso');
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error || !progress) {
    return (
      <Card className="p-6">
        <div className="text-red-500">{error || 'Erro ao carregar progresso'}</div>
      </Card>
    );
  }

  const moduleProgress = (progress.completedModules / progress.totalModules) * 100;
  const pillProgress = (progress.completedPills / progress.totalPills) * 100;
  const achievementProgress = (progress.unlockedAchievements / progress.totalAchievements) * 100;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Visão Geral do Progresso</h2>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Módulos</span>
            </div>
            <span className="text-sm text-gray-500">
              {progress.completedModules} de {progress.totalModules}
            </span>
          </div>
          <Progress value={moduleProgress} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Pílulas</span>
            </div>
            <span className="text-sm text-gray-500">
              {progress.completedPills} de {progress.totalPills}
            </span>
          </div>
          <Progress value={pillProgress} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Conquistas</span>
            </div>
            <span className="text-sm text-gray-500">
              {progress.unlockedAchievements} de {progress.totalAchievements}
            </span>
          </div>
          <Progress value={achievementProgress} className="h-2" />
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="font-medium">Média de Pontuação</span>
            <span className="text-lg font-semibold text-blue-600">
              {progress.averageScore.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
} 