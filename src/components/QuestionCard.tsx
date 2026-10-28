import { useEffect, useState } from 'react';
import type { Question } from '../config/schema';

const TICK_MS = 1000;
const LETTERS = ['A', 'B', 'C', 'D'] as const;

type OptionState = 'idle' | 'correct' | 'wrong';

type Props = {
  question: Question;
  number: number;
  total: number;
  secondsPerQuestion: number;
  brandName: string;
  onAnswer: (selectedIndex: number | null, secondsUsed: number) => void;
};

function formatClock(seconds: number): string {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function QuestionCard({ question, number, total, secondsPerQuestion, brandName, onAnswer }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(secondsPerQuestion);
  const [selected, setSelected] = useState<number | null | undefined>(undefined);
  const hasAnswered = selected !== undefined;
  const isRight = selected === question.correctIndex;
  const isLast = number === total;
  const remaining = total - number;

  useEffect(() => {
    if (hasAnswered) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(s - 1, 0)), TICK_MS);
    return () => clearInterval(id);
  }, [hasAnswered]);

  useEffect(() => {
    if (secondsLeft === 0 && !hasAnswered) setSelected(null);
  }, [secondsLeft, hasAnswered]);

  function optionState(index: number): OptionState {
    if (!hasAnswered) return 'idle';
    if (index === question.correctIndex) return 'correct';
    return index === selected ? 'wrong' : 'idle';
  }

  function feedbackTitle(): string {
    if (isRight) return '¡Correcto!';
    return selected === null ? 'Se acabó el tiempo' : 'Casi';
  }

  function handleNext() {
    if (selected === undefined) return;
    onAnswer(selected, secondsPerQuestion - secondsLeft);
  }

  return (
    <section className="quiz" aria-labelledby={`q-${question.id}`}>
      <div className="quiz__top">
        <p className="quiz__bar">{brandName}</p>

        <div className="quiz__meta">
          <p className="quiz__count">Pregunta {String(number).padStart(2, '0')}</p>
          <p className="timer-pill" data-urgent={secondsLeft <= 5 && !hasAnswered}>
            <span className="visually-hidden">Tiempo restante </span>
            <span className="timer-pill__time">{formatClock(secondsLeft)}</span>
            <span aria-hidden="true">⏳</span>
          </p>
        </div>

        <h2 id={`q-${question.id}`} className="quiz__question">
          {question.text}
        </h2>
      </div>

      <div className="quiz__sheet">
        <ul className="answers">
          {question.options.map((option, index) => {
            const state = optionState(index);
            return (
              <li key={option}>
                <button
                  type="button"
                  className="answer"
                  data-state={state}
                  disabled={hasAnswered}
                  onClick={() => setSelected(index)}
                >
                  <span className="answer__letter">{LETTERS[index]}.</span>
                  <span className="answer__text">{option}</span>
                  {state === 'correct' && (
                    <span className="answer__mark" aria-label="respuesta correcta">
                      ✓
                    </span>
                  )}
                  {state === 'wrong' && (
                    <span className="answer__mark answer__mark--wrong" aria-label="tu respuesta, incorrecta">
                      ✕
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="segments-block">
          <p className="segments-label">
            <strong>{number}</strong> de {total}
          </p>
          <div
            className="segments"
            role="progressbar"
            aria-label="Avance de la trivia"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={number}
          >
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className="segments__item" data-done={i < number} />
            ))}
          </div>
          <p className="segments-hint">
            {remaining === 0 ? 'Última pregunta' : `${remaining} ${remaining === 1 ? 'pregunta restante' : 'preguntas restantes'}`}
          </p>
        </div>

        <div className="feedback-slot" aria-live="polite">
          {hasAnswered && (
            <p className="feedback" data-tone={isRight ? 'right' : 'wrong'}>
              <strong>{feedbackTitle()}</strong> {question.funFact}
            </p>
          )}
        </div>

        <button type="button" className="cta" disabled={!hasAnswered} onClick={handleNext}>
          {isLast ? 'Terminar' : 'Siguiente pregunta'}
        </button>
      </div>
    </section>
  );
}
