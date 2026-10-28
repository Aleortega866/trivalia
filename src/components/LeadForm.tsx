import { useActionState } from 'react';
import { participantSchema } from '../config/schema';
import { submitParticipant } from '../lib/api';

type Props = {
  triviaSlug: string;
  correctCount: number;
  totalQuestions: number;
  privacyNoticeUrl: string;
  onSubmitted: () => void;
};

type FormState = { error: string | null; name: string; whatsapp: string };

export function LeadForm({ triviaSlug, correctCount, totalQuestions, privacyNoticeUrl, onSubmitted }: Props) {
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
    if (!result.ok) return { error: result.message, name, whatsapp };

    onSubmitted();
    return { error: null, name, whatsapp };
  }

  const [state, formAction, isPending] = useActionState(submit, { error: null, name: '', whatsapp: '' });

  return (
    <section className="card">
      <h2 className="question-text">¡Terminaste! 🎉</h2>
      <p>Déjanos tus datos para ver tu resultado y, si ganaste, tu código de premio.</p>

      <form action={formAction} className="form" noValidate>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" autoComplete="given-name" defaultValue={state.name} required />

        <label htmlFor="whatsapp">WhatsApp (10 dígitos)</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          defaultValue={state.whatsapp}
          aria-describedby={state.error ? 'form-error' : undefined}
          required
        />

        <label className="consent">
          <input type="checkbox" name="consent" />
          <span>
            Acepto el <a href={privacyNoticeUrl}>aviso de privacidad</a> y que el negocio me contacte por WhatsApp.
          </span>
        </label>

        {state.error && (
          <p id="form-error" role="alert" className="error">
            {state.error}
          </p>
        )}

        <button type="submit" className="cta" disabled={isPending}>
          {isPending ? 'Enviando…' : 'Ver mi resultado'}
        </button>
      </form>
    </section>
  );
}
