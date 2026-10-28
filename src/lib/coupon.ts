import { z } from 'zod';
import { couponSchema } from '../config/schema';
import type { Coupon, TriviaConfig } from '../config/schema';
import { isExpired } from './prize';

const STORAGE_PREFIX = 'triviala:coupon:';

const storedCouponSchema = couponSchema.extend({ prize: z.string() });
export type StoredCoupon = z.infer<typeof storedCouponSchema>;

/** "27 de noviembre de 2026" en hora de México. */
export function formatExpiry(expiresAt: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Mexico_City',
  }).format(new Date(expiresAt));
}

// --- Guardado en el celular (localStorage) ---------------------------------

export function saveCouponLocally(slug: string, coupon: Coupon, prize: string): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify({ ...coupon, prize }));
  } catch {
    // Modo privado o almacenamiento lleno: el cupón sigue visible y se puede descargar.
  }
}

export function loadCouponLocally(slug: string): StoredCoupon | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    if (!raw) return null;
    const parsed = storedCouponSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || isExpired(parsed.data)) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

// --- Compartir por WhatsApp -------------------------------------------------

/**
 * Mensaje para WhatsApp. Sin emojis: el enlace wa.me los rompe en algunas versiones (salen como "�").
 * Usa el formato de WhatsApp (*negritas*) para resaltar el premio y el código.
 */
export function couponMessage(config: TriviaConfig, coupon: Coupon): string {
  return [
    `Mi cupón de ${config.brand.name}`,
    `*${config.prize.description}*`,
    '',
    `Código: *${coupon.code}*`,
    `Válido hasta el ${formatExpiry(coupon.expiresAt)}`,
    ...(config.prize.conditions.length > 0 ? ['', `Condiciones: ${config.prize.conditions.join(', ')}`] : []),
    '',
    config.prize.redeemInstructions,
  ].join('\n');
}

/** Abre WhatsApp con el mensaje listo; el usuario elige el chat (por ejemplo, "Tú" para guardárselo). */
export function whatsappShareUrl(text: string): string {
  const url = new URL('https://wa.me/');
  url.searchParams.set('text', text);
  return url.toString();
}

// --- Imagen del cupón (PNG) -------------------------------------------------

const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = 1350;

function readCssVar(element: Element, name: string, fallback: string): string {
  return getComputedStyle(element).getPropertyValue(name).trim() || fallback;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(' ')) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Dibuja el cupón en un canvas con los colores de la marca y lo devuelve como PNG. */
export async function renderCouponImage(config: TriviaConfig, coupon: Coupon, themeElement: Element): Promise<Blob> {
  await document.fonts.ready;
  const brand = readCssVar(themeElement, '--brand', config.brand.color);
  const lineColor = readCssVar(themeElement, '--line', '#dcd6d2');
  const display = readCssVar(themeElement, '--font-display', 'sans-serif');
  const sans = readCssVar(themeElement, '--font-sans', 'sans-serif');

  const canvas = document.createElement('canvas');
  canvas.width = IMAGE_WIDTH;
  canvas.height = IMAGE_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas no disponible');

  const cx = IMAGE_WIDTH / 2;
  ctx.fillStyle = brand;
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `120px ${sans}`;
  ctx.fillText(config.brand.emoji || '🎁', cx, 230);
  ctx.font = `800 64px ${display}`;
  ctx.fillText(config.brand.name, cx, 340);
  ctx.globalAlpha = 0.8;
  ctx.font = `500 40px ${sans}`;
  ctx.fillText('Cupón de premio', cx, 405);
  ctx.globalAlpha = 1;

  const cardX = 90;
  const cardY = 480;
  const cardW = IMAGE_WIDTH - cardX * 2;
  const cardH = 640;
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, cardX, cardY, cardW, cardH, 48);
  ctx.fill();

  ctx.fillStyle = brand;
  ctx.font = `700 54px ${display}`;
  const descLines = wrapLines(ctx, config.prize.description, cardW - 120);
  descLines.forEach((line, i) => ctx.fillText(line, cx, cardY + 110 + i * 66));

  // Código en casillas sólidas, una por carácter (igual que en pantalla).
  const TILE_W = 112;
  const TILE_H = 150;
  const TILE_GAP = 18;
  const tilesW = coupon.code.length * TILE_W + (coupon.code.length - 1) * TILE_GAP;
  const boxY = cardY + 110 + descLines.length * 66;
  const tilesX = cx - tilesW / 2;
  ctx.textBaseline = 'middle';
  ctx.font = `800 84px ${display}`;
  coupon.code.split('').forEach((char, i) => {
    const x = tilesX + i * (TILE_W + TILE_GAP);
    ctx.fillStyle = lineColor;
    roundRect(ctx, x, boxY + 6, TILE_W, TILE_H, 20);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    roundRect(ctx, x, boxY, TILE_W, TILE_H, 20);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = brand;
    ctx.fillText(char, x + TILE_W / 2, boxY + TILE_H / 2 + 4);
  });
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = '#1d2524';
  ctx.font = `600 42px ${sans}`;
  ctx.fillText(`Válido hasta el ${formatExpiry(coupon.expiresAt)}`, cx, boxY + TILE_H + 100);
  ctx.fillStyle = '#66706e';
  ctx.font = `400 34px ${sans}`;
  const instructionLines = wrapLines(ctx, config.prize.redeemInstructions, cardW - 140);
  instructionLines.forEach((line, i) => ctx.fillText(line, cx, boxY + TILE_H + 170 + i * 44));

  // Condiciones debajo de la tarjeta, en blanco sobre el color de marca: el cajero las ve sin abrir nada más.
  if (config.prize.conditions.length > 0) {
    ctx.fillStyle = '#ffffff';
    ctx.font = `500 32px ${sans}`;
    wrapLines(ctx, `Condiciones: ${config.prize.conditions.join(' · ')}`, IMAGE_WIDTH - 160)
      .slice(0, 3)
      .forEach((line, i) => ctx.fillText(line, cx, cardY + cardH + 80 + i * 44));
  }

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.7;
  ctx.font = `500 30px ${sans}`;
  ctx.fillText('Hecho con Triviala', cx, IMAGE_HEIGHT - 70);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('No se pudo crear la imagen'))), 'image/png');
  });
}

/** En móvil abre la hoja de compartir (Guardar imagen / Fotos); si no, descarga el archivo. */
export async function saveCouponImage(blob: Blob, code: string): Promise<'shared' | 'downloaded'> {
  const fileName = `cupon-${code}.png`;
  const file = new File([blob], fileName, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file] });
    return 'shared';
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  return 'downloaded';
}
