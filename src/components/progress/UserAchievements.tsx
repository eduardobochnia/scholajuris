'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string | null;
  awarded: boolean;
  awardedAt: string | null;
}

interface UserAchievementsProps {
  userId: string;
}

export function UserAchievements({ userId }: UserAchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/user/achievements');
        if (!response.ok) {
          throw new Error('Erro ao carregar conquistas');
        }
        const data = await response.json();
        setAchievements(data.achievements);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar conquistas: {error}
      </div>
    );
  }

  const awardedAchievements = achievements.filter(a => a.awarded);
  const lockedAchievements = achievements.filter(a => !a.awarded);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {awardedAchievements.map((achievement) => (
              <Card key={achievement.id} className="bg-primary/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {achievement.name}
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  {achievement.awardedAt && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Conquistado em {new Date(achievement.awardedAt).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="opacity-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {achievement.name}
                  </CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 