import type { Coupon, TriviaConfig } from '../config/schema.js';

const MS_PER_DAY = 86_400_000;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 6;

/** Código corto y legible para canjear en caja (sin 0/O ni 1/I para evitar confusiones). */
export function createPrizeCode(random: () => number = Math.random): string {
  return Array.from({ length: CODE_LENGTH }, () => CODE_ALPHABET[Math.floor(random() * CODE_ALPHABET.length)]).join('');
}

export function hasWonPrize(config: TriviaConfig, correctCount: number): boolean {
  return correctCount >= config.prize.minCorrect;
}

/** Vence al final del día (hora de México) en que se cumplen los días de vigencia. */
export function computeExpiry(now: Date, validDays: number): Date {
  const target = new Date(now.getTime() + validDays * MS_PER_DAY);
  const [year, month, day] = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' })
    .format(target)
    .split('-')
    .map(Number);
  // 23:59:59 en CDMX (UTC-6, sin horario de verano desde 2022) = 05:59:59 UTC del día siguiente.
  return new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, (day ?? 1) + 1, 5, 59, 59));
}

/** Decide en el servidor si hay premio y crea el cupón. */
export function buildCoupon(
  config: TriviaConfig,
  correctCount: number,
  { now = new Date(), random = Math.random }: { now?: Date; random?: () => number } = {},
): Coupon | null {
  if (!hasWonPrize(config, correctCount)) return null;
  return { code: createPrizeCode(random), expiresAt: computeExpiry(now, config.prize.validDays).toISOString() };
}

export function isExpired(coupon: Coupon, now: Date = new Date()): boolean {
  return new Date(coupon.expiresAt).getTime() < now.getTime();
}
