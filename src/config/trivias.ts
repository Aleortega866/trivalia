import { triviaConfigSchema } from './schema.js';
import type { TriviaConfig } from './schema.js';
import { cafeDemo } from './demos/cafe.js';
import { gymDemo } from './demos/gym.js';

/**
 * Registro de trivias por slug. Lo usan el frontend y el servidor:
 * el servidor decide si hay premio con la config real, no con lo que mande el navegador.
 */
const TRIVIAS: Record<string, TriviaConfig> = Object.fromEntries(
  [cafeDemo, gymDemo].map((raw) => {
    const config = triviaConfigSchema.parse(raw);
    return [config.slug, config];
  }),
);

export function getTrivia(slug: string): TriviaConfig | undefined {
  return TRIVIAS[slug];
}

export const DEFAULT_TRIVIA_SLUG = 'demo-cafe';
