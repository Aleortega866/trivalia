import { useRef, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import type { StatsResult, TriviaConfig } from '../config/schema';
import { formatDateTime } from '../lib/redeemApi';
import { downloadCsv, fetchStats, statsToCsv } from '../lib/statsApi';

type View =
  | { name: 'login'; error?: string }
  | { name: 'loading' }
  | { name: 'ready'; stats: StatsResult; error?: string };

const MIN_PIN_LENGTH = 4;

/** Panel del negocio: cuántos jugaron, ganaron y canjearon, y la lista de contactos. El PIN solo vive en memoria. */
export function StatsPage({ config }: { config: TriviaConfig }) {
  const [view, setView] = useState<View>({ name: 'login' });
  const pinRef = useRef('');
  const themeVars = { '--brand': config.brand.color, '--accent': config.brand.accent } as CSSProperties;

  async function load() {
    const previous = view.name === 'ready' ? view.stats : null;
    setView({ name: 'loading' });
    const result = await fetchStats(config.slug, pinRef.current);
    if (result.kind === 'bad-pin') {
      pinRef.current = '';
      setView({ name: 'login', error: 'PIN incorrecto. Es el mismo que usas para canjear cupones.' });
      return;
    }
    if (result.kind === 'error') {
      setView(previous ? { name: 'ready', stats: previous, error: result.message } : { name: 'login', error: result.message });
      return;
    }
    setView({ name: 'ready', stats: result.stats });
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pin = String(new FormData(event.currentTarget).get('pin') ?? '').trim();
    if (pin.length < MIN_PIN_LENGTH) {
      setView({ name: 'login', error: `El PIN tiene al menos ${MIN_PIN_LENGTH} dígitos.` });
      return;
    }
    pinRef.current = pin;
    void load();
  }

  function handleDownload(stats: StatsResult) {
    const date = new Date().toISOString().slice(0, 10);
    downloadCsv(statsToCsv(stats, formatDateTime), `contactos-${config.slug}-${date}.csv`);
  }

  return (
    <div className={view.name === 'ready' ? 'page page--scroll' : 'page'} style={themeVars}>
      <main className={view.name === 'ready' ? 'stats-page' : 'main--center redeem-page'}>
        <header className="brand brand--compact">
          <span className="brand__emoji" aria-hidden="true">
            {config.brand.emoji}
          </span>
          <div>
            <p className="brand__name">{config.brand.name}</p>
          </div>
        </header>

        {(view.name === 'login' || view.name === 'loading') && (
          <section className="card card--center">
            <p className="eyebrow">Panel de resultados</p>
            <h1 className="question-text">¿Cómo va tu trivia?</h1>
            <form className="form redeem-form" onSubmit={handleLogin} noValidate>
              <label htmlFor="pin">PIN del negocio</label>
              <input
                id="pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••"
                aria-describedby={view.name === 'login' && view.error ? 'login-error' : undefined}
                autoFocus
              />
              {view.name === 'login' && view.error && (
                <p id="login-error" role="alert" className="error">
                  {view.error}
                </p>
              )}
              <button type="submit" className="cta" disabled={view.name === 'loading'}>
                {view.name === 'loading' ? 'Cargando…' : 'Ver resultados'}
              </button>
            </form>
          </section>
        )}

        {view.name === 'ready' && (
          <StatsDashboard
            stats={view.stats}
            error={view.error}
            onRefresh={() => void load()}
            onDownload={() => handleDownload(view.stats)}
          />
        )}
      </main>
    </div>
  );
}

type DashboardProps = {
  stats: StatsResult;
  error?: string;
  onRefresh: () => void;
  onDownload: () => void;
};

function percent(part: number, total: number): string {
  return total === 0 ? '0%' : `${Math.round((part / total) * 100)}%`;
}

function StatsDashboard({ stats, error, onRefresh, onDownload }: DashboardProps) {
  const isEmpty = stats.participants === 0;

  return (
    <>
      <section className="stats-tiles" aria-label="Resumen">
        <div className="stat-tile">
          <p className="stat-tile__value">{stats.participants}</p>
          <p className="stat-tile__label">Jugaron</p>
          <p className="stat-tile__hint">contactos nuevos</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile__value">{stats.winners}</p>
          <p className="stat-tile__label">Ganaron</p>
          <p className="stat-tile__hint">{percent(stats.winners, stats.participants)} de los que jugaron</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile__value">{stats.redeemed}</p>
          <p className="stat-tile__label">Canjearon</p>
          <p className="stat-tile__hint">{percent(stats.redeemed, stats.winners)} regresaron</p>
        </div>
      </section>

      {error && (
        <p role="alert" className="error stats-error">
          {error}
        </p>
      )}

      <section className="card stats-list">
        <div className="stats-list__head">
          <h1 className="question-text">Contactos</h1>
          <button type="button" className="link-button" onClick={onRefresh}>
            Actualizar
          </button>
        </div>

        {isEmpty ? (
          <p className="hint">
            Todavía nadie ha jugado. Comparte el enlace o pon el QR en el mostrador y aquí verás a cada persona.
          </p>
        ) : (
          <ul className="contacts">
            {stats.rows.map((row) => (
              <li key={`${row.whatsapp}-${row.playedAt}`} className="contact">
                <div className="contact__main">
                  <p className="contact__name">{row.name}</p>
                  <a className="contact__phone" href={`https://wa.me/52${row.whatsapp}`} target="_blank" rel="noreferrer">
                    {row.whatsapp.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')}
                  </a>
                </div>
                <div className="contact__meta">
                  <p>
                    {row.correctCount}/{stats.totalQuestions} aciertos · {formatDateTime(row.playedAt)}
                  </p>
                  <p className="contact__status" data-status={row.redeemedAt ? 'redeemed' : row.couponCode ? 'won' : 'none'}>
                    {row.redeemedAt ? `Canjeó ${row.couponCode}` : row.couponCode ? `Ganó ${row.couponCode}` : 'Sin premio'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button type="button" className="cta" onClick={onDownload} disabled={isEmpty}>
          Descargar contactos (Excel)
        </button>
      </section>
    </>
  );
}
