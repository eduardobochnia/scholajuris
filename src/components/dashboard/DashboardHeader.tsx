'use client';

import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

interface DashboardHeaderProps {
  userProgress: any[];
  userAchievements: any[];
}

export function DashboardHeader({ userProgress, userAchievements }: DashboardHeaderProps) {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const totalPillsCompleted = userProgress.length;
  const totalAchievements = userAchievements.length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {session.user.name?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Bem-vindo, {session.user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Continue sua jornada de aprendizado
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{totalPillsCompleted}</p>
            <p className="text-sm text-gray-500">Pílulas Completadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{totalAchievements}</p>
            <p className="text-sm text-gray-500">Conquistas</p>
          </div>
        </div>
      </div>
    </Card>
  );
} 