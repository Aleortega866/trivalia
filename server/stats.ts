import { z } from 'zod';
import type { StatsResult } from '../src/config/schema.js';
import { couponSchema } from '../src/config/schema.js';
import { getTrivia } from '../src/config/trivias.js';

/*
 * Panel de resultados del negocio. Compartido por api/stats.ts (Vercel + Redis) y dev/ (archivos JSON).
 * El acceso se protege con el mismo PIN de canje (lo valida quien llama, antes de usar esto).
 */

export const statsRequestSchema = z.object({
  triviaSlug: z.string().regex(/^[a-z0-9-]+$/),
  pin: z.string().min(4).max(32),
});

/** Participante tal como se guarda al terminar la trivia. */
export const storedParticipantSchema = z.object({
  name: z.string(),
  whatsapp: z.string(),
  correctCount: z.number(),
  createdAt: z.string(),
  coupon: couponSchema.nullable().optional(),
  marketing: z.boolean().optional(),
});

export type StoredParticipant = z.infer<typeof storedParticipantSchema>;

export type StatsStore = {
  listParticipants(triviaSlug: string): Promise<StoredParticipant[]>;
  getRedeemedAt(code: string): Promise<string | null>;
};

export async function buildStats(triviaSlug: string, store: StatsStore): Promise<StatsResult | null> {
  const trivia = getTrivia(triviaSlug);
  if (!trivia) return null;

  const participants = await store.listParticipants(triviaSlug);
  const rows = await Promise.all(
    participants.map(async (p) => ({
      name: p.name,
      whatsapp: p.whatsapp,
      correctCount: p.correctCount,
      playedAt: p.createdAt,
      couponCode: p.coupon?.code ?? null,
      redeemedAt: p.coupon ? await store.getRedeemedAt(p.coupon.code) : null,
      marketing: p.marketing ?? false,
    })),
  );

  // Lo más reciente arriba: es lo que el dueño quiere ver primero.
  const sorted = rows.toSorted((a, b) => b.playedAt.localeCompare(a.playedAt));

  return {
    totalQuestions: trivia.questions.length,
    participants: sorted.length,
    winners: sorted.filter((r) => r.couponCode !== null).length,
    redeemed: sorted.filter((r) => r.redeemedAt !== null).length,
    rows: sorted,
  };
}
