/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(59, 130, 246, 0.7)',
      },
      dropShadow: {
        'glow': [
          '0 0 5px rgba(59, 130, 246, 0.5)',
          '0 0 15px rgba(59, 130, 246, 0.3)'
        ],
      }
    }
  },
  plugins: [],
};
