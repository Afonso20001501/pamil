/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0E3B2E',
          dark: '#081F19',
          light: '#155744',
        },
        cue: {
          DEFAULT: '#34D399',
          dim: '#1F8A5C',
          bright: '#6EF0B8',
        },
        spotlight: {
          DEFAULT: '#F5B700',
          dark: '#C99200',
          soft: '#FFD766',
        },
        paper: '#F6F4EC',
        ink: '#10140F',
        sage: '#5C6B62',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        widest2: '0.25em',
      },
      keyframes: {
        vu: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        vu: 'vu 1.1s ease-in-out infinite',
        blink: 'blink 2s ease-in-out infinite',
        riseIn: 'riseIn 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
