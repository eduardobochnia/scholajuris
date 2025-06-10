import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aurora Romana (Tema Claro)
        'aurora': {
          primary: '#8B4513', // Marrom romano
          secondary: '#D4AF37', // Dourado
          accent: '#CD853F', // Bronze
          background: '#F5F5DC', // Bege claro
          text: '#2C1810', // Marrom escuro
        },
        // Nox Bibliothecae (Tema Escuro)
        'nox': {
          primary: '#2C1810', // Marrom escuro
          secondary: '#D4AF37', // Dourado
          accent: '#8B4513', // Marrom romano
          background: '#1A1A1A', // Preto suave
          text: '#F5F5DC', // Bege claro
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config 