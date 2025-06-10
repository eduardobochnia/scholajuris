import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilitySettings } from '../AccessibilitySettings';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

describe('AccessibilitySettings', () => {
  it('deve renderizar todas as configurações de acessibilidade', () => {
    render(
      <AccessibilityProvider>
        <AccessibilitySettings />
      </AccessibilityProvider>
    );

    expect(screen.getByText('Configurações de Acessibilidade')).toBeInTheDocument();
    expect(screen.getByText('Tamanho da Fonte')).toBeInTheDocument();
    expect(screen.getByText('Alto Contraste')).toBeInTheDocument();
    expect(screen.getByText('Reduzir Movimento')).toBeInTheDocument();
    expect(screen.getByText('Modo Leitor de Tela')).toBeInTheDocument();
  });

  it('deve atualizar o tamanho da fonte quando o slider é movido', () => {
    render(
      <AccessibilityProvider>
        <AccessibilitySettings />
      </AccessibilityProvider>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '20' } });

    expect(screen.getByText('Tamanho atual: 20px')).toBeInTheDocument();
  });

  it('deve alternar as configurações quando os switches são clicados', () => {
    render(
      <AccessibilityProvider>
        <AccessibilitySettings />
      </AccessibilityProvider>
    );

    const switches = screen.getAllByRole('switch');
    
    switches.forEach(switch => {
      expect(switch).not.toBeChecked();
      fireEvent.click(switch);
      expect(switch).toBeChecked();
    });
  });

  it('deve restaurar as configurações padrão quando o botão é clicado', () => {
    render(
      <AccessibilityProvider>
        <AccessibilitySettings />
      </AccessibilityProvider>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '20' } });

    const switches = screen.getAllByRole('switch');
    switches.forEach(switch => fireEvent.click(switch));

    const resetButton = screen.getByText('Restaurar Padrões');
    fireEvent.click(resetButton);

    expect(screen.getByText('Tamanho atual: 16px')).toBeInTheDocument();
    switches.forEach(switch => expect(switch).not.toBeChecked());
  });
}); 