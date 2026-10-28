# Triviala

Trivias de marca para pymes: el participante juega desde el celular, deja su nombre y WhatsApp, y gana un premio canjeable en el local.

## Stack

- React 19 + Vite + TypeScript estricto (frontend)
- Función serverless de Vercel en `api/participants.ts`
- Upstash Redis (plan gratis vía Vercel Marketplace) para guardar participantes
- Zod para validar la config de cada trivia y los datos del participante (cliente y servidor)

## Estructura

```
src/config/schema.ts        Esquemas Zod: trivia y participante
src/config/demos/cafe.ts    Demo "Café La Esquina" (cambiar aquí textos, colores y premio)
src/lib/scoring.ts          Lógica pura: aciertos, premio, código de canje
src/lib/api.ts              Envío del participante a /api/participants
src/components/             QuestionCard, LeadForm, ResultCard
api/participants.ts         Guarda participante (rate limit 10/min por IP, sin duplicados por WhatsApp)
```

## Desarrollo

```bash
npm install
npm run dev        # solo frontend (el envío del formulario fallará sin la API)
npx vercel dev     # frontend + API locales
npm test           # pruebas de la lógica de puntaje
```

## Desplegar en Vercel (gratis, dominio triviala.vercel.app)

1. Sube la carpeta a un repo de GitHub (`git push`).
2. En vercel.com → **Add New → Project** → importa el repo. Vercel detecta Vite solo; nombra el proyecto `triviala` para obtener `triviala.vercel.app` (si está ocupado, elige otro).
3. En el proyecto → **Storage → Create → Upstash (Redis)**, plan gratis, y conéctalo al proyecto. Eso crea las variables de entorno solas.
4. **Redeploy**. Listo.

Ver participantes: en la consola de Upstash, las llaves `trivia:demo-cafe:participant:*`.

## Crear una trivia para un cliente nuevo

Copia `src/config/demos/cafe.ts`, cambia `slug`, marca, colores, preguntas y premio. (Semana 2: elegir la trivia por URL, `/t/<slug>`.)

## Rutas

- `/` → demo de cafetería
- `/t/<slug>` → trivia de un negocio (ej. `/t/demo-gym`)
- `/canje/<slug>` → pantalla de canje para el cajero

## Canje de cupones

Cada negocio tiene un PIN que vive solo en el servidor:

- **Local:** el PIN es `1234` (o el que pongas en la variable `REDEEM_PIN_<SLUG>`).
- **Vercel:** en Settings → Environment Variables crea `REDEEM_PIN_DEMO_CAFE`, `REDEEM_PIN_DEMO_GYM`, etc. (slug en mayúsculas, guiones → `_`). Sin esa variable el canje queda bloqueado.

Tras 5 PIN incorrectos la caja se bloquea 10 minutos. Un cupón solo se puede canjear una vez, aunque dos cajas lo intenten al mismo tiempo.

## Agregar un negocio

1. Copia `src/config/demos/cafe.ts`, cambia `slug`, marca, colores, preguntas y premio.
2. Regístralo en `src/config/trivias.ts`.
3. Crea su `REDEEM_PIN_<SLUG>` en Vercel.
