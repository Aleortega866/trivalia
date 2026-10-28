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
  }),
  privacyNoticeUrl: z.string(),
});

export type Question = z.infer<typeof questionSchema>;
export type TriviaConfig = z.infer<typeof triviaConfigSchema>;

export const participantSchema = z.object({
  triviaSlug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2, 'Escribe tu nombre (mínimo 2 letras)').max(80, 'El nombre es demasiado largo'),
  whatsapp: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{10}$/, 'El WhatsApp debe tener 10 dígitos')),
  consent: z.literal(true),
  correctCount: z.number().int().nonnegative(),
  totalQuestions: z.number().int().positive(),
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
});

/** Respuesta de POST /api/redeem (canje del negocio). Seguro de importar en el navegador. */
export const redeemResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('not-found') }),
  z.object({ status: z.literal('expired'), expiresAt: z.iso.datetime() }),
  z.object({ status: z.literal('already-redeemed'), redeemedAt: z.iso.datetime() }),
  z.object({ status: z.literal('valid'), prize: z.string(), expiresAt: z.iso.datetime(), whatsappHint: z.string() }),
  z.object({ status: z.literal('redeemed'), prize: z.string(), redeemedAt: z.iso.datetime() }),
]);

export type RedeemResult = z.infer<typeof redeemResponseSchema>;
