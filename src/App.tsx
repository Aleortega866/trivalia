import { useState } from 'react';
import type { CSSProperties } from 'react';
import { triviaConfigSchema } from './config/schema';
import { cafeDemo } from './config/demos/cafe';
import { countCorrect, createPrizeCode, hasWonPrize } from './lib/scoring';
import type { Answer } from './lib/scoring';
import { QuestionCard } from './components/QuestionCard';
import { LeadForm } from './components/LeadForm';
import { ResultCard } from './components/ResultCard';

// Por ahora una sola demo; en la semana 2 la config vendrá del slug en la URL.
const config = triviaConfigSchema.parse(cafeDemo);

type Stage =
  | { name: 'intro' }
  | { name: 'question'; index: number }
  | { name: 'lead' }
  | { name: 'result'; prizeCode: string | null };

export function App() {
  const [stage, setStage] = useState<Stage>({ name: 'intro' });
  const [answers, setAnswers] = useState<Answer[]>([]);

  const total = config.questions.length;
  const correctCount = countCorrect(config.questions, answers);
  const currentQuestion = stage.name === 'question' ? config.questions[stage.index] : undefined;

  function handleAnswer(questionId: string, selectedIndex: number | null, index: number) {
    setAnswers((prev) => [...prev, { questionId, selectedIndex }]);
    const isLast = index === total - 1;
    setStage(isLast ? { name: 'lead' } : { name: 'question', index: index + 1 });
  }

  function handleSubmitted() {
    const prizeCode = hasWonPrize(config, correctCount) ? createPrizeCode() : null;
    setStage({ name: 'result', prizeCode });
  }

  function handleRestart() {
    setAnswers([]);
    setStage({ name: 'intro' });
  }

  const themeVars = {
    '--brand-primary': config.brand.colorPrimary,
    '--brand-accent': config.brand.colorAccent,
  } as CSSProperties;

  return (
    <div className="page" style={themeVars}>
      <header className="brand">
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
          <section className="card">
            <h1 className="title">{config.title}</h1>
            <p>{config.intro}</p>
            <p className="hint">
              {total} preguntas · {config.secondsPerQuestion} segundos cada una
            </p>
            <button type="button" className="cta" onClick={() => setStage({ name: 'question', index: 0 })}>
              Empezar
            </button>
          </section>
        )}

        {stage.name === 'question' && currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            number={stage.index + 1}
            total={total}
            secondsPerQuestion={config.secondsPerQuestion}
            onAnswer={(selected) => handleAnswer(currentQuestion.id, selected, stage.index)}
          />
        )}

        {stage.name === 'lead' && (
          <LeadForm
            triviaSlug={config.slug}
            correctCount={correctCount}
            totalQuestions={total}
            privacyNoticeUrl={config.privacyNoticeUrl}
            onSubmitted={handleSubmitted}
          />
        )}

        {stage.name === 'result' && (
          <ResultCard config={config} correctCount={correctCount} prizeCode={stage.prizeCode} onRestart={handleRestart} />
        )}
      </main>

      <footer className="footer">
        <p id="aviso-privacidad">
          {config.brand.name} usará tu nombre y WhatsApp solo para enviarte promociones. Puedes pedir que te borremos
          en cualquier momento.
        </p>
        <p>
          Hecho con <strong>Triviala</strong>
        </p>
      </footer>
    </div>
  );
}
