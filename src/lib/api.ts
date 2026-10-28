import type { z } from 'zod';
import { alreadyPlayedResponseSchema, participantResponseSchema } from '../config/schema';
import type { Coupon, participantSchema } from '../config/schema';

const REQUEST_TIMEOUT_MS = 8000;
const HTTP_CONFLICT = 409;
const HTTP_TOO_MANY_REQUESTS = 429;

export type ParticipantInput = z.input<typeof participantSchema>;

export type SubmitResult =
  | { status: 'saved'; coupon: Coupon | null; soldOut: boolean }
  | { status: 'already-played'; coupon: Coupon | null }
  | { status: 'error'; message: string };

export async function submitParticipant(input: ParticipantInput): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (res.status === HTTP_CONFLICT) {
      const parsed = alreadyPlayedResponseSchema.safeParse(await res.json().catch(() => ({})));
      return { status: 'already-played', coupon: parsed.success ? parsed.data.coupon : null };
    }
    if (res.status === HTTP_TOO_MANY_REQUESTS) {
      return { status: 'error', message: 'Demasiados intentos. Espera un minuto.' };
    }
    if (!res.ok) {
      return { status: 'error', message: 'No pudimos guardar tus datos. Intenta de nuevo.' };
    }

    const parsed = participantResponseSchema.safeParse(await res.json());
    if (!parsed.success) {
      console.error(new Error('Respuesta inesperada del servidor', { cause: parsed.error }));
      return { status: 'error', message: 'Algo salió mal de nuestro lado. Intenta de nuevo en un momento.' };
    }
    return { status: 'saved', coupon: parsed.data.coupon, soldOut: parsed.data.soldOut };
  } catch (error) {
    console.error(new Error('Fallo al enviar participante', { cause: error }));
    return { status: 'error', message: 'Sin conexión. Revisa tu internet e intenta de nuevo.' };
  }
}
