import type { TriviaConfig } from '../config/schema';

type Props = {
  config: TriviaConfig;
  correctCount: number;
  prizeCode: string | null;
  onRestart: () => void;
};

export function ResultCard({ config, correctCount, prizeCode, onRestart }: Props) {
  const total = config.questions.length;
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
    <section className="card result">
      <p className="score" aria-label={`${correctCount} de ${total} correctas`}>
        {correctCount}/{total}
      </p>

      {prizeCode ? (
        <>
          <h2 className="question-text">¡Ganaste {config.prize.description.toLowerCase()}!</h2>
          <p className="prize-code" aria-label={`Código de premio ${prizeCode.split('').join(' ')}`}>
            {prizeCode}
          </p>
          <p>{config.prize.redeemInstructions}</p>
        </>
      ) : (
        <>
          <h2 className="question-text">¡Muy cerca!</h2>
          <p>
            Necesitabas {config.prize.minCorrect} aciertos para ganar. Ven a {config.brand.name} y pregunta por la
            siguiente trivia.
          </p>
        </>
      )}

      <div className="actions">
        <button type="button" className="cta" onClick={handleShare}>
          Retar a un amigo
        </button>
        {!prizeCode && (
          <button type="button" className="link-button" onClick={onRestart}>
            Volver a intentar
          </button>
        )}
      </div>
    </section>
  );
}
