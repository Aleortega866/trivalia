import { useActionState, useRef } from 'react';
import { participantSchema } from '../config/schema';
import type { Coupon } from '../config/schema';
import { submitParticipant } from '../lib/api';

type Props = {
  triviaSlug: string;
  correctCount: number;
  totalQuestions: number;
  privacyNoticeUrl: string;
  brandName: string;
  onSubmitted: (coupon: Coupon | null) => void;
  /** Ya había jugado con ese WhatsApp y ganó: mostrar su cupón existente. */
  onAlreadyWon: (coupon: Coupon) => void;
};

type FormState = { error: string | null; name: string; whatsapp: string };

export function LeadForm({ triviaSlug, correctCount, totalQuestions, privacyNoticeUrl, brandName, onSubmitted, onAlreadyWon }: Props) {
  const privacyDialogRef = useRef<HTMLDialogElement>(null);
  const hasExternalNotice = privacyNoticeUrl.startsWith('http');

  async function submit(_prev: FormState, formData: FormData): Promise<FormState> {
    const name = String(formData.get('name') ?? '');
    const whatsapp = String(formData.get('whatsapp') ?? '');
    const parsed = participantSchema.safeParse({
      triviaSlug,
      name,
      whatsapp,
      consent: formData.get('consent') === 'on',
      correctCount,
      totalQuestions,
    });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue?.path[0] === 'consent' ? 'Acepta el aviso de privacidad para continuar.' : firstIssue?.message;
      return { error: message ?? 'Revisa tus datos.', name, whatsapp };
    }

    const result = await submitParticipant(parsed.data);
    if (result.status === 'error') return { error: result.message, name, whatsapp };
    if (result.status === 'already-played') {
      if (result.coupon) {
        onAlreadyWon(result.coupon);
        return { error: null, name, whatsapp };
      }
      return { error: 'Ya participaste con este WhatsApp. ¡Gracias por jugar!', name, whatsapp };
    }

    onSubmitted(result.coupon);
    return { error: null, name, whatsapp };
  }

  const [state, formAction, isPending] = useActionState(submit, { error: null, name: '', whatsapp: '' });

  return (
    <section className="card">
      <p className="eyebrow">Último paso</p>
      <h2 className="question-text">¡Terminaste!</h2>
      <p>Déjanos tus datos para ver tu resultado y, si ganaste, tu código de premio.</p>

      <form action={formAction} className="form" noValidate>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" autoComplete="given-name" placeholder="Tu nombre" defaultValue={state.name} required />

        <label htmlFor="whatsapp">WhatsApp (10 dígitos)</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="55 1234 5678"
          defaultValue={state.whatsapp}
          aria-describedby={state.error ? 'form-error' : undefined}
          required
        />

        <label className="consent">
          <input type="checkbox" name="consent" />
          <span>
            Acepto el{' '}
            <button type="button" className="link-button" onClick={() => privacyDialogRef.current?.showModal()}>
              aviso de privacidad
            </button>{' '}
            y que el negocio me contacte por WhatsApp.
          </span>
        </label>

        {state.error && (
          <p id="form-error" role="alert" className="error">
            {state.error}
          </p>
        )}

        <button type="submit" className="cta" disabled={isPending}>
          {isPending ? 'Enviando…' : 'Ver mi resultado'}
          {!isPending && (
            <span className="cta__arrow" aria-hidden="true">
              →
            </span>
          )}
        </button>
      </form>

      <dialog ref={privacyDialogRef} className="privacy-dialog" aria-labelledby="privacy-title">
        <h2 id="privacy-title">Aviso de privacidad</h2>
        <p>
          {brandName} usará tu nombre y WhatsApp solo para enviarte promociones y avisarte de tu premio. No los
          compartimos con nadie y puedes pedir que te borremos en cualquier momento.
        </p>
        {hasExternalNotice && (
          <p>
            <a href={privacyNoticeUrl} target="_blank" rel="noreferrer">
              Ver aviso completo
            </a>
          </p>
        )}
        <form method="dialog">
          <button type="submit" className="cta">
            Entendido
          </button>
        </form>
      </dialog>
    </section>
  );
}
