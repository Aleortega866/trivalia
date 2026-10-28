import type { z } from 'zod';
import type { triviaConfigSchema } from '../schema.js';

export const gymDemo = {
  slug: 'demo-gym',
  brand: {
    name: 'Gimnasio Raíz',
    tagline: 'Entrenamiento funcional en tu colonia',
    color: '#2b3a67',
    accent: '#f2a541',
    emoji: '💪',
  },
  title: '¿Qué tanto sabes de entrenar?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas una semana de prueba gratis.',
  secondsPerQuestion: 20,
  questions: [
    {
      id: 'q1',
      text: '¿Cuántos litros de agua se recomiendan al día para un adulto activo?',
      options: ['Medio litro', '1 litro', '2 a 3 litros', '6 litros'],
      correctIndex: 2,
      funFact: 'Con entrenamiento intenso, la necesidad puede subir todavía más.',
    },
    {
      id: 'q2',
      text: '¿Qué músculo trabaja principalmente una sentadilla?',
      options: ['Bíceps', 'Cuádriceps', 'Pectoral', 'Trapecio'],
      correctIndex: 1,
      funFact: 'También activa glúteos, isquiotibiales y abdomen.',
    },
    {
      id: 'q3',
      text: '¿Cuánto descanso se suele recomendar entre series de fuerza?',
      options: ['5 segundos', '1 a 3 minutos', '15 minutos', '30 minutos'],
      correctIndex: 1,
    },
    {
      id: 'q4',
      text: '¿Qué nutriente ayuda más a recuperar el músculo?',
      options: ['Proteína', 'Azúcar', 'Sal', 'Cafeína'],
      correctIndex: 0,
      funFact: 'Repartirla en varias comidas al día ayuda a aprovecharla mejor.',
    },
    {
      id: 'q5',
      text: '¿Qué es un "burpee"?',
      options: ['Un estiramiento', 'Un ejercicio de cuerpo completo', 'Una máquina', 'Un suplemento'],
      correctIndex: 1,
    },
  ],
  prize: {
    minCorrect: 4,
    description: 'Una semana de prueba gratis',
    validDays: 15,
    redeemInstructions: 'Muestra este cupón en recepción. Uno por persona.',
  },
  privacyNoticeUrl: '',
} satisfies z.input<typeof triviaConfigSchema>;
