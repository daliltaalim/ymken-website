import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function POST(request: NextRequest) {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!brevoApiKey || !contactToEmail || !contactFromEmail) {
    return NextResponse.json({ error: 'Contact service is not configured.' }, { status: 500 });
  }

  const { name, email, service, message } = await request.json();

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const brevoResponse = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify({
      sender: {
        email: contactFromEmail,
        name: 'YMKEN Solutions',
      },
      to: [{ email: contactToEmail }],
      replyTo: {
        email,
        name,
      },
      subject: `Nouvelle demande de contact - ${service}`,
      htmlContent: `
        <h1>Nouvelle demande de contact</h1>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Service :</strong> ${escapeHtml(service)}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    }),
  });

  if (!brevoResponse.ok) {
    return NextResponse.json({ error: 'Unable to send contact email.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
