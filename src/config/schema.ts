import { z } from 'zod';

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;

export const questionSchema = z
  .object({
    id: z.string().min(1),
    text: z.string().min(1),
    options: z.array(z.string().min(1)).min(MIN_OPTIONS).max(MAX_OPTIONS),
    correctIndex: z.number().int().nonnegative(),
    funFact: z.string().optional(),
  })
  .refine((q) => q.correctIndex < q.options.length, {
    message: 'correctIndex fuera de rango',
  });

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un color hex de 6 dígitos');

export const triviaConfigSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string(),
    /** Color principal (fondos y botones); los tintes se derivan en CSS. */
    color: hexColor,
    /** Color de acento (temporizador, anillo de resultado). */
    accent: hexColor.default('#d9826b'),
    emoji: z.string().default(''),
  }),
  title: z.string().min(1),
  intro: z.string(),
  secondsPerQuestion: z.number().int().positive().default(20),
  questions: z.array(questionSchema).min(1),
  prize: z.object({
    minCorrect: z.number().int().nonnegative(),
    description: z.string().min(1),
    /** Días que el cupón es válido desde que se gana. */
    validDays: z.number().int().positive().default(30),
    redeemInstructions: z.string(),
    /** Condiciones que ve el cliente y que el cajero verifica (compra mínima, horario, no acumulable…). */
    conditions: z.array(z.string().min(1)).default([]),
    /** Máximo de cupones a entregar en toda la campaña; sin valor = sin límite. */
    maxCoupons: z.number().int().positive().optional(),
  }),
  privacyNoticeUrl: z.string(),
  /** Datos del negocio como responsable de los datos de sus jugadores (aviso de privacidad y bases). */
  legal: z
    .object({
      name: z.string().min(1),
      address: z.string().min(1),
      contact: z.string().min(1),
    })
    .optional(),
});

export type Question = z.infer<typeof questionSchema>;
export type TriviaConfig = z.infer<typeof triviaConfigSchema>;

export const NAME_MAX_LENGTH = 40;
export const WHATSAPP_LENGTH = 10;
/** Letras (con acentos y ñ), espacios, apóstrofo, punto y guion. Nada de <, >, números ni símbolos. */
export const NAME_ALLOWED = /^\p{L}[\p{L} '.-]*$/u;

/** strictObject: el servidor rechaza cualquier campo extra que alguien intente colar. */
export const participantSchema = z.strictObject({
  triviaSlug: z.string().regex(/^[a-z0-9-]+$/).max(60),
  name: z
    .string()
    .transform((v) => v.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(2, 'Escribe tu nombre (mínimo 2 letras)')
        .max(NAME_MAX_LENGTH, `Tu nombre puede tener hasta ${NAME_MAX_LENGTH} letras`)
        .regex(NAME_ALLOWED, 'Usa solo letras en tu nombre'),
    ),
  whatsapp: z
    .string()
    .max(20)
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(
      z
        .string()
        .length(WHATSAPP_LENGTH, `El WhatsApp debe tener ${WHATSAPP_LENGTH} dígitos`)
        // En México ningún número de 10 dígitos empieza con 0 o 1.
        .regex(/^[2-9]\d{9}$/, 'Revisa tu número de WhatsApp'),
    ),
  consent: z.literal(true),
  /** Finalidad voluntaria y separada: acepta recibir promociones por WhatsApp. */
  marketing: z.boolean().default(false),
  correctCount: z.number().int().nonnegative().max(100),
  totalQuestions: z.number().int().positive().max(100),
});

export type Participant = z.infer<typeof participantSchema>;

export const couponSchema = z.object({
  code: z.string().regex(/^[A-Z2-9]{6}$/),
  /** Fecha ISO (UTC) del último momento en que se puede canjear. */
  expiresAt: z.iso.datetime(),
});

export type Coupon = z.infer<typeof couponSchema>;

/** Respuesta 409 de POST /api/participants: ya jugó; trae su cupón si había ganado. */
export const alreadyPlayedResponseSchema = z.object({
  coupon: couponSchema.nullable().default(null),
});

/** Respuesta de POST /api/participants. */
export const participantResponseSchema = z.object({
  ok: z.literal(true),
  coupon: couponSchema.nullable(),
  /** Ganó, pero ya se entregaron todos los cupones de la campaña. */
  soldOut: z.boolean().default(false),
});

/** Respuesta de POST /api/redeem (canje del negocio). Seguro de importar en el navegador. */
export const redeemResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('not-found') }),
  z.object({ status: z.literal('expired'), expiresAt: z.iso.datetime() }),
  z.object({ status: z.literal('already-redeemed'), redeemedAt: z.iso.datetime() }),
  z.object({ status: z.literal('valid'), prize: z.string(), conditions: z.array(z.string()).default([]), expiresAt: z.iso.datetime(), whatsappHint: z.string() }),
  z.object({ status: z.literal('redeemed'), prize: z.string(), redeemedAt: z.iso.datetime() }),
]);

export type RedeemResult = z.infer<typeof redeemResponseSchema>;

/** Respuesta de POST /api/stats (panel de resultados del negocio). */
export const statsResponseSchema = z.object({
  totalQuestions: z.number().int(),
  participants: z.number().int(),
  winners: z.number().int(),
  redeemed: z.number().int(),
  rows: z.array(
    z.object({
      name: z.string(),
      whatsapp: z.string(),
      correctCount: z.number().int(),
      playedAt: z.string(),
      couponCode: z.string().nullable(),
      redeemedAt: z.string().nullable(),
      marketing: z.boolean().default(false),
    }),
  ),
});

export type StatsResult = z.infer<typeof statsResponseSchema>;
