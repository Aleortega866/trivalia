import { Redis } from '@upstash/redis';
import { isPinValid, processRedeem, redeemPinEnvName, redeemRequestSchema, storedCouponRecordSchema } from '../server/redeem.js';
import type { RedeemStore } from '../server/redeem.js';

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

function redisStore(redis: Redis): RedeemStore {
  return {
    async getCoupon(code) {
      const parsed = storedCouponRecordSchema.safeParse(await redis.get(`coupon:${code}`));
      return parsed.success ? parsed.data : null;
    },
    async getRedeemedAt(code) {
      return redis.get<string>(`coupon:${code}:redeemed`);
    },
    async markRedeemedIfAbsent(code, redeemedAt) {
      // SET NX es atómico: si dos cajas canjean a la vez, solo una gana.
      return (await redis.set(`coupon:${code}:redeemed`, redeemedAt, { nx: true })) !== null;
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
  const parsed = redeemRequestSchema.safeParse(body);
  if (!parsed.success) return json({ error: 'Datos inválidos' }, 400);

  const { triviaSlug, pin } = parsed.data;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const attemptsKey = `ratelimit:redeem-pin:${triviaSlug}:${ip}`;
  const failedAttempts = (await redis.get<number>(attemptsKey)) ?? 0;
  if (failedAttempts >= PIN_ATTEMPTS_MAX) return json({ error: 'Demasiados intentos' }, 429);

  if (!isPinValid(process.env[redeemPinEnvName(triviaSlug)], pin)) {
    const count = await redis.incr(attemptsKey);
    if (count === 1) await redis.expire(attemptsKey, PIN_ATTEMPTS_WINDOW_S);
    return json({ error: 'PIN incorrecto' }, 401);
  }

  return json(await processRedeem(parsed.data, redisStore(redis)));
}
