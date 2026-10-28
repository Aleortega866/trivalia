import type { z } from 'zod';
import type { triviaConfigSchema } from '../schema.js';

type TriviaInput = z.input<typeof triviaConfigSchema>;

/*
 * Demos personalizadas para prospectos de Atizapán (primera tanda).
 * Los colores son aproximados: ajústalos al logo real de cada negocio antes de mandar la demo.
 */

const kanuCafe = {
  slug: 'kanu-cafe',
  brand: { name: 'KANU Café', tagline: 'Café, libros y juegos de mesa', color: '#3b3a6b', accent: '#e9a23b', emoji: '🎲' },
  title: '¿Cuánto sabes de café y juegos?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas una bebida gratis en tu próxima partida.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: 'En el ajedrez, ¿qué pieza solo se mueve en diagonal?', options: ['Torre', 'Alfil', 'Caballo', 'Rey'], correctIndex: 1 },
    { id: 'q2', text: '¿Qué estado de México produce más café?', options: ['Chiapas', 'Sonora', 'Yucatán', 'Coahuila'], correctIndex: 0, funFact: 'Chiapas produce cerca del 40% del café mexicano.' },
    { id: 'q3', text: '¿Qué gritas cuando llenas tu tabla en la lotería mexicana?', options: ['¡Bingo!', '¡Jaque!', '¡Lotería!', '¡Uno!'], correctIndex: 2 },
    { id: 'q4', text: '¿Cuántas fichas tiene un dominó tradicional (doble seis)?', options: ['24', '28', '32', '36'], correctIndex: 1 },
    { id: 'q5', text: '¿Qué bebida lleva más leche?', options: ['Espresso', 'Cortado', 'Latte', 'Americano'], correctIndex: 2, funFact: 'El latte es casi dos tercios leche vaporizada.' },
  ],
  prize: { minCorrect: 4, description: 'Una bebida gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const lulusaCafe = {
  slug: 'lulusa-cafe',
  brand: { name: 'Lulusa Café', tagline: 'Café mexicano en Hacienda de la Luz', color: '#5b3a2e', accent: '#d9a35b', emoji: '☕' },
  title: '¿Qué tan bien conoces el café mexicano?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un café gratis en tu próxima visita.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿Qué estado de México produce más café?', options: ['Chiapas', 'Sonora', 'Yucatán', 'Coahuila'], correctIndex: 0, funFact: 'Chiapas produce cerca del 40% del café mexicano.' },
    { id: 'q2', text: '¿Qué estado es famoso por su chocolate de mesa?', options: ['Oaxaca', 'Baja California', 'Nuevo León', 'Durango'], correctIndex: 0 },
    { id: 'q3', text: '¿Qué le da su sabor al café de olla?', options: ['Vainilla y leche', 'Canela y piloncillo', 'Menta y limón', 'Miel y jengibre'], correctIndex: 1 },
    { id: 'q4', text: '¿De qué país son originalmente las crepas?', options: ['Italia', 'España', 'Francia', 'Alemania'], correctIndex: 2 },
    { id: 'q5', text: '¿De qué semilla se hace el chocolate?', options: ['Café', 'Cacao', 'Vainilla', 'Almendra'], correctIndex: 1, funFact: 'El cacao ya se cultivaba en Mesoamérica hace más de 3,000 años.' },
  ],
  prize: { minCorrect: 4, description: 'Un café gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const triesteCafe = {
  slug: 'trieste-cafe',
  brand: { name: 'Trieste Café', tagline: 'Plaza Esmeralda · Pet friendly', color: '#2e4f5c', accent: '#c98b62', emoji: '☕' },
  title: '¿Cuánto sabes del café italiano?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un latte gratis en tu próxima visita.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿En qué país nació el espresso?', options: ['Francia', 'Italia', 'Colombia', 'Turquía'], correctIndex: 1 },
    { id: 'q2', text: 'El nombre "cappuccino" viene de…', options: ['Una ciudad', 'Los frailes capuchinos', 'Un barista famoso', 'Una montaña'], correctIndex: 1, funFact: 'El color del café con leche recordaba al hábito de los frailes capuchinos.' },
    { id: 'q3', text: 'Trieste, en Italia, es famosa porque ahí nació la marca de café…', options: ['illy', 'Starbucks', 'Nescafé', 'Folgers'], correctIndex: 0, funFact: 'illy se fundó en Trieste en 1933.' },
    { id: 'q4', text: '¿Qué bebida lleva más leche?', options: ['Espresso', 'Cortado', 'Latte', 'Ristretto'], correctIndex: 2 },
    { id: 'q5', text: '¿Qué variedad de café se considera de mayor calidad en taza?', options: ['Robusta', 'Arábica', 'Liberica', 'Instantáneo'], correctIndex: 1 },
  ],
  prize: { minCorrect: 4, description: 'Un latte gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const stellaPanaderia = {
  slug: 'stella-panaderia',
  brand: { name: 'Stella Panadería', tagline: 'Pan recién horneado y café', color: '#7a4b2a', accent: '#e3b04b', emoji: '🥐' },
  title: '¿Cuánto sabes de pan mexicano?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un pan dulce gratis en tu próxima compra.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿Qué pan se come en Día de Muertos?', options: ['Rosca', 'Pan de muerto', 'Bolillo', 'Concha'], correctIndex: 1, funFact: 'Las tiras de encima representan los huesos.' },
    { id: 'q2', text: '¿Qué se esconde dentro de la Rosca de Reyes?', options: ['Una moneda', 'Un muñequito', 'Un dulce', 'Una nuez'], correctIndex: 1, funFact: 'A quien le sale, le tocan los tamales del 2 de febrero.' },
    { id: 'q3', text: '¿Qué pan dulce tiene forma de concha de mar?', options: ['Oreja', 'Cuerno', 'Concha', 'Polvorón'], correctIndex: 2 },
    { id: 'q4', text: '¿Qué ingrediente hace que la masa del pan crezca?', options: ['Sal', 'Azúcar', 'Levadura', 'Canela'], correctIndex: 2 },
    { id: 'q5', text: '¿Qué día se parte la Rosca de Reyes?', options: ['24 de diciembre', '1 de enero', '6 de enero', '2 de febrero'], correctIndex: 2 },
  ],
  prize: { minCorrect: 4, description: 'Un pan dulce gratis', validDays: 15, redeemInstructions: 'Muestra este cupón en caja en tu próxima compra. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const kingCoffee = {
  slug: 'king-coffee',
  brand: { name: 'King Coffee', tagline: 'Desayunos y café en Real de Atizapán', color: '#1f3b57', accent: '#e0b23f', emoji: '👑' },
  title: '¿Eres rey del desayuno mexicano?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un café americano gratis en tu próxima visita.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿De qué se hacen los chilaquiles?', options: ['Pan', 'Tortilla', 'Papa', 'Arroz'], correctIndex: 1 },
    { id: 'q2', text: 'El huarache se llama así porque tiene forma de…', options: ['Sombrero', 'Sandalia', 'Hoja', 'Luna'], correctIndex: 1 },
    { id: 'q3', text: '¿Qué estado de México produce más café?', options: ['Chiapas', 'Sonora', 'Yucatán', 'Coahuila'], correctIndex: 0 },
    { id: 'q4', text: '¿De qué país son originalmente las crepas?', options: ['Italia', 'España', 'Francia', 'Alemania'], correctIndex: 2 },
    { id: 'q5', text: '¿Qué bebida lleva más leche?', options: ['Espresso', 'Americano', 'Latte', 'Cortado'], correctIndex: 2 },
  ],
  prize: { minCorrect: 4, description: 'Un café americano gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const estacion66 = {
  slug: 'estacion-66',
  brand: { name: 'Estación 66 Café', tagline: 'Café en Lomas de Atizapán', color: '#8c2f2b', accent: '#f0c05a', emoji: '🛣️' },
  title: 'Trivia de la Ruta 66 y el café',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas una galleta gratis con tu próximo café.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: 'La famosa Ruta 66 de Estados Unidos va de Chicago a…', options: ['Nueva York', 'Miami', 'Santa Mónica', 'Seattle'], correctIndex: 2 },
    { id: 'q2', text: '¿En qué año se inauguró la Ruta 66?', options: ['1926', '1950', '1969', '1985'], correctIndex: 0 },
    { id: 'q3', text: '¿Qué estado de México produce más café?', options: ['Chiapas', 'Sonora', 'Yucatán', 'Coahuila'], correctIndex: 0 },
    { id: 'q4', text: '¿En qué país nació el espresso?', options: ['Francia', 'Italia', 'Brasil', 'Turquía'], correctIndex: 1 },
    { id: 'q5', text: '¿De qué color es el fruto del café cuando está maduro?', options: ['Verde', 'Rojo', 'Café', 'Negro'], correctIndex: 1, funFact: 'Al fruto maduro se le llama "cereza".' },
  ],
  prize: { minCorrect: 4, description: 'Una galleta gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja con tu próximo café. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const coffeeFriends = {
  slug: 'coffee-friends',
  brand: { name: 'Coffee Friends', tagline: 'Café y tés en Lomas de San Miguel', color: '#4a3b5c', accent: '#e0a458', emoji: '🍵' },
  title: '¿Cuánto sabes de café y té?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un chai latte gratis en tu próxima visita.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿De qué país viene originalmente el chai?', options: ['China', 'India', 'Marruecos', 'Perú'], correctIndex: 1 },
    { id: 'q2', text: '¿Qué especia no puede faltar en un masala chai?', options: ['Orégano', 'Cardamomo', 'Comino', 'Pimentón'], correctIndex: 1 },
    { id: 'q3', text: 'El té verde y el té negro salen de…', options: ['La misma planta', 'Plantas distintas', 'Flores', 'Raíces'], correctIndex: 0, funFact: 'Los dos vienen de la Camellia sinensis; cambia el proceso.' },
    { id: 'q4', text: '¿De qué país es el matcha?', options: ['Japón', 'India', 'Tailandia', 'Corea'], correctIndex: 0 },
    { id: 'q5', text: '¿Qué estado de México produce más café?', options: ['Chiapas', 'Sonora', 'Yucatán', 'Coahuila'], correctIndex: 0 },
  ],
  prize: { minCorrect: 4, description: 'Un chai latte gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const garmonsCafe = {
  slug: 'garmons-cafe',
  brand: { name: "Garmon's Café", tagline: 'Café, smoothies y alitas', color: '#2f5d50', accent: '#f08a4b', emoji: '🥤' },
  title: '¿Cuánto sabes de comida y bebidas?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un smoothie gratis en tu próxima visita.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: 'Las alitas "Buffalo" se llaman así por…', options: ['Un animal', 'La ciudad de Buffalo', 'Un chef', 'Una salsa'], correctIndex: 1, funFact: 'Nacieron en Buffalo, Nueva York.' },
    { id: 'q2', text: '¿De qué se hacen los chilaquiles?', options: ['Pan', 'Tortilla', 'Papa', 'Arroz'], correctIndex: 1 },
    { id: 'q3', text: '¿De qué se hace el agua de horchata?', options: ['Arroz', 'Avena', 'Maíz', 'Coco'], correctIndex: 0 },
    { id: 'q4', text: '¿Qué bebida lleva más leche?', options: ['Espresso', 'Cortado', 'Latte', 'Americano'], correctIndex: 2 },
    { id: 'q5', text: '¿De qué país es originalmente el chai?', options: ['China', 'India', 'México', 'Italia'], correctIndex: 1 },
  ],
  prize: { minCorrect: 4, description: 'Un smoothie gratis', validDays: 30, redeemInstructions: 'Muestra este cupón en caja en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const rinconLopez = {
  slug: 'rincon-lopez',
  brand: { name: 'Rincón López', tagline: 'Comida mexicana, música y karaoke', color: '#6b1f3a', accent: '#f2b134', emoji: '🎤' },
  title: '¿Cuánto sabes de música mexicana?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas una bebida gratis en tu próxima noche de karaoke.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿A quién le decían "El Príncipe de la Canción"?', options: ['Juan Gabriel', 'José José', 'Vicente Fernández', 'Luis Miguel'], correctIndex: 1 },
    { id: 'q2', text: '¿De qué estado es originario el mariachi?', options: ['Jalisco', 'Veracruz', 'Sonora', 'Yucatán'], correctIndex: 0 },
    { id: 'q3', text: '¿En qué país se inventó el karaoke?', options: ['Estados Unidos', 'Japón', 'Corea', 'México'], correctIndex: 1 },
    { id: 'q4', text: '"Ay, ay, ay, ay, canta y no llores…" es de la canción…', options: ['Cielito lindo', 'La Bamba', 'México lindo y querido', 'El Rey'], correctIndex: 0 },
    { id: 'q5', text: '¿De qué estado es el mole poblano?', options: ['Oaxaca', 'Puebla', 'Tlaxcala', 'Guerrero'], correctIndex: 1 },
  ],
  prize: { minCorrect: 4, description: 'Una bebida gratis', validDays: 30, redeemInstructions: 'Muestra este cupón a tu mesero en tu próxima visita. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

const solMio = {
  slug: 'sol-mio',
  brand: { name: 'Sol Mío', tagline: 'Cocina casera en México Nuevo', color: '#9a3b1f', accent: '#f2c14e', emoji: '🍲' },
  title: '¿Cuánto sabes de cocina mexicana?',
  intro: 'Contesta 5 preguntas. Si aciertas 4 o más, ganas un postre gratis con tu próxima comida.',
  secondsPerQuestion: 20,
  questions: [
    { id: 'q1', text: '¿De qué estado es el mole poblano?', options: ['Oaxaca', 'Puebla', 'Tlaxcala', 'Guerrero'], correctIndex: 1 },
    { id: 'q2', text: '¿De qué se hace el agua de horchata?', options: ['Arroz', 'Avena', 'Maíz', 'Coco'], correctIndex: 0 },
    { id: 'q3', text: 'Los chiles en nogada tienen los colores de…', options: ['La bandera de México', 'Un arcoíris', 'Una piñata', 'Un sarape'], correctIndex: 0 },
    { id: 'q4', text: '¿Qué maíz se usa para el pozole?', options: ['Palomero', 'Cacahuazintle', 'Morado', 'Dulce'], correctIndex: 1 },
    { id: 'q5', text: '¿De qué se hacen los chilaquiles?', options: ['Pan', 'Tortilla', 'Papa', 'Arroz'], correctIndex: 1 },
  ],
  prize: { minCorrect: 4, description: 'Un postre gratis', validDays: 30, redeemInstructions: 'Muestra este cupón a tu mesero en tu próxima comida. Uno por persona.' },
  privacyNoticeUrl: '',
} satisfies TriviaInput;

export const prospectDemos = [
  kanuCafe,
  lulusaCafe,
  triesteCafe,
  stellaPanaderia,
  kingCoffee,
  estacion66,
  coffeeFriends,
  garmonsCafe,
  rinconLopez,
  solMio,
];
