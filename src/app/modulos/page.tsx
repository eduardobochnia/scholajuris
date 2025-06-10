'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  order: number | null;
  slug: string;
  pills: {
    id: string;
    title: string;
  }[];
}

interface ModuleProgress {
  moduleId: string;
  totalPills: number;
  completedPills: number;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('/api/content/modules');

        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }

        const modulesData = await response.json();

        // Simular progresso por módulo
        const progressByModule: Record<string, ModuleProgress> = {};
        modulesData.forEach((module: Module) => {
          progressByModule[module.id] = {
            moduleId: module.id,
            totalPills: module.pills.length,
            completedPills: Math.floor(Math.random() * module.pills.length) // Progresso simulado
          };
        });

        setModules(modulesData);
        setProgress(progressByModule);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar módulos: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Módulos de Estudo</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const moduleProgress = progress[module.id];
          const progressPercentage = moduleProgress
            ? (moduleProgress.completedPills / moduleProgress.totalPills) * 100
            : 0;

          return (
            <Link
              key={module.id}
              href={`/modulos/${module.slug}`}
              className="block transition-transform hover:scale-105"
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    {module.title}
                  </CardTitle>
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {module.description || 'Sem descrição'}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>
                        {moduleProgress?.completedPills || 0} de {moduleProgress?.totalPills || 0} pílulas
                      </span>
                    </div>
                    <Progress value={progressPercentage} />
                  </div>

                  <div className="mt-4 flex items-center text-sm text-primary">
                    Ver módulo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}