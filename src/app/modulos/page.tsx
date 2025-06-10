'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
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
    slug: string;
    order: number;
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
        console.log('🔄 Carregando módulos...');
        
        const response = await fetch('/api/content/modules');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || 'Erro ao carregar dados');
        }

        const modulesData = await response.json();
        console.log('✅ Módulos carregados:', modulesData);

        // Simular progresso por módulo
        const progressByModule: Record<string, ModuleProgress> = {};
        modulesData.forEach((module: Module) => {
          progressByModule[module.id] = {
            moduleId: module.id,
            totalPills: module.pills.length,
            completedPills: Math.floor(Math.random() * (module.pills.length + 1)) // Progresso simulado
          };
        });

        setModules(modulesData);
        setProgress(progressByModule);
      } catch (err) {
        console.error('❌ Erro ao carregar módulos:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Carregando módulos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">Erro ao carregar módulos</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#0071e3] text-white px-6 py-2 rounded-lg hover:bg-[#0077ED] transition-colors duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <BookOpen className="h-16 w-16 text-[#86868b] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">Nenhum módulo encontrado</h2>
          <p className="text-[#86868b] mb-4">
            Parece que ainda não há módulos disponíveis. Tente novamente mais tarde.
          </p>
          <Link href="/dashboard">
            <button className="bg-[#0071e3] text-white px-6 py-2 rounded-lg hover:bg-[#0077ED] transition-colors duration-200">
              Voltar ao Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4">Módulos de Estudo</h1>
          <p className="text-xl text-[#86868b]">
            Explore nossos módulos estruturados de Direito, organizados de forma progressiva.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <Card className="h-full bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold text-[#1d1d1f]">
                      {module.title}
                    </CardTitle>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0071e3] to-[#007AFF] rounded-xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#86868b] mb-4 line-clamp-2">
                      {module.description || 'Sem descrição disponível'}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#1d1d1f] font-medium">Progresso</span>
                        <span className="text-[#86868b]">
                          {moduleProgress?.completedPills || 0} de {moduleProgress?.totalPills || 0} pílulas
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="mt-4 flex items-center text-sm text-[#0071e3] font-medium">
                      Ver módulo
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Estatísticas */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Seu Progresso Geral</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0071e3] mb-2">
                {modules.length}
              </div>
              <div className="text-[#86868b]">Módulos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#34C759] mb-2">
                {Object.values(progress).reduce((acc, curr) => acc + curr.completedPills, 0)}
              </div>
              <div className="text-[#86868b]">Pílulas Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF9500] mb-2">
                {Object.values(progress).reduce((acc, curr) => acc + curr.totalPills, 0)}
              </div>
              <div className="text-[#86868b]">Total de Pílulas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}