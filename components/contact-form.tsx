'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const form = event.currentTarget;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) throw new Error(payload?.error || 'Contact request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="contactform" aria-busy={status === 'loading'}>
      <div className="honey" aria-hidden="true">
        <label>Votre site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="fieldrow">
        <label>Votre nom *<input required name="name" placeholder="Nom et prénom" maxLength={100} /></label>
        <label>Votre entreprise<input name="company" placeholder="Nom de l’entreprise" maxLength={100} /></label>
      </div>
      <div className="fieldrow">
        <label>Votre email *<input required name="email" type="email" placeholder="vous@entreprise.com" maxLength={160} /></label>
        <label>Votre téléphone<input name="phone" type="tel" placeholder="Votre numéro" maxLength={30} /></label>
      </div>
      <div className="fieldrow">
        <label>Type de projet *<select required name="projectType" defaultValue=""><option value="" disabled>Sélectionnez</option><option>Site web</option><option>Application / SaaS</option><option>IA / Automatisation</option><option>Marketing / SEO</option><option>Conseil digital</option><option>Autre</option></select></label>
        <label>Budget indicatif<select name="budget" defaultValue=""><option value="">À définir ensemble</option><option>Moins de 20 000 MAD</option><option>20 000 – 50 000 MAD</option><option>50 000 – 100 000 MAD</option><option>Plus de 100 000 MAD</option></select></label>
      </div>
      <label>Parlez-nous de votre projet *<textarea required name="message" placeholder="Contexte, objectifs, délais…" minLength={20} maxLength={3000} /></label>
      <label className="consent"><input type="checkbox" required /> J’accepte que YMKEN utilise ces informations pour répondre à ma demande.</label>
      <button className="button" disabled={status === 'loading'} type="submit">
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'} <ArrowRight />
      </button>
      <div aria-live="polite">
        {status === 'success' && <p className="formsuccess"><CheckCircle2 /> Merci. Votre demande a bien été envoyée. Nous vous répondrons rapidement.</p>}
        {status === 'error' && <p className="formerror">Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</p>}
      </div>
    </form>
  );
}
