import { useState } from 'react';
import type { Coupon, TriviaConfig } from '../config/schema';
import { couponMessage, formatExpiry, renderCouponImage, saveCouponImage, whatsappShareUrl } from '../lib/coupon';

type Props = {
  config: TriviaConfig;
  coupon: Coupon;
};

type SaveStatus = { kind: 'idle' } | { kind: 'saving' } | { kind: 'done'; message: string } | { kind: 'error' };

/** Cupón ganado: código, vencimiento y opciones para guardarlo. */
export function CouponCard({ config, coupon }: Props) {
  const [status, setStatus] = useState<SaveStatus>({ kind: 'idle' });
  const expiry = formatExpiry(coupon.expiresAt);

  async function handleSaveImage(event: React.MouseEvent<HTMLButtonElement>) {
    setStatus({ kind: 'saving' });
    try {
      const themeElement = event.currentTarget.closest('.page') ?? document.body;
      const blob = await renderCouponImage(config, coupon, themeElement);
      const result = await saveCouponImage(blob, coupon.code);
      setStatus({ kind: 'done', message: result === 'downloaded' ? 'Imagen descargada' : 'Listo' });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setStatus({ kind: 'idle' });
        return;
      }
      console.error(new Error('No se pudo guardar la imagen del cupón', { cause: error }));
      setStatus({ kind: 'error' });
    }
  }

  return (
    <div className="coupon">
      <p className="coupon__label">{config.prize.description}</p>
      <p className="code" aria-label={`Código de premio ${coupon.code.split('').join(' ')}`}>
        {coupon.code.split('').map((char, i) => (
          // El código no cambia mientras se muestra: el índice es una key estable aquí.
          <span key={i} className="code__char" aria-hidden="true">
            {char}
          </span>
        ))}
      </p>
      <p className="coupon__expiry">Válido hasta el {expiry}</p>
      {config.prize.conditions.length > 0 && <p className="conditions">{config.prize.conditions.join(' · ')}</p>}

      <div className="coupon__actions">
        <button type="button" className="cta" onClick={handleSaveImage} disabled={status.kind === 'saving'}>
          {status.kind === 'saving' ? 'Creando…' : 'Guardar cupón'}
        </button>
        <a
          className="link-button"
          href={whatsappShareUrl(couponMessage(config, coupon))}
          target="_blank"
          rel="noreferrer"
        >
          Enviar a WhatsApp
        </a>
      </div>

      <p className="coupon__status" aria-live="polite">
        {status.kind === 'done' && status.message}
        {status.kind === 'error' && 'No se pudo crear la imagen. Toma captura de pantalla.'}
      </p>
    </div>
  );
}
