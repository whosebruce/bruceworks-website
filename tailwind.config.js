/** @type {import('tailwindcss').Config} */
// Colors and fonts come from the theme tokens in index.css (so the theme picker can re-skin everything):
// bg-ground, bg-ground-2, text-ink, text-ink-2, border-line, bg-signal, text-signal-text, text-alert … with alpha
// (bg-signal/10). The old names (primary, secondary, dark, lightgrey) stay until every page is on the new system.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./theme/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        condensed: ['var(--font-label)'],
        label: ['var(--font-label)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        ground: { DEFAULT: token('ground'), 2: token('ground-2'), 3: token('ground-3') },
        line: { DEFAULT: token('line'), 2: token('line-2') },
        ink: { DEFAULT: token('ink'), 2: token('ink-2'), 3: token('ink-3') },
        signal: { DEFAULT: token('signal'), ink: token('signal-ink'), text: token('signal-text') },
        alert: token('alert'),
        paper: { DEFAULT: token('paper'), ink: token('paper-ink') },
        primary: '#FEB019',
        secondary: '#1e3a8a',
        dark: '#58585A',
        lightgrey: '#f4f4f4',
      },
      borderRadius: {
        theme: 'var(--radius)',
        'theme-lg': 'var(--radius-lg)',
      },
      borderWidth: {
        theme: 'var(--border-w)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        marquee: 'marquee 40s linear infinite',
      }
    },
  },
  plugins: [],
}
