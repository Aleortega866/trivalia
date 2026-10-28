import { statsResponseSchema } from '../config/schema';
import type { StatsResult } from '../config/schema';

const REQUEST_TIMEOUT_MS = 8000;
const HTTP_UNAUTHORIZED = 401;
const HTTP_TOO_MANY_REQUESTS = 429;

export type StatsCallResult = { kind: 'ok'; stats: StatsResult } | { kind: 'bad-pin' } | { kind: 'error'; message: string };

export async function fetchStats(triviaSlug: string, pin: string): Promise<StatsCallResult> {
  try {
    const res = await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ triviaSlug, pin }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (res.status === HTTP_UNAUTHORIZED) return { kind: 'bad-pin' };
    if (res.status === HTTP_TOO_MANY_REQUESTS) {
      return { kind: 'error', message: 'Demasiados intentos con PIN incorrecto. Espera 10 minutos.' };
    }
    if (!res.ok) return { kind: 'error', message: 'No pudimos cargar los resultados. Intenta de nuevo.' };

    const parsed = statsResponseSchema.safeParse(await res.json());
    if (!parsed.success) throw new Error('Respuesta inesperada del servidor', { cause: parsed.error });
    return { kind: 'ok', stats: parsed.data };
  } catch (error) {
    console.error(new Error('Fallo al cargar el panel', { cause: error }));
    return { kind: 'error', message: 'Sin conexión. Revisa el internet e intenta de nuevo.' };
  }
}

/** Escapa un valor para CSV (comillas dobles y comas). */
function csvCell(value: string | number): string {
  // Un valor que empieza con = + - @ Excel lo ejecuta como fórmula: se neutraliza con un apóstrofo.
  const raw = String(value);
  const text = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** CSV con BOM para que Excel en Windows muestre bien los acentos. */
export function statsToCsv(stats: StatsResult, formatDate: (iso: string) => string): string {
  const header = ['Nombre', 'WhatsApp', 'Acepta promociones', 'Aciertos', 'Jugó', 'Cupón', 'Canjeado'];
  const lines = stats.rows.map((row) =>
    [
      row.name,
      row.whatsapp,
      row.marketing ? 'Sí' : 'No',
      `${row.correctCount}/${stats.totalQuestions}`,
      formatDate(row.playedAt),
      row.couponCode ?? '',
      row.redeemedAt ? formatDate(row.redeemedAt) : '',
    ]
      .map(csvCell)
      .join(','),
  );
  return `﻿${[header.join(','), ...lines].join('\r\n')}`;
}

export function downloadCsv(content: string, fileName: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
