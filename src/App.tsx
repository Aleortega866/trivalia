import type { CSSProperties } from 'react';
import { getTrivia } from './config/trivias';
import { parseRoute } from './lib/route';
import { TriviaApp } from './TriviaApp';
import { RedeemPage } from './components/RedeemPage';

// La ruta se lee una vez: cambiar de trivia es navegar a otra URL (recarga completa).
const route = parseRoute(window.location.pathname);

export function App() {
  const config = route.view === 'not-found' ? undefined : getTrivia(route.slug);
  if (!config) return <NotFound />;

  // key: si en el futuro se navega sin recargar, el estado de una trivia no se mezcla con otra.
  if (route.view === 'redeem') return <RedeemPage key={config.slug} config={config} />;
  return <TriviaApp key={config.slug} config={config} />;
}

function NotFound() {
  return (
    <div className="page" style={{ '--brand': '#1f4f4a', '--accent': '#d9826b' } as CSSProperties}>
      <main className="main--center">
        <section className="card card--center">
          <p className="eyebrow">Error 404</p>
          <h1 className="title">Trivia no encontrada</h1>
          <p>Revisa que el enlace esté completo o pide uno nuevo al negocio.</p>
        </section>
      </main>
    </div>
  );
}
