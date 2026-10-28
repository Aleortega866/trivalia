import { Redis } from '@upstash/redis';
import { couponSchema, participantSchema } from '../src/config/schema.js';
import { getTrivia } from '../src/config/trivias.js';
import { buildCoupon } from '../src/lib/prize.js';

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_S = 60;

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status });
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

async function isRateLimited(redis: Redis, ip: string): Promise<boolean> {
  const key = `ratelimit:participants:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_S);
  return count > RATE_LIMIT_MAX;
}

export async function POST(request: Request): Promise<Response> {
  const redis = getRedis();
  if (!redis) return json({ error: 'Almacenamiento no configurado' }, 503);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (await isRateLimited(redis, ip)) return json({ error: 'Demasiados intentos' }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const parsed = participantSchema.safeParse(body);
  if (!parsed.success) return json({ error: 'Datos inválidos', issues: parsed.error.issues }, 400);

  const { triviaSlug, whatsapp, correctCount, ...rest } = parsed.data;
  const trivia = getTrivia(triviaSlug);
  if (!trivia) return json({ error: 'Trivia no encontrada' }, 404);
  if (correctCount > trivia.questions.length) return json({ error: 'Puntaje inválido' }, 400);

  const coupon = buildCoupon(trivia, correctCount);
  const participantKey = `trivia:${triviaSlug}:participant:${whatsapp}`;
  const record = { whatsapp, correctCount, ...rest, coupon, createdAt: new Date().toISOString() };

  // NX: solo guarda si este WhatsApp no ha participado en esta trivia.
  const created = await redis.set(participantKey, record, { nx: true });
  if (created === null) {
    // Ya jugó con este WhatsApp: le regresamos su cupón (si ganó) para que no lo pierda.
    const existing = await redis.get<{ coupon?: unknown }>(participantKey);
    const previous = couponSchema.safeParse(existing?.coupon);
    return json({ error: 'Ya participó', coupon: previous.success ? previous.data : null }, 409);
  }

  await redis.sadd(`trivia:${triviaSlug}:participants`, whatsapp);
  if (coupon) {
    // El negocio valida el cupón por su código (pantalla de canje, siguiente paso).
    await redis.set(`coupon:${coupon.code}`, { ...coupon, triviaSlug, whatsapp, redeemedAt: null });
  }

  return json({ ok: true, coupon }, 201);
}
