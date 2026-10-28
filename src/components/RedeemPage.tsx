import { useRef, useState } from 'react';
import type { CSSProperties, FormEvent, ReactNode } from 'react';
import type { RedeemResult, TriviaConfig } from '../config/schema';
import { formatExpiry } from '../lib/coupon';
import { callRedeem, formatDateTime } from '../lib/redeemApi';
import type { RedeemAction } from '../lib/redeemApi';

type View =
  | { name: 'login'; error?: string }
  | { name: 'scan'; error?: string }
  | { name: 'loading' }
  | { name: 'result'; code: string; result: RedeemResult };

const CODE_LENGTH = 6;

/** Pantalla del negocio para verificar y canjear cupones. El PIN solo vive en memoria. */
export function RedeemPage({ config }: { config: TriviaConfig }) {
  const [view, setView] = useState<View>({ name: 'login' });
  const pinRef = useRef('');
  const codeInputRef = useRef<HTMLInputElement>(null);

  const themeVars = { '--brand': config.brand.color, '--accent': config.brand.accent } as CSSProperties;

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pin = String(new FormData(event.currentTarget).get('pin') ?? '').trim();
    if (pin.length < 4) {
      setView({ name: 'login', error: 'El PIN tiene al menos 4 dígitos.' });
      return;
    }
    // El PIN se valida en el servidor con la primera consulta.
    pinRef.current = pin;
    setView({ name: 'scan' });
  }

  async function run(code: string, action: RedeemAction) {
    setView({ name: 'loading' });
    const response = await callRedeem({ triviaSlug: config.slug, pin: pinRef.current, code, action });
    if (response.kind === 'bad-pin') {
      pinRef.current = '';
      setView({ name: 'login', error: 'PIN incorrecto. Pídelo al encargado del negocio.' });
      return;
    }
    if (response.kind === 'error') {
      setView({ name: 'scan', error: response.message });
      return;
    }
    setView({ name: 'result', code, result: response.result });
  }

  function handleCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = String(new FormData(event.currentTarget).get('code') ?? '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    if (code.length !== CODE_LENGTH) {
      setView({ name: 'scan', error: `El código tiene ${CODE_LENGTH} letras o números.` });
      return;
    }
    void run(code, 'check');
  }

  function handleNext() {
    setView({ name: 'scan' });
    // Tras volver a la pantalla, deja el cursor listo para el siguiente código.
    requestAnimationFrame(() => codeInputRef.current?.focus());
  }

  return (
    <div className="page" style={themeVars}>
      <main className="main--center redeem-page">
        {/* El encabezado va dentro de main para centrarse junto con la tarjeta. */}
        <header className="brand brand--compact">
          <span className="brand__emoji" aria-hidden="true">
            {config.brand.emoji}
          </span>
          <div>
            <p className="brand__name">{config.brand.name}</p>
          </div>
        </header>

        {view.name === 'login' && (
          <section className="card card--center">
            <p className="eyebrow">Canje de cupones</p>
            <h1 className="question-text">Acceso del negocio</h1>
            <form className="form redeem-form" onSubmit={handleLogin} noValidate>
              <label htmlFor="pin">PIN de caja</label>
              <input
                id="pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••"
                aria-describedby={view.error ? 'login-error' : undefined}
                autoFocus
              />
              {view.error && (
                <p id="login-error" role="alert" className="error">
                  {view.error}
                </p>
              )}
              <button type="submit" className="cta">
                Entrar
              </button>
            </form>
          </section>
        )}

        {(view.name === 'scan' || view.name === 'loading') && (
          <section className="card card--center">
            <p className="eyebrow">Canje de cupones</p>
            <h1 className="question-text">Escribe el código del cliente</h1>
            <form className="form redeem-form" onSubmit={handleCheck} noValidate>
              <label htmlFor="code" className="visually-hidden">
                Código del cupón
              </label>
              <input
                ref={codeInputRef}
                id="code"
                name="code"
                className="code-input"
                maxLength={CODE_LENGTH}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="ABC234"
                aria-describedby={view.name === 'scan' && view.error ? 'scan-error' : undefined}
                autoFocus
              />
              {view.name === 'scan' && view.error && (
                <p id="scan-error" role="alert" className="error">
                  {view.error}
                </p>
              )}
              <button type="submit" className="cta" disabled={view.name === 'loading'}>
                {view.name === 'loading' ? 'Consultando…' : 'Verificar'}
              </button>
            </form>
          </section>
        )}

        {view.name === 'result' && (
          <RedeemResultCard
            code={view.code}
            result={view.result}
            onRedeem={() => void run(view.code, 'redeem')}
            onNext={handleNext}
          />
        )}
      </main>
    </div>
  );
}

type ResultProps = {
  code: string;
  result: RedeemResult;
  onRedeem: () => void;
  onNext: () => void;
};

function RedeemResultCard({ code, result, onRedeem, onNext }: ResultProps) {
  const codeLabel = (
    <p className="redeem__code" aria-label={`Código ${code.split('').join(' ')}`}>
      {code}
    </p>
  );

  switch (result.status) {
    case 'valid':
      return (
        <section className="card card--center redeem" data-tone="ok" aria-live="polite">
          <span className="redeem__icon" aria-hidden="true">✓</span>
          <h1 className="question-text">Cupón válido</h1>
          {codeLabel}
          <dl className="redeem__details">
            <div>
              <dt>Premio</dt>
              <dd>{result.prize}</dd>
            </div>
            <div>
              <dt>Vence</dt>
              <dd>{formatExpiry(result.expiresAt)}</dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>{result.whatsappHint}</dd>
            </div>
          </dl>
          <button type="button" className="cta" onClick={onRedeem}>
            Canjear ahora
          </button>
          <button type="button" className="link-button" onClick={onNext}>
            Cancelar
          </button>
        </section>
      );
    case 'redeemed':
      return (
        <section className="card card--center redeem" data-tone="ok" aria-live="polite">
          <span className="redeem__icon" aria-hidden="true">✓</span>
          <h1 className="question-text">¡Canjeado!</h1>
          {codeLabel}
          <p>
            Entrega: <strong>{result.prize}</strong>
          </p>
          <p className="hint">{formatDateTime(result.redeemedAt)}</p>
          <button type="button" className="cta" onClick={onNext}>
            Siguiente cupón
          </button>
        </section>
      );
    case 'already-redeemed':
      return (
        <RedeemProblem
          code={codeLabel}
          title="Este cupón ya se usó"
          detail={`Se canjeó el ${formatDateTime(result.redeemedAt)}`}
          onNext={onNext}
        />
      );
    case 'expired':
      return (
        <RedeemProblem
          code={codeLabel}
          title="Cupón vencido"
          detail={`Venció el ${formatExpiry(result.expiresAt)}.`}
          onNext={onNext}
        />
      );
    case 'not-found':
      return (
        <RedeemProblem
          code={codeLabel}
          title="Código no encontrado"
          detail="Revisa que esté bien escrito. Solo funcionan cupones de este negocio."
          onNext={onNext}
        />
      );
  }
}

function RedeemProblem({ code, title, detail, onNext }: { code: ReactNode; title: string; detail: string; onNext: () => void }) {
  return (
    <section className="card card--center redeem" data-tone="problem" aria-live="polite">
      <span className="redeem__icon" aria-hidden="true">!</span>
      <h1 className="question-text">{title}</h1>
      {code}
      <p>{detail}</p>
      <button type="button" className="cta" onClick={onNext}>
        Probar otro código
      </button>
    </section>
  );
}
