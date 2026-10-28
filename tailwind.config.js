/** Tailwind solo para la página de ventas: el juego y los paneles usan src/styles.css. */
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./src/components/LandingPage.tsx'],
  // Todas las utilidades quedan dentro de .landing-tw: no tocan el resto de la app.
  important: '.landing-tw',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        brand: {
          crema: '#FAF7F2',
          cremaDark: '#F2ECE4',
          forest: '#13392E',
          forestHover: '#0E2A22',
          emerald: '#1F5E4B',
          mint: '#3EB489',
          lightMint: '#EAF7F2',
          accent: '#E07A5F',
        },
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [forms({ strategy: 'class' }), containerQueries],
};
