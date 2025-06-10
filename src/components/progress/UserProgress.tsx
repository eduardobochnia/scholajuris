'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, BookOpen, Clock } from 'lucide-react';

interface ProgressData {
  pill: {
    title: string;
    module: {
      title: string;
    };
  };
  completedAt: string;
  score: number | null;
}

interface UserProgressProps {
  userId: string;
}

export function UserProgress({ userId }: UserProgressProps) {
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/user/progress');
        if (!response.ok) {
          throw new Error('Erro ao carregar progresso');
        }
        const data = await response.json();
        setProgress(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
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
        Erro ao carregar progresso: {error}
      </div>
    );
  }

  const totalPills = progress.length;
  const averageScore = progress.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalPills || 0;
  const lastCompleted = progress[0]?.completedAt ? new Date(progress[0].completedAt) : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pílulas Completadas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPills}</div>
            <Progress value={(totalPills / 50) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {totalPills} de 50 pílulas completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Pontuação</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
            <Progress value={averageScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Pontuação média nos quizzes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atividade</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastCompleted ? lastCompleted.toLocaleDateString('pt-BR') : 'Nenhuma'}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {lastCompleted ? lastCompleted.toLocaleTimeString('pt-BR') : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{item.pill.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.pill.module.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {item.score !== null ? `${item.score} pontos` : 'Completado'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.completedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 