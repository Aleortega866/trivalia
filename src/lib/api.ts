import type { z } from 'zod';
import type { participantSchema } from '../config/schema';

const REQUEST_TIMEOUT_MS = 8000;

export type ParticipantInput = z.input<typeof participantSchema>;

export type SubmitResult = { ok: true } | { ok: false; message: string };

export async function submitParticipant(input: ParticipantInput): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) return { ok: false, message: 'Demasiados intentos. Espera un minuto.' };
    if (res.status === 409) return { ok: false, message: 'Este WhatsApp ya participó en esta trivia.' };
    return { ok: false, message: 'No pudimos guardar tus datos. Intenta de nuevo.' };
  } catch (error) {
    console.error(new Error('Fallo al enviar participante', { cause: error }));
    return { ok: false, message: 'Sin conexión. Revisa tu internet e intenta de nuevo.' };
  }
}
