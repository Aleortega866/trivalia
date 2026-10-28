import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import QRCode from 'qrcode';
import type { TriviaConfig } from '../config/schema';

/**
 * Cartel para imprimir (10 × 15 cm) con el QR de la trivia del negocio.
 * Se abre en /cartel/<slug>; "Imprimir" usa el diálogo del navegador (también sirve para guardar como PDF).
 */
export function PosterPage({ config }: { config: TriviaConfig }) {
  const triviaUrl = `${window.location.origin}/t/${config.slug}`;
  const [qrSvg, setQrSvg] = useState<string | null>(null);

  useEffect(() => {
    // SVG: se imprime nítido a cualquier tamaño. Margen 0: el blanco lo da la tarjeta.
    QRCode.toString(triviaUrl, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#0B1F19', light: '#FFFFFF' } })
      .then(setQrSvg)
      .catch((error: unknown) => console.error(new Error('No se pudo generar el QR', { cause: error })));
  }, [triviaUrl]);

  const themeVars = { '--brand': config.brand.color, '--accent': config.brand.accent } as CSSProperties;
  const { prize } = config;

  return (
    <div className="poster-page" style={themeVars}>
      <div className="poster-toolbar">
        <div>
          <p className="poster-toolbar__title">Cartel de {config.brand.name}</p>
          <p className="poster-toolbar__hint">Tamaño 10 × 15 cm. En “Imprimir”, elige tamaño real (100 %) o “Guardar como PDF”.</p>
        </div>
        <button type="button" className="cta poster-toolbar__btn" onClick={() => window.print()}>
          Imprimir
        </button>
      </div>

      <article className="poster" aria-label={`Cartel con QR de ${config.brand.name}`}>
        <header className="poster__brand">
          {config.brand.emoji && (
            <span className="poster__emoji" aria-hidden="true">
              {config.brand.emoji}
            </span>
          )}
          <span className="poster__name">{config.brand.name}</span>
        </header>

        <div className="poster__hero">
          <p className="poster__kicker">Juega 1 minuto y gana</p>
          <p className="poster__prize">{prize.description}</p>
        </div>

        <div className="poster__qr-wrap">
          {qrSvg ? (
            <div className="poster__qr" dangerouslySetInnerHTML={{ __html: qrSvg }} />
          ) : (
            <div className="poster__qr poster__qr--loading" aria-hidden="true" />
          )}
        </div>

        <ol className="poster__steps">
          <li>
            <b>1</b>Escanea con tu cámara
          </li>
          <li>
            <b>2</b>Contesta {config.questions.length} preguntas
          </li>
          <li>
            <b>3</b>Acierta {prize.minCorrect} y gana
          </li>
        </ol>

        <footer className="poster__footer">
          <span>Aplican condiciones · Ver bases en la trivia</span>
          <span className="poster__made">
            <img src="/brand/triviala-isotipo.svg" alt="" width="12" height="12" />
            Hecho con Triviala
          </span>
        </footer>
      </article>

      <p className="poster-url">
        Enlace de la trivia: <a href={triviaUrl}>{triviaUrl}</a>
      </p>
    </div>
  );
}
