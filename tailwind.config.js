/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EF', // fundo base
        paper: '#FBF8F1', // cards/molduras
        sand: '#EAE2D3', // fundos de imagem
        ink: '#2B2619', // texto principal
        muted: '#6B6250', // texto secundário
        label: '#8A8171', // labels uppercase
        forest: '#1E3A2F', // verde autoridade
        'forest-deep': '#152A21', // rodapé
        'forest-panel': '#1C362B', // painéis escuros
        bronze: '#B8925A', // dourado/bronze
        'bronze-lit': '#C9A46B', // bronze sobre fundo escuro
        brick: '#C0392B', // vermelho-helicônia
        body: '#5A5346', // corpo de texto sobre cream
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'Source Sans 3'", "'Segoe UI'", 'sans-serif'],
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(.22,.61,.36,1)',
      },
    },
  },
  plugins: [],
}
