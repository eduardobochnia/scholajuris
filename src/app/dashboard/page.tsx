'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ProgressOverview } from '@/components/dashboard/ProgressOverview';
import { AchievementsList } from '@/components/dashboard/AchievementsList';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <DashboardHeader userProgress={[]} userAchievements={[]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProgressOverview />
          <AchievementsList />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
} 