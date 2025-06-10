'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Pill {
  id: string;
  title: string;
  order: number;
  completed?: boolean;
  locked?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  pills: Pill[];
}

interface ModuleProgress {
  completedPills: number;
  totalPills: number;
}

export default function ModulePage({ params }: { params: { id: string } }) {
  const [module, setModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState<ModuleProgress>({ completedPills: 0, totalPills: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const [moduleResponse, progressResponse] = await Promise.all([
          fetch(`/api/content/modules/${params.id}`),
          fetch('/api/user/progress')
        ]);

        if (!moduleResponse.ok || !progressResponse.ok) {
          throw new Error('Erro ao carregar dados');
        }

        const moduleData = await moduleResponse.json();
        const progressData = await progressResponse.json();

        // Calcular progresso e status das pílulas
        const completedPillIds = new Set(
          progressData.map((p: { pillId: string }) => p.pillId)
        );

        const pillsWithStatus = moduleData.pills.map((pill: Pill) => ({
          ...pill,
          completed: completedPillIds.has(pill.id),
          locked: !completedPillIds.has(pill.id) && 
            moduleData.pills.some((p: Pill) => 
              p.order < pill.order && !completedPillIds.has(p.id)
            )
        }));

        setModule({
          ...moduleData,
          pills: pillsWithStatus
        });

        setProgress({
          completedPills: completedPillIds.size,
          totalPills: moduleData.pills.length
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [params.id]);

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

  const progressPercentage = (progress.completedPills / progress.totalPills) * 100;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
        <p className="text-muted-foreground mb-6">
          {module.description || 'Sem descrição'}
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progresso do Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pílulas Completadas</span>
                <span>
                  {progress.completedPills} de {progress.totalPills}
                </span>
              </div>
              <Progress value={progressPercentage} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Pílulas de Conhecimento</h2>
        
        {module.pills.map((pill) => (
          <Link
            key={pill.id}
            href={pill.locked ? '#' : `/pilulas/${pill.id}`}
            className={`block transition-transform ${
              pill.locked ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
            }`}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {pill.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : pill.locked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <BookOpen className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{pill.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pill.completed
                          ? 'Completado'
                          : pill.locked
                          ? 'Bloqueado - Complete as pílulas anteriores'
                          : 'Disponível'}
                      </p>
                    </div>
                  </div>
                  {!pill.locked && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 