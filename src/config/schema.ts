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

export const triviaConfigSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string(),
    colorPrimary: z.string(),
    colorAccent: z.string(),
    emoji: z.string().default(''),
  }),
  title: z.string().min(1),
  intro: z.string(),
  secondsPerQuestion: z.number().int().positive().default(20),
  questions: z.array(questionSchema).min(1),
  prize: z.object({
    minCorrect: z.number().int().nonnegative(),
    description: z.string().min(1),
    redeemInstructions: z.string(),
  }),
  privacyNoticeUrl: z.string(),
});

export type Question = z.infer<typeof questionSchema>;
export type TriviaConfig = z.infer<typeof triviaConfigSchema>;

export const participantSchema = z.object({
  triviaSlug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2).max(80),
  whatsapp: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{10}$/, 'El WhatsApp debe tener 10 dígitos')),
  consent: z.literal(true),
  correctCount: z.number().int().nonnegative(),
  totalQuestions: z.number().int().positive(),
});

export type Participant = z.infer<typeof participantSchema>;
