'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { AccessibilitySettings } from '@/components/AccessibilitySettings';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ConfiguracoesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Tema</h2>
            <p className="text-sm text-muted-foreground">
              Escolha entre o tema claro e escuro
            </p>
          </div>
          <ThemeToggle />
        </div>
      </Card>

      <Separator />

      <AccessibilitySettings />
    </div>
  );
} 