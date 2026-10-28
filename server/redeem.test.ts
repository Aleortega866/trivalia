import { describe, expect, it } from 'vitest';
import { isPinValid, maskWhatsapp, processRedeem, redeemPinEnvName } from './redeem.js';
import type { RedeemStore, StoredCouponRecord } from './redeem.js';

const NOW = new Date('2026-11-01T18:00:00Z');

function memoryStore(coupons: StoredCouponRecord[]): RedeemStore {
  const redeemed = new Map<string, string>();
  return {
    async getCoupon(code) {
      return coupons.find((c) => c.code === code) ?? null;
    },
    async getRedeemedAt(code) {
      return redeemed.get(code) ?? null;
    },
    async markRedeemedIfAbsent(code, at) {
      if (redeemed.has(code)) return false;
      redeemed.set(code, at);
      return true;
    },
  };
}

const validCoupon: StoredCouponRecord = {
  code: 'ABC234',
  expiresAt: '2026-11-28T05:59:59.000Z',
  triviaSlug: 'demo-cafe',
  whatsapp: '5512345678',
};

describe('processRedeem', () => {
  it('un código válido se puede verificar sin gastarlo', async () => {
    const store = memoryStore([validCoupon]);

    const first = await processRedeem({ triviaSlug: 'demo-cafe', code: 'ABC234', action: 'check' }, store, NOW);
    const second = await processRedeem({ triviaSlug: 'demo-cafe', code: 'ABC234', action: 'check' }, store, NOW);

    expect(first).toEqual({
      status: 'valid',
      prize: 'Un café americano gratis',
      conditions: ['En compras de $120 o más', 'Lunes a jueves', 'No acumulable con otras promociones'],
      expiresAt: validCoupon.expiresAt,
      whatsappHint: '55 •••• 5678',
    });
    expect(second.status).toBe('valid');
  });

  it('solo se canjea una vez', async () => {
    const store = memoryStore([validCoupon]);

    const first = await processRedeem({ triviaSlug: 'demo-cafe', code: 'ABC234', action: 'redeem' }, store, NOW);
    const second = await processRedeem({ triviaSlug: 'demo-cafe', code: 'ABC234', action: 'redeem' }, store, NOW);

    expect(first.status).toBe('redeemed');
    expect(second).toEqual({ status: 'already-redeemed', redeemedAt: NOW.toISOString() });
  });

  it('rechaza un cupón vencido', async () => {
    const store = memoryStore([{ ...validCoupon, expiresAt: '2026-10-31T05:59:59.000Z' }]);

    const result = await processRedeem({ triviaSlug: 'demo-cafe', code: 'ABC234', action: 'redeem' }, store, NOW);

    expect(result).toEqual({ status: 'expired', expiresAt: '2026-10-31T05:59:59.000Z' });
  });

  it('un código de otro negocio cuenta como inexistente', async () => {
    const store = memoryStore([validCoupon]);

    const result = await processRedeem({ triviaSlug: 'demo-gym', code: 'ABC234', action: 'check' }, store, NOW);

    expect(result).toEqual({ status: 'not-found' });
  });
});

describe('PIN de canje', () => {
  it('arma el nombre de la variable de entorno desde el slug', () => {
    expect(redeemPinEnvName('demo-cafe')).toBe('REDEEM_PIN_DEMO_CAFE');
  });

  it('rechaza PIN vacío, distinto o sin configurar', () => {
    expect(isPinValid('4821', '4821')).toBe(true);
    expect(isPinValid('4821', '1234')).toBe(false);
    expect(isPinValid('4821', '48210')).toBe(false);
    expect(isPinValid(undefined, '1234')).toBe(false);
  });
});

describe('maskWhatsapp', () => {
  it('muestra solo lada y últimos 4 dígitos', () => {
    expect(maskWhatsapp('5598765432')).toBe('55 •••• 5432');
  });
});
