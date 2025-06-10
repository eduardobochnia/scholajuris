import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';

describe('ThemeToggle', () => {
  it('deve renderizar o botão de alternância de tema', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve alternar entre os ícones de sol e lua', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    const moonIcon = screen.getByTestId('moon-icon');
    expect(moonIcon).toBeInTheDocument();

    fireEvent.click(button);
    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();
  });

  it('deve ter o atributo aria-label correto', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Alternar para modo escuro');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Alternar para modo claro');
  });
}); 