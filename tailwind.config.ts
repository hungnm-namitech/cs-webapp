import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: ['class', '.bright-green'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      tablet: '750px',
    },
    fontFamily: {
      inter: '"Inter var", sans-serif',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: '#FFD833',
        secondary: '#FF6600',
        third: '#1F2124',
        forth: '#009F92',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hidden-scroll::-webkit-scrollbar': {
          display: 'none',
        },
        '.show-scroll': {
          display: 'initial',
        },
        '.line-clamp': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      });
    }),
  ],
} satisfies Config;

export default config;
