'use client';

import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, Type, Zap, Volume2 } from 'lucide-react';

const defaultSettings = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
};

export function AccessibilitySettings() {
  const { settings, updateSettings } = useAccessibility();

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Configurações de Acessibilidade</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            <Label htmlFor="fontSize">Tamanho da Fonte</Label>
          </div>
          <Slider
            id="fontSize"
            min={12}
            max={24}
            step={1}
            value={[settings.fontSize]}
            onValueChange={([value]: number[]) => updateSettings({ fontSize: value })}
          />
          <p className="text-sm text-muted-foreground">
            Tamanho atual: {settings.fontSize}px
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <Label htmlFor="highContrast">Alto Contraste</Label>
          </div>
          <Switch
            id="highContrast"
            checked={settings.highContrast}
            onCheckedChange={(checked: boolean) => updateSettings({ highContrast: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <Label htmlFor="reducedMotion">Reduzir Movimento</Label>
          </div>
          <Switch
            id="reducedMotion"
            checked={settings.reducedMotion}
            onCheckedChange={(checked: boolean) => updateSettings({ reducedMotion: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            <Label htmlFor="screenReader">Modo Leitor de Tela</Label>
          </div>
          <Switch
            id="screenReader"
            checked={settings.screenReader}
            onCheckedChange={(checked: boolean) => updateSettings({ screenReader: checked })}
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => updateSettings(defaultSettings)}
        className="w-full"
      >
        Restaurar Padrões
      </Button>
    </Card>
  );
} 