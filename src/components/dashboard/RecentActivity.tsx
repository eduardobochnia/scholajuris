'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Award, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'pill_completed' | 'achievement_unlocked' | 'module_completed';
  title: string;
  description: string;
  timestamp: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        // Simular dados para demonstração
        const data: Activity[] = [
          {
            id: '1',
            type: 'pill_completed',
            title: 'Conceitos Básicos do Direito',
            description: 'Pílula completada',
            timestamp: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            type: 'achievement_unlocked',
            title: 'Jurista Iniciante',
            description: 'Conquista desbloqueada',
            timestamp: '2024-01-14T15:45:00Z'
          },
          {
            id: '3',
            type: 'pill_completed',
            title: 'Princípios Constitucionais',
            description: 'Pílula completada',
            timestamp: '2024-01-13T09:15:00Z'
          }
        ];
        
        setActivities(data);
      } catch (error) {
        setError('Não foi possível carregar as atividades');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
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

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'pill_completed':
        return <Clock className="w-5 h-5 text-purple-500" />;
      case 'achievement_unlocked':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'module_completed':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500">Nenhuma atividade recente.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/20"
            >
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}