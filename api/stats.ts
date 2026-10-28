import { Redis } from '@upstash/redis';
import { isPinValid, redeemPinEnvName } from '../server/redeem.js';
import { buildStats, statsRequestSchema, storedParticipantSchema } from '../server/stats.js';
import type { StatsStore, StoredParticipant } from '../server/stats.js';

const PIN_ATTEMPTS_MAX = 5;
const PIN_ATTEMPTS_WINDOW_S = 600;

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status });
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

function redisStore(redis: Redis): StatsStore {
  return {
    async listParticipants(triviaSlug) {
      const whatsapps = await redis.smembers(`trivia:${triviaSlug}:participants`);
      if (whatsapps.length === 0) return [];
      const records = await redis.mget<unknown[]>(...whatsapps.map((w) => `trivia:${triviaSlug}:participant:${w}`));
      return records.flatMap((record): StoredParticipant[] => {
        const parsed = storedParticipantSchema.safeParse(record);
        return parsed.success ? [parsed.data] : [];
      });
    },
    async getRedeemedAt(code) {
      return redis.get<string>(`coupon:${code}:redeemed`);
    },
  };
}

export async function POST(request: Request): Promise<Response> {
  const redis = getRedis();
  if (!redis) return json({ error: 'Almacenamiento no configurado' }, 503);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }
  const parsed = statsRequestSchema.safeParse(body);
  if (!parsed.success) return json({ error: 'Datos inválidos' }, 400);

  const { triviaSlug, pin } = parsed.data;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  // Mismo contador que el canje: los intentos fallidos de PIN se suman entre las dos pantallas.
  const attemptsKey = `ratelimit:redeem-pin:${triviaSlug}:${ip}`;
  const failedAttempts = (await redis.get<number>(attemptsKey)) ?? 0;
  if (failedAttempts >= PIN_ATTEMPTS_MAX) return json({ error: 'Demasiados intentos' }, 429);

  if (!isPinValid(process.env[redeemPinEnvName(triviaSlug)], pin)) {
    const count = await redis.incr(attemptsKey);
    if (count === 1) await redis.expire(attemptsKey, PIN_ATTEMPTS_WINDOW_S);
    return json({ error: 'PIN incorrecto' }, 401);
  }

  const stats = await buildStats(triviaSlug, redisStore(redis));
  if (!stats) return json({ error: 'Trivia no encontrada' }, 404);
  return json(stats);
}
