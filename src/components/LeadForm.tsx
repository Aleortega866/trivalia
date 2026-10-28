import { useActionState, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { NAME_ALLOWED, NAME_MAX_LENGTH, WHATSAPP_LENGTH, participantSchema } from '../config/schema';
import type { Coupon } from '../config/schema';
import { submitParticipant } from '../lib/api';

type Props = {
  triviaSlug: string;
  correctCount: number;
  totalQuestions: number;
  privacyNoticeUrl: string;
  brandName: string;
  onSubmitted: (coupon: Coupon | null, soldOut: boolean) => void;
  /** Ya había jugado con ese WhatsApp y ganó: mostrar su cupón existente. */
  onAlreadyWon: (coupon: Coupon) => void;
};

type FormState = { error: string | null; name: string; whatsapp: string };

/** Quita al escribir lo que no puede ir en un nombre (números, < > y símbolos) y los espacios dobles. */
function cleanName(value: string): string {
  return value
    .replace(/[^\p{L} '.-]/gu, '')
    .replace(/^[^\p{L}]+/u, '')
    .replace(/ {2,}/g, ' ')
    .slice(0, NAME_MAX_LENGTH);
}

function cleanWhatsapp(value: string): string {
  return value.replace(/\D/g, '').slice(0, WHATSAPP_LENGTH);
}

/** Aplica el filtro sin mover el cursor al final cuando se edita a la mitad. */
function filterInput(event: FormEvent<HTMLInputElement>, clean: (v: string) => string): string {
  const input = event.currentTarget;
  const cleaned = clean(input.value);
  if (cleaned !== input.value) {
    const removed = input.value.length - cleaned.length;
    const caret = Math.max((input.selectionStart ?? cleaned.length) - removed, 0);
    input.value = cleaned;
    input.setSelectionRange(caret, caret);
  }
  return cleaned;
}

export function LeadForm({ triviaSlug, correctCount, totalQuestions, privacyNoticeUrl, brandName, onSubmitted, onAlreadyWon }: Props) {
  const privacyDialogRef = useRef<HTMLDialogElement>(null);
  const hasExternalNotice = privacyNoticeUrl.startsWith('http');
  const [fields, setFields] = useState({ name: false, whatsapp: false, consent: false });
  const isComplete = fields.name && fields.whatsapp && fields.consent;

  async function submit(_prev: FormState, formData: FormData): Promise<FormState> {
    const name = String(formData.get('name') ?? '');
    const whatsapp = String(formData.get('whatsapp') ?? '');
    const parsed = participantSchema.safeParse({
      triviaSlug,
      name,
      whatsapp,
      consent: formData.get('consent') === 'on',
      marketing: formData.get('marketing') === 'on',
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

    onSubmitted(result.coupon, result.soldOut);
    return { error: null, name, whatsapp };
  }

  const [state, formAction, isPending] = useActionState(submit, { error: null, name: '', whatsapp: '' });

  return (
    <section className="card">
      <p className="eyebrow">Último paso</p>
      <h2 className="question-text">¡Terminaste!</h2>
      <p>Déjanos tus datos para ver tu resultado y, si ganaste, tu código de premio.</p>

      <form action={formAction} className="form" noValidate>
        <label htmlFor="name">
          Nombre <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="given-name"
          placeholder="Tu nombre"
          defaultValue={state.name}
          maxLength={NAME_MAX_LENGTH}
          spellCheck={false}
          onInput={(e) => {
            const value = filterInput(e, cleanName).trim();
            setFields((f) => ({ ...f, name: value.length >= 2 && NAME_ALLOWED.test(value) }));
          }}
          aria-describedby={state.error ? 'form-error' : undefined}
          required
        />

        <label htmlFor="whatsapp">
          WhatsApp (10 dígitos) <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="5512345678"
          defaultValue={state.whatsapp}
          maxLength={WHATSAPP_LENGTH}
          onInput={(e) => {
            const value = filterInput(e, cleanWhatsapp);
            setFields((f) => ({ ...f, whatsapp: /^[2-9]\d{9}$/.test(value) }));
          }}
          aria-describedby={state.error ? 'form-error' : undefined}
          required
        />

        <label className="consent">
          <input
            type="checkbox"
            name="consent"
            required
            onChange={(e) => {
              const checked = e.currentTarget.checked;
              setFields((f) => ({ ...f, consent: checked }));
            }}
          />
          <span>
            Acepto el{' '}
            <button type="button" className="link-button" onClick={() => privacyDialogRef.current?.showModal()}>
              aviso de privacidad
            </button>{' '}
            y las{' '}
            <a className="link-button" href={`/bases/${triviaSlug}`} target="_blank" rel="noreferrer">
              bases
            </a>
            . <span className="required" aria-hidden="true">*</span>
          </span>
        </label>

        <label className="consent">
          <input type="checkbox" name="marketing" />
          <span>Quiero recibir promociones de {brandName} por WhatsApp (opcional).</span>
        </label>

        {state.error && (
          <p id="form-error" role="alert" className="error">
            {state.error}
          </p>
        )}

        <p className="hint form-required-note">
          <span className="required" aria-hidden="true">*</span> Campos obligatorios
        </p>

        <button type="submit" className="cta" disabled={isPending || !isComplete}>
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
          {brandName} es responsable de tus datos. Usará tu nombre y WhatsApp para registrar tu participación, entregarte tu
          cupón y validarlo. Solo te enviará promociones si marcas la casilla opcional. No se venden ni se comparten y
          puedes pedir que se borren cuando quieras.
        </p>
        <p>
          <a href={hasExternalNotice ? privacyNoticeUrl : `/privacidad/${triviaSlug}`} target="_blank" rel="noreferrer">
            Ver aviso de privacidad completo
          </a>
        </p>
        <form method="dialog">
          <button type="submit" className="cta">
            Entendido
          </button>
        </form>
      </dialog>
    </section>
  );
}
