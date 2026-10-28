import { timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import { couponSchema } from '../src/config/schema.js';
import type { RedeemResult } from '../src/config/schema.js';
import { getTrivia } from '../src/config/trivias.js';

/*
 * Lógica de canje compartida por api/redeem.ts (Vercel + Redis) y dev/ (archivos JSON).
 * Solo corre en el servidor: usa node:crypto y lee el PIN de variables de entorno.
 */

export const redeemRequestSchema = z.object({
  triviaSlug: z.string().regex(/^[a-z0-9-]+$/),
  pin: z.string().min(4).max(32),
  code: z
    .string()
    .transform((v) => v.toUpperCase().replace(/[^A-Z0-9]/g, ''))
    .pipe(couponSchema.shape.code),
  action: z.enum(['check', 'redeem']),
});

export type RedeemRequest = z.infer<typeof redeemRequestSchema>;

/** Cupón tal como se guarda en el servidor al ganar. */
export const storedCouponRecordSchema = couponSchema.extend({
  triviaSlug: z.string(),
  whatsapp: z.string(),
});

export type StoredCouponRecord = z.infer<typeof storedCouponRecordSchema>;

/** Almacenamiento mínimo que necesita el canje; Redis y JSON lo implementan. */
export type RedeemStore = {
  getCoupon(code: string): Promise<StoredCouponRecord | null>;
  getRedeemedAt(code: string): Promise<string | null>;
  /** Marca el canje solo si nadie lo hizo antes; regresa false si otro se adelantó. */
  markRedeemedIfAbsent(code: string, redeemedAt: string): Promise<boolean>;
};

/** "5512345678" → "55 •••• 5678": suficiente para confirmar con el cliente, sin exponer el número. */
export function maskWhatsapp(whatsapp: string): string {
  return `${whatsapp.slice(0, 2)} •••• ${whatsapp.slice(-4)}`;
}

/** REDEEM_PIN_DEMO_CAFE para la trivia "demo-cafe". */
export function redeemPinEnvName(slug: string): string {
  return `REDEEM_PIN_${slug.toUpperCase().replace(/-/g, '_')}`;
}

/** Comparación en tiempo constante para no filtrar el PIN por tiempos de respuesta. */
export function isPinValid(expected: string | undefined, given: string): boolean {
  if (!expected) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function processRedeem(
  { triviaSlug, code, action }: Pick<RedeemRequest, 'triviaSlug' | 'code' | 'action'>,
  store: RedeemStore,
  now: Date = new Date(),
): Promise<RedeemResult> {
  const trivia = getTrivia(triviaSlug);
  const coupon = await store.getCoupon(code);
  // Un código de otra trivia se trata como inexistente: cada negocio solo ve los suyos.
  if (!trivia || !coupon || coupon.triviaSlug !== triviaSlug) return { status: 'not-found' };

  const redeemedAt = await store.getRedeemedAt(code);
  if (redeemedAt) return { status: 'already-redeemed', redeemedAt };
  if (new Date(coupon.expiresAt).getTime() < now.getTime()) return { status: 'expired', expiresAt: coupon.expiresAt };

  const prize = trivia.prize.description;
  if (action === 'check') {
    return { status: 'valid', prize, expiresAt: coupon.expiresAt, whatsappHint: maskWhatsapp(coupon.whatsapp) };
  }

  const at = now.toISOString();
  const marked = await store.markRedeemedIfAbsent(code, at);
  if (!marked) {
    return { status: 'already-redeemed', redeemedAt: (await store.getRedeemedAt(code)) ?? at };
  }
  return { status: 'redeemed', prize, redeemedAt: at };
}
