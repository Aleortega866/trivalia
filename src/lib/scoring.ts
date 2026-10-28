import type { Question } from '../config/schema';

/** Respuesta del usuario; `null` significa que se acabó el tiempo. */
export type Answer = { questionId: string; selectedIndex: number | null; secondsUsed: number };

export function isCorrect(question: Question, selectedIndex: number | null): boolean {
  return selectedIndex === question.correctIndex;
}

export function countCorrect(questions: Question[], answers: Answer[]): number {
  return answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return question !== undefined && isCorrect(question, answer.selectedIndex);
  }).length;
}


export function totalSeconds(answers: Answer[]): number {
  return answers.reduce((sum, answer) => sum + answer.secondsUsed, 0);
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes > 0 ? `${minutes} min ${rest} s` : `${rest} s`;
}
