import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Coupon, TriviaConfig } from './config/schema';
import { countCorrect, totalSeconds } from './lib/scoring';
import type { Answer } from './lib/scoring';
import { formatExpiry, loadCouponLocally, saveCouponLocally } from './lib/coupon';
import type { StoredCoupon } from './lib/coupon';
import { CouponCard } from './components/CouponCard';
import { QuestionCard } from './components/QuestionCard';
import { LeadForm } from './components/LeadForm';
import { ResultCard } from './components/ResultCard';

type Stage =
  | { name: 'intro' }
  | { name: 'question'; index: number }
  | { name: 'lead' }
  | { name: 'result'; coupon: Coupon | null; soldOut: boolean }
  | { name: 'saved-coupon'; coupon: StoredCoupon; notice?: string };

/** El juego completo para una trivia: intro → preguntas → datos → resultado. */
export function TriviaApp({ config }: { config: TriviaConfig }) {
  const conditionsDialogRef = useRef<HTMLDialogElement>(null);
  const [stage, setStage] = useState<Stage>({ name: 'intro' });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [savedCoupon, setSavedCoupon] = useState(() => loadCouponLocally(config.slug));

  const total = config.questions.length;
  const correctCount = countCorrect(config.questions, answers);
  const currentQuestion = stage.name === 'question' ? config.questions[stage.index] : undefined;

  function handleAnswer(questionId: string, selectedIndex: number | null, secondsUsed: number, index: number) {
    setAnswers((prev) => [...prev, { questionId, selectedIndex, secondsUsed }]);
    const isLast = index === total - 1;
    setStage(isLast ? { name: 'lead' } : { name: 'question', index: index + 1 });
  }

  function handleSubmitted(coupon: Coupon | null, soldOut: boolean) {
    if (coupon) {
      saveCouponLocally(config.slug, coupon, config.prize.description);
      setSavedCoupon({ ...coupon, prize: config.prize.description });
    }
    setStage({ name: 'result', coupon, soldOut });
  }

  function handleAlreadyWon(coupon: Coupon) {
    const stored = { ...coupon, prize: config.prize.description };
    saveCouponLocally(config.slug, coupon, config.prize.description);
    setSavedCoupon(stored);
    setStage({ name: 'saved-coupon', coupon: stored, notice: 'Ya habías participado con este WhatsApp. Este es tu cupón.' });
  }

  function handleRestart() {
    setAnswers([]);
    setStage({ name: 'intro' });
  }

  const themeVars = { '--brand': config.brand.color, '--accent': config.brand.accent } as CSSProperties;
  const isQuestion = stage.name === 'question';

  return (
    <div className="page" style={themeVars}>
      <header className={stage.name === 'lead' ? 'brand brand--compact' : 'brand'} hidden={isQuestion || stage.name === 'result'}>
        <span className="brand__emoji" aria-hidden="true">
          {config.brand.emoji}
        </span>
        <div>
          <p className="brand__name">{config.brand.name}</p>
          <p className="brand__tagline">{config.brand.tagline}</p>
        </div>
      </header>

      <main>
        {stage.name === 'intro' && (
          <section className="card card--intro">
            <p className="eyebrow">{config.prize.description}</p>
            <h1 className="title">{config.title}</h1>
            <p>{config.intro}</p>
            <p className="hint">
              {total} preguntas · {config.secondsPerQuestion} segundos cada una
            </p>
            {config.prize.conditions.length > 0 && (
              <button type="button" className="conditions-link" onClick={() => conditionsDialogRef.current?.showModal()}>
                Aplican condiciones
              </button>
            )}
            <button type="button" className="cta" onClick={() => setStage({ name: 'question', index: 0 })}>
              Empezar <span className="cta__arrow" aria-hidden="true">→</span>
            </button>
          </section>
        )}
        {stage.name === 'intro' && config.prize.conditions.length > 0 && (
          <dialog ref={conditionsDialogRef} className="privacy-dialog" aria-labelledby="conditions-title">
            <h2 id="conditions-title">Condiciones del premio</h2>
            <ul className="conditions-list">
              {config.prize.conditions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <form method="dialog">
              <button type="submit" className="cta">
                Entendido
              </button>
            </form>
          </dialog>
        )}
        {stage.name === 'intro' && savedCoupon && (
          <button type="button" className="saved-banner saved-banner--below" onClick={() => setStage({ name: 'saved-coupon', coupon: savedCoupon })}>
            <span aria-hidden="true">🎁</span>
            <span>
              <strong>Ya tienes un cupón</strong>
              <span className="saved-banner__sub">Vence el {formatExpiry(savedCoupon.expiresAt)}</span>
            </span>
            <span className="saved-banner__cta">Ver</span>
          </button>
        )}

        {stage.name === 'question' && currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            number={stage.index + 1}
            total={total}
            secondsPerQuestion={config.secondsPerQuestion}
            brandName={config.brand.name}
            onAnswer={(selected, secondsUsed) => handleAnswer(currentQuestion.id, selected, secondsUsed, stage.index)}
          />
        )}

        {stage.name === 'lead' && (
          <LeadForm
            triviaSlug={config.slug}
            correctCount={correctCount}
            totalQuestions={total}
            privacyNoticeUrl={config.privacyNoticeUrl}
            brandName={config.brand.name}
            onSubmitted={handleSubmitted}
            onAlreadyWon={handleAlreadyWon}
          />
        )}

        {stage.name === 'result' && (
          <ResultCard
            config={config}
            correctCount={correctCount}
            secondsUsed={totalSeconds(answers)}
            coupon={stage.coupon}
            soldOut={stage.soldOut}
            onRestart={handleRestart}
          />
        )}
        {stage.name === 'saved-coupon' && (
          <section className="card card--center">
            <p className="eyebrow">Tu cupón</p>
            {stage.notice && <p className="notice-line">{stage.notice}</p>}
            <CouponCard config={config} coupon={stage.coupon} />
            <button type="button" className="link-button" onClick={handleRestart}>
              Volver al inicio
            </button>
          </section>
        )}
      </main>

      {stage.name === 'intro' && (
        <footer className="footer">
          <p>
            Hecho con <strong>Triviala</strong>
          </p>
        </footer>
      )}
    </div>
  );
}
