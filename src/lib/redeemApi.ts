import { redeemResponseSchema } from '../config/schema';
import type { RedeemResult } from '../config/schema';

const REQUEST_TIMEOUT_MS = 8000;
const HTTP_UNAUTHORIZED = 401;
const HTTP_TOO_MANY_REQUESTS = 429;

export type RedeemAction = 'check' | 'redeem';

export type RedeemCallResult =
  | { kind: 'ok'; result: RedeemResult }
  | { kind: 'bad-pin' }
  | { kind: 'error'; message: string };

export async function callRedeem(input: {
  triviaSlug: string;
  pin: string;
  code: string;
  action: RedeemAction;
}): Promise<RedeemCallResult> {
  try {
    const res = await fetch('/api/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (res.status === HTTP_UNAUTHORIZED) return { kind: 'bad-pin' };
    if (res.status === HTTP_TOO_MANY_REQUESTS) {
      return { kind: 'error', message: 'Demasiados intentos con PIN incorrecto. Espera 10 minutos.' };
    }
    if (!res.ok) return { kind: 'error', message: 'Revisa el código: deben ser 6 letras o números.' };

    const parsed = redeemResponseSchema.safeParse(await res.json());
    if (!parsed.success) throw new Error('Respuesta inesperada del servidor', { cause: parsed.error });
    return { kind: 'ok', result: parsed.data };
  } catch (error) {
    console.error(new Error('Fallo al consultar el canje', { cause: error }));
    return { kind: 'error', message: 'Sin conexión. Revisa el internet e intenta de nuevo.' };
  }
}

/** "1 de noviembre, 12:04 p.m." en hora de México. */
export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso));
}
