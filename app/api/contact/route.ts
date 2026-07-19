import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional(),
  projectType: z.string().trim().min(2).max(100),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(0).optional(),
});

function escapeHtml(value = '') {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]!);
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      console.warn('[contact] Invalid form submission', { requestId, issues: parsed.error.issues.map(({ path, code }) => ({ path, code })) });
      return NextResponse.json({ error: 'Données invalides.' }, { status: 400 });
    }

    // Bots populate this visually hidden field. Return success without sending.
    if (parsed.data.website) {
      console.info('[contact] Honeypot submission ignored', { requestId });
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || 'contact@ymken.com';
    if (!apiKey || !senderEmail) {
      console.error('[contact] Missing server configuration', { requestId, hasApiKey: Boolean(apiKey), hasSender: Boolean(senderEmail) });
      return NextResponse.json({ error: 'Service temporairement indisponible.' }, { status: 503 });
    }

    const data = parsed.data;
    const htmlContent = `<h2>Nouvelle demande YMKEN</h2>
      <p><b>Nom :</b> ${escapeHtml(data.name)}</p>
      <p><b>Entreprise :</b> ${escapeHtml(data.company || '—')}</p>
      <p><b>Email :</b> ${escapeHtml(data.email)}</p>
      <p><b>Téléphone :</b> ${escapeHtml(data.phone || '—')}</p>
      <p><b>Projet :</b> ${escapeHtml(data.projectType)}</p>
      <p><b>Budget :</b> ${escapeHtml(data.budget || 'À définir')}</p>
      <p><b>Message :</b><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`;

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { accept: 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'YMKEN Solutions', email: senderEmail },
        to: [{ email: recipientEmail, name: 'YMKEN Solutions' }],
        replyTo: { email: data.email, name: data.name },
        subject: `Nouvelle demande — ${data.projectType}`,
        htmlContent,
      }),
      cache: 'no-store',
    });

    if (!brevoResponse.ok) {
      console.error('[contact] Brevo rejected the message', { requestId, status: brevoResponse.status });
      return NextResponse.json({ error: 'Envoi impossible.' }, { status: 502 });
    }

    console.info('[contact] Message sent', { requestId, status: brevoResponse.status });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contact] Unexpected error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }
}
