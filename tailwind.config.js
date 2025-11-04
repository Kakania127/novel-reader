// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 小王子主题色彩系统 - 使用标准颜色名称
        'star-blue': {
          50: '#f0f7ff',
          100: '#e0effe', 
          200: '#bae0fd',
          300: '#7cc6fc',
          400: '#36a9f7',
          500: '#0c8ce9',
          600: '#026dc7',
          700: '#0356a1',
          800: '#074885',
          900: '#0c3a6e',
        },
        'desert-yellow': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        'rose-red': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        'serif': ['"Noto Serif SC"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'handwriting': ['"Caveat"', 'cursive']
      },
      backgroundImage: {
        'star-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23fbbf24\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"0.5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'star-twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}