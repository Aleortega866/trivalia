import { describe, expect, it } from 'vitest';
import { participantSchema, triviaConfigSchema } from '../config/schema';
import { cafeDemo } from '../config/demos/cafe';
import { countCorrect, formatDuration } from './scoring';
import { buildCoupon, computeExpiry, createPrizeCode, hasWonPrize } from './prize';
import { parseRoute } from './route';

const config = triviaConfigSchema.parse(cafeDemo);

describe('countCorrect', () => {
  it('cuenta solo las respuestas correctas e ignora las de tiempo agotado', () => {
    const answers = [
      { questionId: 'q1', selectedIndex: 0, secondsUsed: 5 },
      { questionId: 'q2', selectedIndex: 0, secondsUsed: 5 },
      { questionId: 'q3', selectedIndex: null, secondsUsed: 20 },
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

describe('formatDuration', () => {
  it('muestra minutos y segundos cuando pasa de un minuto', () => {
    expect(formatDuration(80)).toBe('1 min 20 s');
  });

  it('muestra solo segundos cuando es menos de un minuto', () => {
    expect(formatDuration(45)).toBe('45 s');
  });
});

describe('participantSchema', () => {
  it('da mensajes en español cuando el nombre está vacío', () => {
    const result = participantSchema.safeParse({
      triviaSlug: 'demo-cafe',
      name: '',
      whatsapp: '5512345678',
      consent: true,
      correctCount: 3,
      totalQuestions: 5,
    });

    expect(result.error?.issues[0]?.message).toBe('Escribe tu nombre (mínimo 2 letras)');
  });
});

describe('computeExpiry', () => {
  it('vence al final del día 30 en hora de México', () => {
    const wonAt = new Date('2026-10-28T06:00:00Z'); // 00:00 del 28 de oct en CDMX

    expect(computeExpiry(wonAt, 30).toISOString()).toBe('2026-11-28T05:59:59.000Z'); // 23:59:59 del 27 de nov
  });
});

describe('buildCoupon', () => {
  it('no crea cupón si no alcanza el mínimo de aciertos', () => {
    expect(buildCoupon(config, config.prize.minCorrect - 1)).toBeNull();
  });

  it('crea código y vencimiento cuando gana', () => {
    const coupon = buildCoupon(config, config.prize.minCorrect, { now: new Date('2026-10-28T18:00:00Z') });

    expect(coupon?.code).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
    expect(coupon?.expiresAt).toBe('2026-11-28T05:59:59.000Z');
  });
});

describe('parseRoute', () => {
  it('la raíz abre la demo por defecto', () => {
    expect(parseRoute('/')).toEqual({ view: 'trivia', slug: 'demo-cafe' });
  });

  it('reconoce trivia y canje por slug', () => {
    expect(parseRoute('/t/demo-gym')).toEqual({ view: 'trivia', slug: 'demo-gym' });
    expect(parseRoute('/canje/demo-cafe/')).toEqual({ view: 'redeem', slug: 'demo-cafe' });
  });

  it('cualquier otra ruta es no encontrada', () => {
    expect(parseRoute('/admin')).toEqual({ view: 'not-found' });
  });
});
