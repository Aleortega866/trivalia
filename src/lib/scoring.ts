import type { Question, TriviaConfig } from '../config/schema';

/** Respuesta del usuario; `null` significa que se acabó el tiempo. */
export type Answer = { questionId: string; selectedIndex: number | null };

export function isCorrect(question: Question, selectedIndex: number | null): boolean {
  return selectedIndex === question.correctIndex;
}

export function countCorrect(questions: Question[], answers: Answer[]): number {
  return answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return question !== undefined && isCorrect(question, answer.selectedIndex);
  }).length;
}

export function hasWonPrize(config: TriviaConfig, correctCount: number): boolean {
  return correctCount >= config.prize.minCorrect;
}

/** Código corto y legible para canjear en caja (sin 0/O ni 1/I para evitar confusiones). */
export function createPrizeCode(random: () => number = Math.random): string {
  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const CODE_LENGTH = 6;
  return Array.from({ length: CODE_LENGTH }, () => ALPHABET[Math.floor(random() * ALPHABET.length)]).join('');
}
