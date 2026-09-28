/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0F1F17',
          900: '#15291E',
          800: '#1F3A2B'
        },
        ink: {
          900: '#1E2419',
          600: '#5B6355',
          500: '#7A8273',
          300: '#D3D6C8',
          200: '#E6E5DA',
          100: '#F0EEE4'
        },
        canvas: '#F7F4EC',
        brand: {
          50: '#EFF7EA',
          100: '#DCEBD2',
          400: '#A6D28A',
          500: '#6FA85A',
          600: '#4E8A3F',
          700: '#2F6B2F'
        },
        harvest: {
          100: '#FBEBC1',
          400: '#F2B632',
          700: '#7A5800'
        },
        water: {
          500: '#3B8DBD'
        },
        tint: {
          sage: '#DCEBD2',
          wheat: '#F6EBC8',
          clay: '#F3DCCB',
          rose: '#F6DAD5',
          sky: '#D8EAF3',
          lilac: '#E8E1F1'
        },
        parcel: {
          old: '#2F6FB5',
          verified: '#2F9E5B',
          pending: '#D9A21B',
          disputed: '#C23B3B',
          mismatch: '#D9782F',
          government: '#7B5EA7',
          proposed: '#1E2419',
          approved: '#1F7A5A',
          fieldvisit: '#2B8FB3',
          water: '#3B8DBD',
          road: '#B9A98A'
        }
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Devanagari"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif']
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(30,36,25,.05), 0 8px 24px rgba(30,36,25,.07)',
        float: '0 8px 32px rgba(15,31,23,.18)'
      },
      backgroundImage: {
        backdrop: 'linear-gradient(135deg, #DCE8D5 0%, #EEF0DA 55%, #F3E6BF 100%)',
        'hero-gradient': 'linear-gradient(120deg, #E3EFD8 0%, #F4EDCB 55%, #D9EBF2 100%)'
      }
    }
  },
  plugins: []
};
