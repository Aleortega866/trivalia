import { useEffect, useEffectEvent, useState } from 'react';
import type { Question } from '../config/schema';

const TICK_MS = 1000;
const FEEDBACK_MS = 1600;

type Props = {
  question: Question;
  number: number;
  total: number;
  secondsPerQuestion: number;
  onAnswer: (selectedIndex: number | null) => void;
};

export function QuestionCard({ question, number, total, secondsPerQuestion, onAnswer }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(secondsPerQuestion);
  const [selected, setSelected] = useState<number | null | undefined>(undefined);
  const hasAnswered = selected !== undefined;

  const finish = useEffectEvent((choice: number | null) => onAnswer(choice));

  useEffect(() => {
    if (hasAnswered) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(s - 1, 0)), TICK_MS);
    return () => clearInterval(id);
  }, [hasAnswered]);

  useEffect(() => {
    if (secondsLeft === 0 && !hasAnswered) setSelected(null);
  }, [secondsLeft, hasAnswered]);

  useEffect(() => {
    if (!hasAnswered) return;
    const id = setTimeout(() => finish(selected), FEEDBACK_MS);
    return () => clearTimeout(id);
  }, [hasAnswered, selected]);

  function optionState(index: number): 'idle' | 'correct' | 'wrong' {
    if (!hasAnswered) return 'idle';
    if (index === question.correctIndex) return 'correct';
    return index === selected ? 'wrong' : 'idle';
  }

  const progress = secondsLeft / secondsPerQuestion;

  return (
    <section className="card" aria-labelledby={`q-${question.id}`}>
      <div className="question-meta">
        <span>
          Pregunta {number} de {total}
        </span>
        <span aria-live="polite" className="timer">
          {hasAnswered ? '' : `${secondsLeft}s`}
        </span>
      </div>
      <div className="timer-bar" aria-hidden="true">
        <div className="timer-bar__fill" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <h2 id={`q-${question.id}`} className="question-text">
        {question.text}
      </h2>

      <ul className="options">
        {question.options.map((option, index) => (
          <li key={option}>
            <button
              type="button"
              className="option"
              data-state={optionState(index)}
              disabled={hasAnswered}
              onClick={() => setSelected(index)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      <p className="feedback" aria-live="polite">
        {hasAnswered && (selected === question.correctIndex ? '¡Correcto! ' : selected === null ? 'Se acabó el tiempo. ' : 'Casi. ')}
        {hasAnswered && question.funFact}
      </p>
    </section>
  );
}
