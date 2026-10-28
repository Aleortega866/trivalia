import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import type { IncomingMessage } from 'node:http';
import type { Plugin } from 'vite';
import { participantSchema } from '../src/config/schema.ts';
import { getTrivia } from '../src/config/trivias.ts';
import { buildCoupon } from '../src/lib/prize.ts';
import { isPinValid, processRedeem, redeemPinEnvName, redeemRequestSchema } from '../server/redeem.ts';
import type { RedeemStore } from '../server/redeem.ts';
import { buildStats, statsRequestSchema, storedParticipantSchema } from '../server/stats.ts';
import type { StatsStore } from '../server/stats.ts';

/**
 * Imita /api/participants, /api/redeem y /api/stats solo en `npm run dev` (en Vercel responden los archivos de api/).
 * Guarda en dev-participants.json y dev-redeemed.json para poder revisar los datos.
 */
const STORE_FILE = 'dev-participants.json';
const REDEEMED_FILE = 'dev-redeemed.json';
/** PIN de canje en local cuando no hay variable REDEEM_PIN_<SLUG>. En Vercel no hay valor por defecto. */
const DEV_REDEEM_PIN = '1234';

type StoredParticipant = Record<string, unknown> & { triviaSlug: string; whatsapp: string };

function readStore(): StoredParticipant[] {
  if (!existsSync(STORE_FILE)) return [];
  return JSON.parse(readFileSync(STORE_FILE, 'utf8')) as StoredParticipant[];
}

function readRedeemed(): Record<string, string> {
  if (!existsSync(REDEEMED_FILE)) return {};
  return JSON.parse(readFileSync(REDEEMED_FILE, 'utf8')) as Record<string, string>;
}

const jsonStore: RedeemStore = {
  async getCoupon(code) {
    const owner = readStore().find((p) => (p.coupon as { code?: string } | null)?.code === code);
    if (!owner) return null;
    const coupon = owner.coupon as { code: string; expiresAt: string };
    return { ...coupon, triviaSlug: owner.triviaSlug, whatsapp: owner.whatsapp };
  },
  async getRedeemedAt(code) {
    return readRedeemed()[code] ?? null;
  },
  async markRedeemedIfAbsent(code, redeemedAt) {
    const redeemed = readRedeemed();
    if (redeemed[code]) return false;
    writeFileSync(REDEEMED_FILE, JSON.stringify({ ...redeemed, [code]: redeemedAt }, null, 2));
    return true;
  },
};

const jsonStatsStore: StatsStore = {
  async listParticipants(triviaSlug) {
    return readStore()
      .filter((p) => p.triviaSlug === triviaSlug)
      .flatMap((p) => {
        const parsed = storedParticipantSchema.safeParse(p);
        return parsed.success ? [parsed.data] : [];
      });
  },
  async getRedeemedAt(code) {
    return readRedeemed()[code] ?? null;
  },
};

async function readBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function devParticipantsApi(): Plugin {
  return {
    name: 'dev-participants-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/participants', async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };

        if (req.method !== 'POST') return send(405, { error: 'Método no permitido' });

        let body: unknown;
        try {
          body = await readBody(req);
        } catch {
          return send(400, { error: 'JSON inválido' });
        }

        const parsed = participantSchema.safeParse(body);
        if (!parsed.success) return send(400, { error: 'Datos inválidos', issues: parsed.error.issues });

        const { triviaSlug, whatsapp, correctCount } = parsed.data;
        const trivia = getTrivia(triviaSlug);
        if (!trivia) return send(404, { error: 'Trivia no encontrada' });
        if (correctCount > trivia.questions.length) return send(400, { error: 'Puntaje inválido' });

        const store = readStore();
        const existing = store.find((p) => p.triviaSlug === triviaSlug && p.whatsapp === whatsapp);
        if (existing) {
          // Ya jugó con este WhatsApp: le regresamos su cupón (si ganó) para que no lo pierda.
          return send(409, { error: 'Ya participó', coupon: existing.coupon ?? null });
        }

        const built = buildCoupon(trivia, correctCount);
        const { maxCoupons } = trivia.prize;
        const issued = store.filter((p) => p.triviaSlug === triviaSlug && p.coupon).length;
        const soldOut = built !== null && maxCoupons !== undefined && issued >= maxCoupons;
        const coupon = soldOut ? null : built;
        const record = { ...parsed.data, coupon, createdAt: new Date().toISOString() };
        writeFileSync(STORE_FILE, JSON.stringify([...store, record], null, 2));
        return send(201, { ok: true, coupon, soldOut });
      });

      server.middlewares.use('/api/redeem', async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };

        if (req.method !== 'POST') return send(405, { error: 'Método no permitido' });

        let body: unknown;
        try {
          body = await readBody(req);
        } catch {
          return send(400, { error: 'JSON inválido' });
        }

        const parsed = redeemRequestSchema.safeParse(body);
        if (!parsed.success) return send(400, { error: 'Datos inválidos' });

        const expectedPin = process.env[redeemPinEnvName(parsed.data.triviaSlug)] ?? DEV_REDEEM_PIN;
        if (!isPinValid(expectedPin, parsed.data.pin)) return send(401, { error: 'PIN incorrecto' });

        return send(200, await processRedeem(parsed.data, jsonStore));
      });

      server.middlewares.use('/api/stats', async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };

        if (req.method !== 'POST') return send(405, { error: 'Método no permitido' });

        let body: unknown;
        try {
          body = await readBody(req);
        } catch {
          return send(400, { error: 'JSON inválido' });
        }

        const parsed = statsRequestSchema.safeParse(body);
        if (!parsed.success) return send(400, { error: 'Datos inválidos' });

        const expectedPin = process.env[redeemPinEnvName(parsed.data.triviaSlug)] ?? DEV_REDEEM_PIN;
        if (!isPinValid(expectedPin, parsed.data.pin)) return send(401, { error: 'PIN incorrecto' });

        const stats = await buildStats(parsed.data.triviaSlug, jsonStatsStore);
        return stats ? send(200, stats) : send(404, { error: 'Trivia no encontrada' });
      });
    },
  };
}
