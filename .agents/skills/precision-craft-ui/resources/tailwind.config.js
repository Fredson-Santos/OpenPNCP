/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#08090a',
        carbon: '#0f1011',
        obsidian: '#161718',
        subtle: '#1c1d1f',
        'surface-hover': '#212326',
        
        hairline: 'rgba(255, 255, 255, 0.08)',
        graphite: '#23252a',
        smoke: '#383b3f',
        ash: '#8a8f98',
        fog: '#62666d',
        mist: '#d0d6e0',
        bone: '#e5e5e6',
        paper: '#ffffff',

        // Accents
        acid: {
          DEFAULT: '#e4f222',
          hover: '#d2df1d',
          fg: '#08090a',
        },
        pulse: '#27a644',
        coral: '#eb5757',
        teal: '#02b8cc',
        iris: '#6366f1',
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'tight-hero': '-0.06em',
        'tight-display': '-0.055em',
        'tight-heading': '-0.045em',
        'tight-sm': '-0.025em',
        'mono-wide': '0.071em',
      },
      borderRadius: {
        xs: '3px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
      },
      boxShadow: {
        hairline: '0 0 0 1px rgba(255, 255, 255, 0.08)',
        card: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 16px -2px rgba(0, 0, 0, 0.5)',
        modal: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 40px -8px rgba(0, 0, 0, 0.8)',
        'inset-top': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
};

