import { describe, expect, it } from 'vitest';
import { buildStats } from './stats.js';
import type { StatsStore, StoredParticipant } from './stats.js';

function memoryStore(participants: StoredParticipant[], redeemed: Record<string, string> = {}): StatsStore {
  return {
    async listParticipants() {
      return participants;
    },
    async getRedeemedAt(code) {
      return redeemed[code] ?? null;
    },
  };
}

const ana: StoredParticipant = {
  name: 'Ana',
  whatsapp: '5511111111',
  correctCount: 5,
  createdAt: '2026-11-01T18:00:00.000Z',
  coupon: { code: 'ABC234', expiresAt: '2026-11-28T05:59:59.000Z' },
};
const luis: StoredParticipant = { name: 'Luis', whatsapp: '5522222222', correctCount: 2, createdAt: '2026-11-02T18:00:00.000Z', coupon: null };

describe('buildStats', () => {
  it('cuenta participantes, ganadores y canjes', async () => {
    const stats = await buildStats('demo-cafe', memoryStore([ana, luis], { ABC234: '2026-11-03T18:00:00.000Z' }));

    expect(stats).toMatchObject({ participants: 2, winners: 1, redeemed: 1, totalQuestions: 5 });
  });

  it('ordena la lista con lo más reciente primero', async () => {
    const stats = await buildStats('demo-cafe', memoryStore([ana, luis]));

    expect(stats?.rows.map((r) => r.name)).toEqual(['Luis', 'Ana']);
  });

  it('regresa null si la trivia no existe', async () => {
    expect(await buildStats('no-existe', memoryStore([]))).toBeNull();
  });
});
