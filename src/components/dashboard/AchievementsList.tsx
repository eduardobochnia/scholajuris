'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}

export function AchievementsList() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        // Simular dados para demonstração
        const data: Achievement[] = [
          {
            id: '1',
            title: 'Jurista Iniciante',
            description: 'Complete sua primeira pílula',
            icon: '🏆',
            unlockedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Estudante Dedicado',
            description: 'Complete 5 pílulas',
            icon: '📚',
            unlockedAt: '2024-01-16T14:20:00Z'
          },
          {
            id: '3',
            title: 'Mestre do Conhecimento',
            description: 'Complete um módulo inteiro',
            icon: '🎓',
            unlockedAt: null
          }
        ];
        
        setAchievements(data);
      } catch (err) {
        setError('Não foi possível carregar as conquistas');
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
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

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">{error}</div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Conquistas</h2>
      <div className="space-y-4">
        {achievements.length === 0 ? (
          <p className="text-gray-500">Nenhuma conquista desbloqueada ainda.</p>
        ) : (
          achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-start space-x-4 p-4 rounded-lg ${
                achievement.unlockedAt
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : 'bg-gray-50 dark:bg-gray-900/20'
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  achievement.unlockedAt
                    ? 'bg-green-100 dark:bg-green-900/40'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <Trophy
                  className={`w-5 h-5 ${
                    achievement.unlockedAt
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <div>
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
                {achievement.unlockedAt && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Desbloqueado em{' '}
                    {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}