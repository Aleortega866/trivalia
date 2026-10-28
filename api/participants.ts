import { Redis } from '@upstash/redis';
import { participantSchema } from '../src/config/schema.js';

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

  const { triviaSlug, whatsapp, ...rest } = parsed.data;
  const participantKey = `trivia:${triviaSlug}:participant:${whatsapp}`;

  // NX: solo guarda si este WhatsApp no ha participado en esta trivia.
  const created = await redis.set(participantKey, { whatsapp, ...rest, createdAt: new Date().toISOString() }, { nx: true });
  if (created === null) return json({ error: 'Ya participó' }, 409);

  await redis.sadd(`trivia:${triviaSlug}:participants`, whatsapp);
  return json({ ok: true }, 201);
}
