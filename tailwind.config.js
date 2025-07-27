/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00f5ff",
        secondary: "#ff00ff", 
        accent: "#ffff00",
        surface: "#1a1a1a",
        success: "#00ff88",
        warning: "#ffaa00",
        error: "#ff3366",
        info: "#3366ff"
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'background-shift': 'backgroundShift 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite'
      },
      keyframes: {
        backgroundShift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-5px) translateY(-10px)' },
          '50%': { transform: 'translateX(10px) translateY(5px)' },
          '75%': { transform: 'translateX(-3px) translateY(10px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.3)' }
        }
      }
    },
  },
  plugins: [],
}