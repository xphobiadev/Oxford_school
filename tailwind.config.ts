import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // ألوان مستخرجة من الشعار
        navy: {
          50: '#f0f3f9',
          100: '#d9e0f0',
          200: '#b3c1e0',
          300: '#8da2d1',
          400: '#6683c1',
          500: '#2c3e6b',
          600: '#1e2d52',
          700: '#1a2744',
          800: '#141e35',
          900: '#0d1526',
          950: '#070b14',
        },
        gold: {
          50: '#fefbf0',
          100: '#fdf5d6',
          200: '#fbeaad',
          300: '#f8dc7a',
          400: '#f5ce47',
          500: '#d4a826',
          600: '#c49a1f',
          700: '#a37d18',
          800: '#836312',
          900: '#6b510f',
        },
        // Semantic aliases to keep existing components working beautifully
        primary: {
          50: '#f0f3f9',
          100: '#d9e0f0',
          200: '#b3c1e0',
          300: '#8da2d1',
          400: '#6683c1',
          500: '#2c3e6b',
          600: '#1e2d52',
          700: '#1a2744',
          800: '#141e35',
          900: '#0d1526',
          950: '#070b14',
        },
        secondary: {
          50: '#fefbf0',
          100: '#fdf5d6',
          200: '#fbeaad',
          300: '#f8dc7a',
          400: '#f5ce47',
          500: '#d4a826',
          600: '#c49a1f',
          700: '#a37d18',
          800: '#836312',
          900: '#6b510f',
        },
        accent: {
          50: '#fefbf0',
          100: '#fdf5d6',
          200: '#fbeaad',
          300: '#f8dc7a',
          400: '#f5ce47',
          500: '#d4a826',
          600: '#c49a1f',
          700: '#a37d18',
          800: '#836312',
          900: '#6b510f',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-left': 'slideLeft 25s linear infinite',
        'slide-right': 'slideRight 25s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-up-delayed': 'fadeUp 0.8s ease-out 0.2s both',
        'fade-up-delayed-2': 'fadeUp 0.8s ease-out 0.4s both',
        'scale-in': 'scaleIn 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(30) 1s both',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 168, 38, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 168, 38, 0.6)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 168, 38, 0.2), 0 0 40px rgba(212, 168, 38, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 168, 38, 0.4), 0 0 60px rgba(212, 168, 38, 0.2)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4a826, #f5ce47, #d4a826)',
        'navy-gradient': 'linear-gradient(135deg, #0d1526, #1e2d52, #2c3e6b)',
        'royal-gradient': 'linear-gradient(135deg, #0d1526 0%, #1e2d52 50%, #2c3e6b 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(212,168,38,0.3), transparent)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 168, 38, 0.3)',
        'gold-lg': '0 10px 40px rgba(212, 168, 38, 0.4)',
        'navy': '0 4px 20px rgba(13, 21, 38, 0.3)',
        'navy-lg': '0 10px 40px rgba(13, 21, 38, 0.5)',
        'elegant': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 25px 50px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
