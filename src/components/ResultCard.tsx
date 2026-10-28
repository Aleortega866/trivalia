import type { Coupon, TriviaConfig } from '../config/schema';
import { CouponCard } from './CouponCard';
import { formatDuration } from '../lib/scoring';

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type Props = {
  config: TriviaConfig;
  correctCount: number;
  secondsUsed: number;
  coupon: Coupon | null;
  soldOut: boolean;
  onRestart: () => void;
};

export function ResultCard({ config, correctCount, secondsUsed, coupon, soldOut, onRestart }: Props) {
  const total = config.questions.length;
  const ratio = correctCount / total;
  const missing = Math.max(config.prize.minCorrect - correctCount, 0);
  const shareText = `Saqué ${correctCount}/${total} en "${config.title}" de ${config.brand.name}. ¿Me ganas?`;

  async function handleShare() {
    const shareData = { title: config.title, text: shareText, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${shareData.url}`);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error(new Error('No se pudo compartir', { cause: error }));
    }
  }

  return (
    <section className="result">
      <div className="result__top">
        <h2 className="result__title">{coupon ? '¡Ganaste!' : soldOut ? '¡Muy bien!' : '¡Buen intento!'}</h2>

        <div className="ring" role="img" aria-label={`${correctCount} de ${total} correctas`}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="ring__track" cx="60" cy="60" r={RING_RADIUS} />
            <circle
              className="ring__value"
              cx="60"
              cy="60"
              r={RING_RADIUS}
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - ratio)}
            />
          </svg>
          <p className="ring__label" aria-hidden="true">
            <span className="ring__score">{correctCount}</span> / {total}
          </p>
        </div>

        <p className="result__summary">
          {correctCount} de {total} correctas · {formatDuration(secondsUsed)}
        </p>
      </div>

      <div className="result__sheet">
        {coupon ? (
          <CouponCard config={config} coupon={coupon} />
        ) : soldOut ? (
          <div className="prize prize--miss">
            <p className="prize__label">Se acabaron los premios</p>
            <p className="hint">Llegaste a la meta, pero ya se entregaron todos los premios de esta promoción. ¡Gracias por jugar!</p>
          </div>
        ) : (
          <div className="prize prize--miss">
            <p className="prize__label">
              Te {missing === 1 ? 'faltó 1 acierto' : `faltaron ${missing} aciertos`}
            </p>
            <p className="hint">
              Para ganar {config.prize.description.toLowerCase()} necesitas {config.prize.minCorrect} de {total}.
              ¡Inténtalo otra vez!
            </p>
          </div>
        )}

        {!coupon && (
          <div className="result__actions">
            <button type="button" className="cta" onClick={onRestart}>
              Volver a intentar
            </button>
            <button type="button" className="link-button" onClick={handleShare}>
              Retar a un amigo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
