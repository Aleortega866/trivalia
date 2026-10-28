import type { z } from 'zod';
import type { triviaConfigSchema } from '../schema.js';

export const cafeDemo = {
  slug: 'demo-cafe',
  brand: {
    name: 'Café La Esquina',
    tagline: 'Café de especialidad desde 2019',
    color: '#1f4f4a',
    accent: '#d9826b',
    emoji: '☕',
  },
  title: '¿Cuánto sabes de café?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un café americano gratis en tu próxima visita.',
  secondsPerQuestion: 20,
  questions: [
    {
      id: 'q1',
      text: '¿Qué estado de México produce más café?',
      options: ['Chiapas', 'Sonora', 'Yucatán', 'Coahuila'],
      correctIndex: 0,
      funFact: 'Chiapas produce cerca del 40% del café mexicano.',
    },
    {
      id: 'q2',
      text: '¿Qué bebida lleva más leche?',
      options: ['Espresso', 'Cortado', 'Latte', 'Americano'],
      correctIndex: 2,
      funFact: 'El latte es casi dos tercios leche vaporizada.',
    },
    {
      id: 'q3',
      text: '¿De qué color es el fruto del café cuando está maduro?',
      options: ['Verde', 'Rojo', 'Café', 'Negro'],
      correctIndex: 1,
      funFact: 'Al fruto maduro se le llama "cereza".',
    },
    {
      id: 'q4',
      text: '¿Qué variedad de café se considera de mayor calidad en taza?',
      options: ['Robusta', 'Arábica', 'Liberica', 'Instantáneo'],
      correctIndex: 1,
    },
    {
      id: 'q5',
      text: '¿Qué método de preparación usa papel filtro?',
      options: ['Prensa francesa', 'Espresso', 'V60', 'Moka'],
      correctIndex: 2,
      funFact: 'El V60 es un método de goteo japonés muy usado en cafeterías de especialidad.',
    },
  ],
  prize: {
    minCorrect: 4,
    description: 'Un café americano gratis',
    validDays: 30,
    redeemInstructions: 'Muestra este cupón en caja en tu próxima compra. Uno por persona.',
    conditions: ['En compras de $120 o más', 'Lunes a jueves', 'No acumulable con otras promociones'],
    maxCoupons: 50,
  },
  privacyNoticeUrl: '',
} satisfies z.input<typeof triviaConfigSchema>;
