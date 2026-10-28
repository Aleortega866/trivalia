import { describe, expect, it } from 'vitest';
import { triviaConfigSchema } from '../config/schema';
import { cafeDemo } from '../config/demos/cafe';
import { countCorrect, createPrizeCode, hasWonPrize } from './scoring';

const config = triviaConfigSchema.parse(cafeDemo);

describe('countCorrect', () => {
  it('cuenta solo las respuestas correctas e ignora las de tiempo agotado', () => {
    const answers = [
      { questionId: 'q1', selectedIndex: 0 },
      { questionId: 'q2', selectedIndex: 0 },
      { questionId: 'q3', selectedIndex: null },
    ];

    expect(countCorrect(config.questions, answers)).toBe(1);
  });
});

describe('hasWonPrize', () => {
  it('gana cuando alcanza el mínimo de aciertos', () => {
    expect(hasWonPrize(config, config.prize.minCorrect)).toBe(true);
  });

  it('no gana con un acierto menos del mínimo', () => {
    expect(hasWonPrize(config, config.prize.minCorrect - 1)).toBe(false);
  });
});

describe('createPrizeCode', () => {
  it('genera 6 caracteres sin letras ni números ambiguos', () => {
    const code = createPrizeCode();

    expect(code).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
  });
});
